import { useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../api/api'
import style from './CreateUsers.module.css'
import { Menu } from './components/menu'

function CreateUsers() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        cpf: 'null',
        socialReason: 'null',
        stateRegistration: 'null',
        cnpj: 'null',
        cep: 'null',
        uf: 'null',
        city: 'null',
        neighborhood: 'null',
        road: 'null',
        numberHouse: 0,
        complement: 'null',
        numberPhone: 'null',
        dateOfBirth: 'null'
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('/users', user)
            setSuccess('Usuário criado com sucesso')
            setTimeout(() => navigate('/User'), 1000)
        } catch (err) {
            setError('Erro ao criar usuário')
        }
    }
    return (
        <section>
            <Menu/>
            <div>
                <h1>Criar novo usuário</h1>
                <form onSubmit={handleSubmit} className={style.formSubmit}>
                    <input type="text" name='fullName' placeholder='Nome completo' value={user.fullName} onChange={handleChange} required />
                    <input type="email" name='email' placeholder='E-mail' value={user.email} onChange={handleChange} required />
                    <input type="password" name='password' placeholder='Senha' value={user.password} onChange={handleChange} required />
                    <button type="submit">Criar Usuário</button>
                </form>

                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
        </section>
    )
}

export default CreateUsers