import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <aside>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Início</Link>
                    </li>
                    <li>Menu 2</li>
                    <li>Menu 2</li>
                    <li>Menu 2</li>
                </ul>
            </nav>
        </aside>
    )
}
