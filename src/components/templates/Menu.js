import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowUpRightFromSquare, faCircleQuestion, faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    return (
        <aside>
            <nav>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faHome} />
                        <Link to="/">Início</Link>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <Link to="/contact">Contato</Link>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faUser} />
                        <Link to="/profile">Perfil</Link>
                    </li>
                </ul>
                <ul >
                    <li className="justify-self-end mb-1" style={{ fontSize: "1rem" }}>
                        <FontAwesomeIcon icon={faCircleQuestion} />
                        <Link to="/help" className="d-flex justify-content-between p-0 mx-2">
                            Ajuda
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: "0.8rem", alignSelf: "center" }} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
