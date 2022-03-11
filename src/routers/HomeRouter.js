import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Home } from "../components/home/Home";
import { TopBar } from '../components/ui/TopBar';
import { Footer } from '../components/ui/Footer';
import { PrivateRoute } from './PrivateRoute';
import { Summary } from '../components/payment/summary/Summary';
// import { ProductScreen } from '../components/products/ProductScreen';
// import { SubCategoryList } from '../components/products/SubCategoryList';
// import { SubCategoryScreen } from '../components/products/SubCategoryScreen';

export const HomeRouter = () => {

    const { uid } = useSelector(state => state.auth);

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (
        <div className="d-flex flex-column min-vh-100">

            <TopBar />

            <Routes>

                {/* <Route path="/:CategoriaNombre" element={<SubCategoryList />} />

                    <Route path="/:CategoriaNombre/:SubCategoriaNombre" element={<SubCategoryScreen />} />

                    <Route path="/:CategoriaNombre/:SubCategoriaNombre/:ProductoNombre" element={<ProductScreen />} />
                */}
                <Route
                    path="summary"
                    element={
                        <PrivateRoute isAuthenticated={!!uid}>
                            <Summary />
                        </PrivateRoute>
                    }
                />

                <Route path="/" element={
                    <>
                        <Home />
                    </>
                }
                />

                <Route path="/*" element={<Navigate to="/" />} />

            </Routes>

            <Footer />

        </div>
    )
}