import { useNavigate } from "react-router-dom";

export const AdminPanel = () => {

    const navigate = useNavigate();

    return (
        <div className="animate__animated animate__fadeIn mt-4">
            <h5>Administración</h5>
            <div className="list-group">
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/usuarios")}>Usuarios</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/hoteles")}>Hoteles</button>
            </div>
        </div>
    )
}