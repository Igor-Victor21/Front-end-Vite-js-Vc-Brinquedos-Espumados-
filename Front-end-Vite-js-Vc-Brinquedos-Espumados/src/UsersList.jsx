import style from './UsersList.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import { Menu } from './components/menu'

function UsersList() {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) navigate('/')
    }, [navigate])

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users')
            setUsers(response.data)
        } catch (err) {
            setError('Erro ao carregar usuários')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <p>Carregando usuários...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <Menu />
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
            <section id={style.containerList}>
                <div className={style.wrapList}>
                    <div className={style.headerList}>
                        <div className={style.textHeaderList}>
                            <p className={style.textList}>Nome Completo</p>
                        </div>
                        <div className={style.textHeaderList}>
                            <p className={style.textList}>E-mail</p>
                        </div>
                        <div className={style.textHeaderList}>
                            <p className={style.textList}>CPF</p>
                        </div>
                        <div className={style.textHeaderList}>
                            <p className={style.textList}>CEP</p>
                        </div>
                    </div>
                    {users.map((user) => (
                        <div key={user.id} className={style.containerListInfo}>
                            <div>
                                <p className={style.textInfoList}>{user.fullName}</p>
                            </div>
                            <div>
                                <p className={style.textInfoList}>{user.email}</p>
                            </div>
                            <div>
                                <p className={style.textInfoList}>{user.cpf}</p>
                            </div>
                            <div>
                                <p className={style.textInfoList}>{user.cep}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </>
    )
}

export default UsersList