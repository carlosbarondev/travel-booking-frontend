import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import { TopBar } from "../components/ui/TopBar";
import { Search } from "../components/search/Search";
import { Home } from "../components/home/Home";
import { Footer } from "../components/ui/Footer";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/busqueda" element={<Search />} />
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}