import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";

import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { HomeRouter } from "./HomeRouter";
import { PaymentStepper } from "../components/ui/PaymentStepper";
import { startChecking } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { Shipping } from "../components/payment/shipping/Shipping";
import { Payment } from "../components/payment/payment/Payment";
import { PanelRouter } from "./PanelRouter";

export const AppRouter = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => { // Restaura la autenticación al recargar el navegador
        dispatch(startChecking())
    }, [dispatch]);

    useEffect(() => { // Navega a la parte superior de la página en dispositivos móviles
        window.scrollTo(0, 0);
    }, [location]);

    return (
        !checking &&
        <Routes>
            <Route
                path="registro"
                element=
                {
                    <RegisterScreen />
                }
            />
            <Route
                path="registro/*"
                element={<Navigate to="/" />}
            />
            <Route
                path="login"
                element=
                {
                    <LoginScreen />
                }
            />
            <Route
                path="/login/*"
                element={<Navigate to="/" />}
            />
            <Route
                path="shipping"
                element=
                {
                    <>
                        <PaymentStepper />

                        <div className="container">
                            <PrivateRoute isAuthenticated={!!uid}>
                                <Shipping />
                            </PrivateRoute>
                        </div>
                    </>
                }
            />
            <Route
                path="payment"
                element=
                {
                    <>
                        <PaymentStepper />

                        <div className="container">
                            <PrivateRoute isAuthenticated={!!uid}>
                                <Payment />
                            </PrivateRoute>
                        </div>
                    </>
                }
            />
            <Route
                path="panel/*"
                element=
                {
                    <PrivateRoute isAuthenticated={!!uid}>
                        <PanelRouter />
                    </PrivateRoute>
                }
            />
            <Route
                path="/*"
                element=
                {
                    <HomeRouter />
                }
            />
        </Routes>
    )
}