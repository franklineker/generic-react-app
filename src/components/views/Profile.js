
export default function Profile() {

    return (
        <section className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Perfil</h1>
            <article className="bg-dark text-light p-5 rounded">
                <p>
                    Página do perfil do usuário.
                </p>
                <p>
                    Você precisa estar logado para acessar esta páginda, por isso foi redirecionado para login na primeira vez :)
                </p>
            </article>
        </section>
    )
}
