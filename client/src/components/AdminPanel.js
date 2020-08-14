import React, {useState, useEffect} from 'react'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"
import {
    Container, ListGroup, ListGroupItemHeading, Button,
    Modal, ModalHeader,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap'
import CouponListItem from './CouponListItem'
import axios from 'axios'

function AdminPanel(props) {
    const [coupons, setCoupons] = useState(null)
    

    const fetchCoupons = async() => {
        axios.get('/api/coupons', {
            headers: {
                'Authorization': `Bearer ${props.user.accessToken}`
            }
        })
        .then(coupons => {
            setCoupons(coupons.data)
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        if (!props.user.accessToken) return;
        fetchCoupons()
    }, [props.user])

    // Modal functions
    const [createModal, setCreateModal] = useState(false)
    const toggleCreateModal = () => setCreateModal(!createModal)
    const [formValues, setFormValues] = useState({
        offers: [
            // {headline: '', description: '', termsAndConditions: ''}
        ]
    })

    const createItem = async () => {
        axios.post('/api/coupons', formValues, {
            headers: {
                'Authorization': `Bearer ${props.user.accessToken}`
            }
        })
        .then(res => fetchCoupons())
        .catch(e => console.log("createItem:", e))
    }

    const handleInputChange = (e) => {
        if (["headline form-control", 
             "description form-control", 
             "termsAndConditions form-control"].includes(e.target.className)) {
            const realClass = e.target.className.split(" ")[0]
            var offersArray = formValues.offers
            offersArray[e.target.dataset.id][realClass] = e.target.value
            setFormValues({...formValues, offers: offersArray})
        } else {
            const target = e.target
            const name = target.name
    
            setFormValues({
                ...formValues, 
                [name]: target.value
            })
        }
    }

    const handleSubmit = () => {
        console.log(formValues)
    }

    const addOffer = () => {
        setFormValues({
            ...formValues, 
            offers: [
                ...formValues.offers, 
                {headline: '', description: '', termsAndConditions: ''}
            ]
        })
    }

    const removeOffer = (index) => {
        var offersArr = formValues.offers
        offersArr.splice(index, 1)
        setFormValues({...formValues, offers: offersArr})
    }

    const clearForm = () => {
        setFormValues({offers: []})
    }

    return(
        <div className="AdminPanel">
            <Container>
                <ListGroup>
                    <ListGroupItemHeading className="list-heading">
                        <h2>Offers</h2>
                        <Button color="primary" size="sm" onClick={toggleCreateModal}>Add Item</Button>
                    </ListGroupItemHeading>
                    {coupons && coupons.map(coupon => (
                        <CouponListItem 
                            user={props.user} 
                            coupon={coupon} 
                            key={coupon._id}
                            fetchCoupons={fetchCoupons}
                            setCoupons={setCoupons}
                        />
                    ))}
                </ListGroup>
            </Container>

            <Modal isOpen={createModal} toggle={toggleCreateModal}>
                <ModalHeader>
                    Add Item
                </ModalHeader>
                <Form className="modal-form" onChange={handleInputChange}>
                    <FormGroup>
                        <Label for="company">Company</Label>
                        <Input 
                            type="text" 
                            name="company" 
                            id="company" 
                            placeholder="Company name" 
                             />
                    </FormGroup>
                    <FormGroup>
                        <Label for="logo">Company Logo</Label>
                        <Input 
                            type="text" 
                            name="logo" 
                            id="logo" 
                            placeholder="Company logo image URL" 
                            />
                        <FormText>Image URL must end in an image file extension (.jpg, .png, .gif)</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="shortDescription">Short Description</Label>
                        <Input 
                            type="text" 
                            name="shortDescription" 
                            id="shortDescription" 
                            placeholder="Short tagline for the offer" 
                             />
                        <FormText>This tagline will appear on the front of the company card on a user's dashboard</FormText>    
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyDescription">Company Description</Label>
                        <Input 
                            type="textarea" 
                            name="companyDescription" 
                            id="companyDescription" 
                            placeholder="Long description of company" 
                             />
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" size="sm" onClick={addOffer}>Add Offer</Button>
                    </FormGroup>
                        {formValues.offers.map((offer, index) => {
                            let headlineID = `headline-${index}`
                            let descriptionID = `description-${index}`
                            let tacID = `tac-${index}`
                            return (
                                <div key={index} className="offer-formgroup">
                                    <Button 
                                        outline 
                                        color="danger" 
                                        size="sm" 
                                        onClick={() => {
                                            let i = formValues.offers.length - index
                                            removeOffer(i)}}>&times;</Button>
                                    <FormGroup>
                                        <Label for={headlineID}>Headline</Label>
                                        <Input 
                                            type="text" 
                                            name={headlineID}
                                            data-id={index}
                                            id={headlineID}
                                            className="headline" />
                                        <FormText>This populates the headline for the offer on the main company card.</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for={descriptionID}>Description</Label>
                                        <Input 
                                            type="textarea" 
                                            name={descriptionID}
                                            data-id={index}
                                            id={descriptionID}
                                            className="description" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for={tacID}>Terms and Conditions</Label>
                                        <Input 
                                            type="textarea" 
                                            name={tacID}
                                            data-id={index}
                                            id={tacID}
                                            className="termsAndConditions" />
                                    </FormGroup>
                                </div>
                            )
                        })}
                    <Button color="success" onClick={() => {
                        createItem()
                        toggleCreateModal()
                        clearForm()
                    }}>Create Item</Button>
                    <Button color="link" onClick={() => toggleCreateModal()}>Cancel</Button>

                </Form>            
            </Modal>             
        </div>
    )
}



export default AdminPanel
