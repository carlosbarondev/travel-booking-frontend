import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import { TopBar } from "../components/ui/TopBar";
import { Footer } from "../components/ui/Footer";
import { MenuPanel } from "../components/panel/user/MenuPanel";
import { Data } from "../components/panel/user/Data";
import { Ratings } from "../components/panel/user/Ratings";
import { Orders } from "../components/panel/user/Orders";
import { OrdersDetail } from "../components/panel/user/OrdersDetail";
import { AdminPanel } from "../components/panel/admin/AdminPanel";
import { Users } from "../components/panel/admin/Users";
import { Hotels } from "../components/panel/admin/Hotels";
import { HotelDetail } from "../components/panel/admin/HotelDetail";

export const PanelRouter = () => {

    const { role } = useSelector(state => state.auth);

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (

        <div className="d-flex flex-column min-vh-100">

            <TopBar />

            <Container>

                {
                    role === "USER_ROLE"
                        ? <Routes>
                            <Route path="datos" element={
                                <Row>
                                    <Col xs={12} lg={2}>
                                        <MenuPanel />
                                    </Col>
                                    <Col xs={12} lg={10}>
                                        <Data />
                                    </Col>
                                </Row>
                            } />
                            <Route path="valoraciones" element={
                                <Row>
                                    <Col xs={12} lg={2}>
                                        <MenuPanel />
                                    </Col>
                                    <Col xs={12} lg={10}>
                                        <Ratings />
                                    </Col>
                                </Row>
                            } />
                            <Route path="reservas" element={
                                <Row>
                                    <Col xs={12} lg={2}>
                                        <MenuPanel />
                                    </Col>
                                    <Col xs={12} lg={10}>
                                        <Orders />
                                    </Col>
                                </Row>
                            } />
                            <Route path="reservas/detalles" element={
                                <Row>
                                    <Col xs={12} lg={2}>
                                        <MenuPanel />
                                    </Col>
                                    <Col xs={12} lg={10}>
                                        <OrdersDetail />
                                    </Col>
                                </Row>
                            } />
                            <Route
                                path="/"
                                element={<Navigate to="/panel/datos" />}
                            />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </Routes>
                        : <Routes>
                            <Route path="usuarios" element={
                                <Row>
                                    <Col xs={12} lg={2}>
                                        <AdminPanel />
                                    </Col>
                                    <Col xs={12} lg={10}>
                                        <Users />
                                    </Col>
                                </Row>
                            } />
                            <Route path="hoteles" element={
                                <Row>
                                    <Col xs={12} lg={2}>
                                        <AdminPanel />
                                    </Col>
                                    <Col xs={12} lg={10}>
                                        <Hotels />
                                    </Col>
                                </Row>
                            } />
                            <Route path="hoteles/:HotelName" element={
                                <Row>
                                    <Col xs={12} lg={2}>
                                        <AdminPanel />
                                    </Col>
                                    <Col xs={12} lg={10}>
                                        <HotelDetail />
                                    </Col>
                                </Row>
                            } />
                            <Route
                                path="/"
                                element={<Navigate to="/panel/usuarios" />}
                            />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </Routes>
                }

            </Container>

            <Footer />

        </div>
    )
};