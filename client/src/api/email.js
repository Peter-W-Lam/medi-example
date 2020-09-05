const axios = require('axios')
const {toast} = require('react-toastify')


    export const sendVerificationEmail = async (healthcareEmail, accessToken, userID) => {
        try {
            const res = await axios({
                method: 'post', 
                url: '/api/email/', 
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                data: {
                    healthcareEmail: healthcareEmail,
                    userID: userID
                } 
            })
            return res;
        } catch (e) {
            toast.error(e.message, {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(e)
        }
    }
    export const sendSupportEmail = (email, message) => {
        axios({
            method: 'post', 
            url: '/api/email/support', 
            data: {
                userEmail: email,
                supportBody: message
            } 
        })
        .catch(e => 
            toast.error(e.message, {
                hideProgressBar: true
            }))
    }
