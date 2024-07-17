import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <span>LOGO</span>
            <div>
                <Link to='/authorization'>Entrar</Link>
                <Link to='/register' className="mx-3">Cadastrar</Link>
            </div>
        </header>
    )
}
