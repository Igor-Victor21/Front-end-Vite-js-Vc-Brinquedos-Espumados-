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
    const [selectedUser, setSelectedUser] = useState(null)
    const [editing, setEditing] = useState(false)
    const [editForm, setEditForm] = useState({
        fullName: '',
        email: '',
        cpf: '',
        cep: ''
    })

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

    const handleUserClick = (user) => {
        setSelectedUser(selectedUser?.id === user.id ? null : user)
        setEditing(false)
        setEditForm({
            fullName: user.fullName,
            email: user.email,
            cpf: user.cpf,
            cep: user.cep
        })
    }

    const handleEdit = () => {
        setEditing(true)
    }

    const handleSave = async () => {
        try {
            await api.put(`/users/${selectedUser.id}`, editForm)
            fetchUsers()
            setEditing(false)
            setSelectedUser({...selectedUser, ...editForm})
        } catch (err) {
            setError('Erro ao atualizar usuário')
        }
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/users/${selectedUser.id}`)
            fetchUsers()
            setSelectedUser(null)
        } catch (err) {
            setError('Erro ao deletar usuário')
        }
    }

    const handleHide = () => {
        setSelectedUser(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditForm({
            ...editForm,
            [name]: value
        })
    }

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
                        <div key={user.id}>
                            <div 
                                className={style.containerListInfo} 
                                onClick={() => handleUserClick(user)}
                            >
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
                            {selectedUser?.id === user.id && (
                                <div className={style.userDetails}>
                                    {editing ? (
                                        <div className={style.editForm}>
                                            <input type="text" name="fullName" value={editForm.fullName} onChange={handleInputChange}/>
                                            <input type="text" name="email" value={editForm.email} onChange={handleInputChange}/>
                                            <input type="text" name="cpf" value={editForm.cpf} onChange={handleInputChange}/>
                                            <input type="text" name="cep" value={editForm.cep} onChange={handleInputChange}/>
                                        </div>
                                    ) : (
                                        <div className={style.userInfo}>
                                            <p>Nome completo: {selectedUser.fullName}</p>
                                            <p>Email: {selectedUser.email}</p>
                                            <p>CPF: {selectedUser.cpf}</p>
                                            <p>CEP: {selectedUser.cep}</p>
                                        </div>
                                    )}
                                    <div className={style.actions}>
                                        {editing ? (
                                            <button onClick={handleSave}>Salvar</button>
                                        ) : (
                                            <button onClick={handleEdit}>Editar</button>
                                        )}
                                        <button onClick={handleDelete}>Deletar</button>
                                        <button onClick={handleHide}>Ocultar informações</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default UsersList