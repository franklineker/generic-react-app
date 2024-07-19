import { useEffect } from "react"
import { useIsAdmin } from "../../hooks/useTokenDetails"

export default function Home() {

    const isAdmin = useIsAdmin();

    useEffect(() => {
        console.log(isAdmin);
    })

    return (
        <div>
            <h1>Início</h1>
            {isAdmin ? "Olá! Seu perfil é de administrador!" : "Olá! Seu perfil é de usuário."}.
        </div>
    )
}
