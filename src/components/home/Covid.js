import { Container } from "react-bootstrap"

export const Covid = () => {
    return (
        <Container className="d-flex align-items-center border mt-4">
            <div className="my-3">
                <span className="ms-3 me-3 p-2" style={{ "backgroundColor": "#fff0e0", "color": "#923e01" }}>
                    <i className="fa-solid fa-circle-info fa-lg"></i>
                </span>
                <span>Consigue la información que necesitas. Consulta las últimas restricciones por la COVID-19 antes de viajar.</span>
            </div>
        </Container>
    )
}