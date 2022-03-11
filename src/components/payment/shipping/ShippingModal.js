import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { ShippingForm } from './ShippingForm';
import { ShippingFormBilling } from './ShippingFormBilling';


export const ShippingModal = (props) => {

    const { elegirShippingModal } = useSelector(state => state.ui);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {
                        elegirShippingModal
                            ? "Añadir dirección de envío"
                            : "Añadir dirección de facturación"
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    elegirShippingModal
                        ? <ShippingForm />
                        : <ShippingFormBilling />
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}