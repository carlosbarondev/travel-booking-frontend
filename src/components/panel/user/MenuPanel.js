import { useNavigate } from "react-router-dom";

export const MenuPanel = () => {

    const navigate = useNavigate();

    return (
        <div className="animate__animated animate__fadeIn mt-4">
            <h5>Mi cuenta</h5>
            <div className="list-group">
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/datos")}>Mis datos</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/pedidos")}>Pedidos</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/valoraciones")}>Valoraciones</button>
            </div>
        </div>
    )
};