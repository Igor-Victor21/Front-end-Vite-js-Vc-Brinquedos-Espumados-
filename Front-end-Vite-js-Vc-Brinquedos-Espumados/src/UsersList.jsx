import style from './UsersList.module.css'

function UsersList() {
    return (
        <>
            <section id={style.containerInfoListUsers}>
                <div className={style.headerTitle}>
                    <h1>Clientes</h1>
                    <p>Encontre todos os clientes da plataforma aqui</p>
                </div>
                <div>
                    <div className={style.wrapInfoUserList}>
                        <div className={style.containerInfoCard}>
                            <p className={style.textInfoUsers}>Clientes Gerais</p>
                            <p className={style.infoClientsNumber}>11,450</p>
                        </div>
                    </div>
                    <div className={style.wrapInfoUserList}>
                        <div className={style.containerInfoCard}>
                            <p className={style.textInfoUsers}>Admins</p>
                            <p className={style.infoClientsNumber}>4</p>
                        </div>
                    </div>
                    <div className={style.wrapInfoUserList}>
                        <div className={style.containerInfoCard}>
                            <p className={style.textInfoUsers}>Creators/Designers</p>
                            <p className={style.infoClientsNumber}>1</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id={style.containerSearchBar}>
                <div className={style.textSearchBar}>
                    <h1></h1>
                </div>
                <div className={style.searchBar}>
                    <div className={style.searchBarNavigate}>
                        <p className={style.textSearchBarNavigate}>Ver Todos</p>
                    </div>
                    <div className={style.searchBarNavigate}>
                        <p className={style.textSearchBarNavigate}>Geral</p>

                    </div>
                    <div className={style.searchBarNavigate}>
                        <p className={style.textSearchBarNavigate}>Scrum</p>

                    </div>
                    <div className={style.searchBarNavigate}>
                        <p className={style.textSearchBarNavigate}>Creators/Designers</p>

                    </div>
                </div>
                <div className={style.containerSearch}>
                <div className={style.wrapInputSearchBar}>
                    <input className={style.inputSearchBar} type="text" placeholder='Pesquisar:'/>
                </div>
                <div>
                    <p>Filtrar</p>
                </div>
                </div>
                <div>

                </div>
            </section>
        </>
    )
}

export default UsersList