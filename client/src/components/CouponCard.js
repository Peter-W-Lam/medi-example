import React, {useState} from 'react'
import { Button,
    Card, 
    CardText,
    CardHeader, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
    Modal,
    ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'



function CouponCard(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    return (
        <div>
            <Card className="CouponCard">
                <CardHeader tag="h3">{props.title}</CardHeader>
                <CardBody>
                    {/* <CardSubtitle>{props.shortDescription}</CardSubtitle> */}
                    {/* <CardText>{props.companyDescription}</CardText> */}
                    <Button onClick={toggle}>{props.shortDescription}</Button>
                    {props.saved ?
                    <Button color="success">Save Discount</Button> :
                    <Button color="warning">Unave Discount</Button>}
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
                <ModalBody>{props.offerText}</ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}

export default CouponCard
