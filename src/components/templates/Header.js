import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <span>LOGO</span>
            <Link to='/register'>Cadastrar</Link>
        </header>
    )
}
