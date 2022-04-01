import { Container } from "react-bootstrap"

export const Banner = () => {
    return (
        <div className="homeBanner">
            <Container className="d-flex flex-column containerBanner">
                <strong className="mt-auto titleBanner">Encuentra tu próxima estancia</strong>
                <div className="mb-4 mb-sm-5 subtitleBanner">Busca ofertas en hoteles, casas y mucho más...</div>
            </Container>
        </div>
    )
}