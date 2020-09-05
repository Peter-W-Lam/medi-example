import React, {useState, useEffect, useContext} from 'react'
import {Button} from 'reactstrap'
import VerifyForm from './VerifyForm'
import { Mail } from '../../../assets'
import axios from 'axios'
import {UserContext} from '../../context/UserContext'
import moment from 'moment'
import {toast} from 'react-toastify'
import {sendVerificationEmail} from '../../../api/email'

export default function VerifyBlock() {

    // TODO: Set validatedScreen according to whether email has been sent (lookup token)
    const [timeSinceGen, setTimeSinceGen] = useState(-1)
    const [validatedScreen, setValidatedScreen] = useState(timeSinceGen > 0)
    const [loading, setLoading ] = useState(true)
    const [formValues, setFormValues] = useState({
        healthcareSystem: 'System 1', 
        healthcareRole: 'Role #1'
    });
    
    const [user, setUser] = useContext(UserContext)
    const [tokens, setTokens] = useState([])
    
    const resendEmail = async () => {
        if (user.healthcareEmail) {
            var resp = await sendVerificationEmail(user.healthcareEmail, user.accessToken, user._id)

            if (resp) {
                fetchTokens()
            }
        } else {
            toast.error('Something went wrong! Refresh the page and try again')
        }
    }
    

    const fetchTokens = async () => {
        console.log("fetchTokens()")
        const {data} = await axios.post('/api/email/token',{userID: user._id}, {
            headers: {'Authorization': `Bearer ${user.accessToken}`}
        })
        if (data.length > 0) setValidatedScreen(true)
        setTokens(data)
    }


    const filterTokens = () => {
        const queryLimit = moment().subtract(20, 'seconds')
        const filteredTokens = tokens.filter(token => (moment(token.createdAt).isAfter(queryLimit)))

        if (filteredTokens.length > 0) {
            var token = moment(filteredTokens[0].createdAt)
            const timeLen = token.diff(queryLimit, 'seconds')
            setTimeSinceGen(timeLen)
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTokens()
        if (user.healthcareEmail) {
            setFormValues({
                ...formValues, 
                healthcareEmail: user.healthcareEmail, 
                healthcareSystem: user.healthcareSystem, 
                healthcareRole: user.healthcareRole, 
                dateOfBirth: moment(user.dateOfBirth).format("YYYY-MM-DD"), 
                name: user.name
            })
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            filterTokens()
        }, 1000)

        
        return () => clearInterval(interval)
    }, [tokens])


    return (
        <div className="VerifyBlock">
            {validatedScreen ?
            <div className="check-inbox">
                <h1>Check your inbox!</h1>
                <p>To complete your verification, click the link that we sent to your network email at <span className="bold">{formValues.healthcareEmail}</span></p>
                <img src={Mail} alt="Man putting envelope in mailbox" />
            <p className={timeSinceGen <= 0 ? 'message hidden' : 'message'}>You can send a new verification email in {timeSinceGen} seconds</p>
                <Button className="primary-btn" size="lg" disabled={timeSinceGen > 0} onClick={resendEmail}>Resend Email</Button>
                <Button color="link" onClick={() => setValidatedScreen(!validatedScreen)}>Change network details</Button>
            </div> 
            :
            <VerifyForm 
                formValues={formValues}
                setFormValues={setFormValues}
                setValidatedScreen={setValidatedScreen} 
                timeSinceGen={timeSinceGen}
                fetchTokens={fetchTokens}
                />
            }
            
        </div>
    )
}
