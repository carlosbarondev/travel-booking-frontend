import { Rating } from "react-simple-star-rating";
import ReactRoundedImage from "react-rounded-image";

const options = { year: 'numeric', month: 'long', day: 'numeric' };

export const Comments = ({ hotel }) => {
    return (
        <>
            <hr className="mt-5 mb-5" />
            <div className="mb-5 ms-2 ms-sm-0">
                <div className="mb-5">
                    <h4 id="stars" style={{ "display": "inline" }} className="me-3 align-middle">
                        {`Valoraciones (${hotel.comments.length})`}
                    </h4>
                    <Rating
                        className="mt-2 mt-sm-1 me-3"
                        showTooltip
                        tooltipDefaultText="El hotel no tiene comentarios"
                        tooltipArray={['Muy malo', 'Malo', 'Bueno', 'Muy bueno', 'Excelente']}
                        tooltipStyle={{ "background": "#00A3C8", "fontSize": "20px", "margin": "0", "marginTop": "6px" }}
                        style={{ "pointerEvents": "none" }}
                        size={30}
                        ratingValue={hotel.rating}
                        allowHover={false}
                    />
                </div>
                {
                    hotel.comments.map((op, index) => (
                        op.user.state && <div className="row mt-2" key={op._id}>
                            <div className="col-sm-12 col-md-4">
                                <div className="row mb-2">
                                    <div className="col-2 col-sm-2 col-md-4 col-lg-3 col-xl-2">
                                        {
                                            op.user.role !== "ADMIN_ROLE"
                                                ? op.user.img
                                                    ? <div className="ms-1">
                                                        <ReactRoundedImage
                                                            image={op.user.img ? op.user.img : "/assets/no-image.png"}
                                                            roundedColor="#49c1e1"
                                                            imageWidth="50"
                                                            imageHeight="50"
                                                            roundedSize="2"
                                                            borderRadius="15"
                                                        />
                                                    </div>
                                                    : <div className="circle ms-1">
                                                        <i className="fa-solid fa-user fa-lg"></i>
                                                    </div>
                                                : <div className="circulo ms-1">
                                                    <i className="fa-solid fa-user-gear fa-lg"></i>
                                                </div>
                                        }
                                    </div>
                                    <div className="col-10 col-sm-10 col-md-8 col-lg-9 col-xl-10 d-flex align-items-center">
                                        <div style={{ "fontSize": "20px" }}>{`${op.user.name}`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-8 mt-sm-2 mt-md-0">
                                <div>
                                    <Rating
                                        className="me-2"
                                        style={{ "pointerEvents": "none", "marginBottom": "3px", "marginLeft": "-5px" }}
                                        size={20}
                                        ratingValue={op.rating}
                                        allowHover={false}
                                    />
                                    <div className="fw-bold align-middle" style={{ "fontSize": "16px", "display": "inline" }}>{`${op.title}`}</div>
                                </div>
                                <div className="text-muted" style={{ "fontSize": "14px" }}>{`${new Date(op.date).toLocaleDateString("es-ES", options)}`}</div>
                                <div className="mt-3" style={{ "whiteSpace": "pre-wrap" }}>{`${op.text}`}</div>
                            </div>
                            {
                                (index !== hotel.comments.length - 1) && <hr className="mt-4" />
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}