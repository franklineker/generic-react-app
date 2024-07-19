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
                    <li>Menu 3</li>
                    <li>Menu 4</li>
                    <li>Menu 5</li>
                    <li>Menu 6</li>
                    <li>Menu 7</li>
                </ul>
            </nav>
        </aside>
    )
}
