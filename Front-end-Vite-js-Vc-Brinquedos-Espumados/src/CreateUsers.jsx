import { useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../api/api'
import style from './CreateUsers.module.css'
import { Menu } from './components/menu'

import User from './assets/image/user-test-sem-figma.png'

function CreateUsers() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        cpf: '',
        socialReason: '',
        stateRegistration: '',
        cnpj: '',
        cep: '',
        uf: '',
        city: '',
        neighborhood: '',
        road: '',
        numberHouse: '',
        complement: '',
        numberPhone: '',
        dateOfBirth: ''

    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: name === 'numberHouse' ? Number(value) : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('/users', user)
            setSuccess('Usuário criado com sucesso')
            setTimeout(() => navigate('/User'), 1000)
        } catch (err) {
            setError('Erro ao criar usuário')
            console.log(err)
        }
    }
    return (
        <section>
            <Menu />

            <section>
                <div className={style.wrapPhotoUser}>
                    <img className={style.photoUser} src={User} alt="User" />
                </div>

                <div className={style.wrapInputs}>
                    <p className={style.inputTitle}>Categoria:</p>
                    <input className={style.inputUser} type="text" />
                    <p className={style.inputTitle}>Atribuir Função:</p>
                    <input className={style.inputUser} type="text" />
                    <p className={style.inputTitle}>Status:</p>
                    <input className={style.inputUser} type="text" />
                </div>
            </section>
            <div className={style.wrapForm}>
                <form onSubmit={handleSubmit} className={style.formSubmit}>
                    <p className={style.title}>Informações Pessoais</p>
                    <p className={style.inputTitle}>Nome Completo:</p>
                    <input className={style.inputUser} type="text" name='fullName' value={user.fullName} onChange={handleChange} required />
                    <p className={style.inputTitle}>Data de Nascimento:</p>
                    <input className={style.inputUser} type="text" name='dateOfBirth' value={user.dateOfBirth} onChange={handleChange} required />
                    <p className={style.inputTitle}>CPF: </p>
                    <input className={style.inputUser} type="text" name='cpf' value={user.cpf} onChange={handleChange} required />
                    <p className={style.inputTitle}>CEP: </p>
                    <input className={style.inputUser} type="text" name='cep' value={user.cep} onChange={handleChange} required />
                    <p className={style.inputTitle}>Cidade: </p>
                    <input className={style.inputUser} type="text" name='city' value={user.city} onChange={handleChange} required />
                    <p className={style.inputTitle}>UF: </p>
                    <input className={style.inputUser} type="text" name='uf' value={user.uf} onChange={handleChange} required />
                    <p className={style.inputTitle}>Bairro: </p>
                    <input className={style.inputUser} type="text" name='neighborhood' value={user.neighborhood} onChange={handleChange} required />
                    <p className={style.inputTitle}>Rua: </p>
                    <input className={style.inputUser} type="text" name='road' value={user.road} onChange={handleChange} required />
                    <p className={style.inputTitle}>Número da Residência:</p>
                    <input className={style.inputUser} type="number" name='numberHouse' value={user.numberHouse} onChange={handleChange} min="0" required />
                    <p className={style.inputTitle}>Complemento: </p>
                    <input className={style.inputUser} type="text" name='complement' value={user.complement} onChange={handleChange} required />
                    <p className={style.title}>Informações de Login</p>
                    <p className={style.inputTitle}>E-mail</p>
                    <input className={style.inputUser} type="email" placeholder='Digite seu E-mail' name='email' value={user.email} onChange={handleChange} required />
                    <p className={style.inputTitle}>Senha: </p>
                    <input className={style.inputUser} type="password" placeholder='Digite a sua Senha' name='password' value={user.password} onChange={handleChange} required />
                    <p className={style.title}>Contato</p>
                    <p className={style.inputTitle}>Número de Telefone: </p>
                    <input className={style.inputUser} type="text" name='numberPhone' value={user.numberPhone} onChange={handleChange} required />
                    <p className={style.inputTitle}>E-mail: </p>
                    <div style={{ position: "relative" }}>
                        <input className={style.inputUser} type="text" placeholder='Insira um E-mail de Contato' />
                        <button className={style.btnAdd}>+</button>
                    </div>
                    <p className={style.inputTitle}>Rede Social: </p>
                    <div style={{ position: "relative" }}>
                        <input className={style.inputUser} type="text" placeholder='Rede Social (Opcional)' />
                        <button className={style.btnAdd}>+</button>
                    </div>
                    <p className={style.inputTitle}>Função: </p>
                    <input className={style.inputUser} type="text" />
                    <p className={style.inputTitle}>Experiência: </p>
                    <input className={style.inputUser} type="text" />
                    <button className={style.btnSubmit} type="submit">Criar Usuário</button>
                    <button className={style.btnCancel}>Cancelar</button>
                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
        </section>
    )
}

export default CreateUsers