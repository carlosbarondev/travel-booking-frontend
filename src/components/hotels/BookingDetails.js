import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { Rating } from "react-simple-star-rating";
import { lightFormat } from 'date-fns';
import Swal from "sweetalert2";

import { stepChange } from '../../actions/ui';

export const BookingDetails = ({ hotel }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { booking } = useSelector(state => state.booking);
    const { role } = useSelector(state => state.auth);

    const handleStart = () => {
        if (role !== "ADMIN_ROLE") {
            if (!booking.roomId || !booking.roomType) {
                return Swal.fire('Seleccione habitación', "", 'info');
            }
            if (!booking.food) {
                return Swal.fire('Seleccione régimen', "", 'info');
            }
            dispatch(stepChange(2));
            localStorage.setItem('step', 2);
            navigate("/datos");
        } else {
            Swal.fire('Login', "Debe cerrar la sesión de Administrador y acceder como cliente", 'info');
        }
    }

    return (
        <div className="sticky">
            <Card>
                <Card.Header as="h5">DETALLES DE LA RESERVA</Card.Header>
                <Card.Body>
                    <Card.Title>
                        <span>
                            <span style={{ "whiteSpace": "nowrap", "overflow": "hidden" }}>{hotel.name}</span>
                            <Rating
                                className='ms-2 mb-2'
                                style={{ "pointerEvents": "none" }}
                                size={15}
                                ratingValue={hotel.stars * 20}
                                allowHover={false}
                            />
                        </span>
                    </Card.Title>
                    <Card.Text as="div" className='mt-3'>
                        {
                            booking?.date
                                ? <div className="fontSM"><span className="text-muted me-3">Estancia</span><span className='float-end'>{lightFormat(new Date(booking.date.startDate), 'dd/MM/yyyy')} - {lightFormat(new Date(booking.date.endDate), 'dd/MM/yyyy')} <span className='disableText'>{`${booking.days === 1 ? `(${booking.days} noche)` : `(${booking.days} noches)`}`}</span></span></div>
                                : <div className="fontSM">Selecciona la fecha</div>
                        }
                        {
                            booking?.adults
                                ? <div className="fontSM">
                                    <span className="text-muted me-3">Personas</span>
                                    <span className='float-end'>
                                        {booking.adults + booking.children} ({`${booking.adults} adultos`}
                                        {booking.children === 1 ? ` ${booking.children} niño)`
                                            : booking.children > 0 ? ` ${booking.children} niños)`
                                                : ")"}
                                    </span>
                                </div>
                                : <div className="fontSM">Selecciona las personas</div>
                        }
                        {
                            booking?.roomType
                                ? <div className="fontSM"><span className="text-muted me-3">Habitación</span><span className='float-end'>{booking.roomType.type}</span></div>
                                : <div className="fontSM"><span className="text-muted me-3">Habitación</span><span className='float-end'>Selecciona una habitación</span></div>
                        }
                        {
                            booking?.food
                                ? <div className="fontSM"><span className="text-muted me-3">Régimen</span><span className='float-end'>{booking.food.type}</span></div>
                                : <div className="fontSM"><span className="text-muted me-3">Régimen</span><span className='float-end'>Selecciona el régimen</span></div>
                        }
                        {
                            booking?.parking
                                ? <div className="fontSM"><span className="text-muted me-3">Parking</span><span className='float-end'>Añadido</span></div>
                                : null
                        }
                        <div className='mt-4 mb-4'>
                            {
                                booking?.total
                                    ? <strong className="fontSM18"><span className="me-3">PRECIO FINAL</span><span className="fontSM22 float-end">{booking.total} EUR</span></strong>
                                    : <strong className="fontSM18"><span className="me-3">PRECIO FINAL</span><span className="fontSM22 float-end">0 EUR</span></strong>
                            }
                        </div>
                    </Card.Text>
                    <div className="d-grid">
                        <Button variant="primary" onClick={handleStart}>Continuar a datos personales</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}