import React, {useState} from 'react'
import {
    ListGroupItem, 
    Button, 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Card, CardBody, CardHeader, CardTitle, CardSubtitle, CardText,
    Form, FormGroup, Label, Input
} from 'reactstrap'
import axios from 'axios'
import './CouponListItem.css'

function CouponListItem(props) {
    // Request parameters
    const domain = `/api/coupons/${props.coupon._id}`
    const headers = {
        'Authorization': `Bearer ${props.user.accessToken}`
    }

    // Modal toggles
    const [deleteModal, setDeleteModal] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const toggleDelete = () => setDeleteModal(!deleteModal)
    const toggleView = () => setViewModal(!viewModal)
    const toggleEdit = () => setEditModal(!editModal)

    const [formValues, setFormValues] = useState({
        company: props.coupon.company,
        logo: props.coupon.logo, 
        shortDescription: props.coupon.shortDescription, 
        companyDescription: props.coupon.companyDescription, 
        offers: props.coupon.offers
    })

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

    const addOffer = () => {
        setFormValues({
            ...formValues, 
            offers: [
                ...formValues.offers, 
                {headline: '', description: '', termsAndConditions: ''}
            ]
        })
    }

    const deleteCoupon = async () => {
        axios.delete(domain, {
            headers: headers
        })
        .then(res => props.fetchCoupons())
        .catch(e => console.log(e))
    }

    const getCoupon = async () => {
        axios.get(domain, {
            headers: headers
        })
        .then(res => console.log(res.data))
        .catch(e => console.log(e.message)) 
    }
    const updateCoupon = async () => {
        axios.put(domain, formValues, {
            headers: headers
        })
        .then(res => props.fetchCoupons())
        .catch(e => console.log(e.message)) 
    }

    return(
        <ListGroupItem key={props.key} className="CouponListItem" style={{alignItems: "center"}}>
            <p>{props.coupon.company}</p>
            <div className="btns">
                <Button size="sm" color="primary" onClick={toggleView}>View</Button>
                <Button outline color="secondary" onClick={toggleEdit}>Edit</Button>
                <Button color="danger" onClick={toggleDelete}>Delete</Button>
            </div>

            {/**** MODALS *****/}
            {/**** DELETE MODAL *****/}
            <Modal isOpen={deleteModal} toggle={toggleDelete}>
                <ModalHeader>Are you sure you want to delete {props.coupon.company}?</ModalHeader>
                <ModalFooter>
                    <Button color="danger" onClick={() => {
                        deleteCoupon()
                        toggleDelete()
                    }}>Yes, delete</Button>
                    <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/**** VIEW MODAL ***/  }
            <Modal isOpen={viewModal} toggle={toggleView}>
                <ModalHeader>{props.coupon.company}</ModalHeader>
                <ModalBody>
                    {props.coupon.logo && 
                    <img className="modal-logo" src={props.coupon.logo} alt={`${props.coupon.company} Logo`}/>}
                    
                    <p className="modal-heading">Short Description</p>
                    {props.coupon.shortDescription}
                    <hr />
                    <p className="modal-heading">Company Description</p>
                    {props.coupon.companyDescription}
                    <hr />
                    <p className="modal-heading">Offers</p>
                    {props.coupon.offers.map(offer => (
                        <Card key={offer._id} className="modal-card">
                            <CardHeader>
                                <CardTitle>
                                    <span className="bold">Headline:</span>{"\n"}
                                    {offer.headline}
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardSubtitle>
                                    <span className="bold">Description:</span>{"\n"}
                                    {offer.description}
                                </CardSubtitle>
                                <CardText>
                                    <span className="bold">Terms and Conditions:</span>{"\n"}
                                    {offer.termsAndConditions}
                                </CardText>
                            </CardBody>        
                        </Card>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleView}>Close</Button>
                </ModalFooter>
            </Modal>

            {/**** EDIT MODAL ******/}
            <Modal isOpen={editModal} toggle={toggleEdit}>
            <Form className="modal-form" onChange={handleInputChange}>
                    <FormGroup>
                        <Label for="company">Company</Label>
                        <Input 
                            type="text" 
                            name="company" 
                            id="company" 
                            placeholder="Company name"
                            value={formValues.company} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="logo">Company Logo</Label>
                        <Input 
                            type="text" 
                            name="logo" 
                            id="logo" 
                            placeholder="Company logo image URL" 
                            value={formValues.logo} 
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="shortDescription">Short Description</Label>
                        <Input 
                            type="text" 
                            name="shortDescription" 
                            id="shortDescription" 
                            placeholder="Short tagline for the offer" 
                            value={formValues.shortDescription} 
                             />
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyDescription">Company Description</Label>
                        <Input 
                            type="textarea" 
                            name="companyDescription" 
                            id="companyDescription" 
                            placeholder="Long description of company" 
                            value={formValues.companyDescription} 
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
                                    <FormGroup>
                                        <Label for={headlineID}>Headline</Label>
                                        <Input 
                                            type="text" 
                                            name={headlineID}
                                            data-id={index}
                                            id={headlineID}
                                            className="headline" 
                                            value={offer.headline}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for={descriptionID}>Description</Label>
                                        <Input 
                                            type="textarea" 
                                            name={descriptionID}
                                            data-id={index}
                                            id={descriptionID}
                                            className="description"
                                            value={offer.description} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for={tacID}>Terms and Conditions</Label>
                                        <Input 
                                            type="textarea" 
                                            name={tacID}
                                            data-id={index}
                                            id={tacID}
                                            className="termsAndConditions"
                                            value={offer.termsAndConditions} />
                                    </FormGroup>
                                </div>
                            )
                        })}
                    <Button color="success" onClick={() => {
                        updateCoupon()
                        toggleEdit()
                    }}>Update Item</Button>
                    <Button color="link" onClick={() => toggleEdit()}>Cancel</Button>

                </Form>    
            </Modal>
        </ListGroupItem>
    )
}

export default CouponListItem
