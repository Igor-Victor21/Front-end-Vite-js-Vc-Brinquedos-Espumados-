import style from './UserAdmin.module.css'
import { useNavigate } from 'react-router-dom'

function UserAdmin() {

    const navigate = useNavigate();
    return (
        <>
            <section id={style.menuBar}>
                <div className={style.buttonMenu} onClick={() => navigate('/CreateUsers')}>
                    <h2>Criar usuário</h2>
                </div>
                <div className={style.buttonMenu}>
                    <h2>Exibir usuários</h2>
                </div>
                <div className={style.buttonMenu} onClick={() => navigate('/CreateProducts')}>
                    <h2>Criar produto</h2>
                </div>
                <div className={style.buttonMenu}>
                    <h2>Exibir produtos</h2>
                </div>
                <div className={style.buttonMenu}>
                    <h2>Sair</h2>
                </div>
            </section>

            <section id={style.infoUsers}>
                <h1>AIIIIIII</h1>
            </section>
            <section id={style.infoProducts}>
                <h1>AIIIIIII</h1>

            </section>

        </>
    )
}

export default UserAdmin