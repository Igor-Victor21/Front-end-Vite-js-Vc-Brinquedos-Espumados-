import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api/api'

import style from './Login.module.css'

import Vinha from './assets/image/vinha.png'
import Image from './assets/image/user-test-sem-figma.png'

function Login() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    try {
      const response = await api.post('/users', {
        fullName: name,
        email,
        password,
        // Campos obrigatórios com valores padrão
        cpf: "00000000000",
        socialReason: "Pessoa Física",
        stateRegistration: "ISENTO",
        cnpj: "00000000000000",
        cep: "00000000",
        uf: "UF",
        city: "Cidade",
        neighborhood: "Bairro",
        road: "Rua",
        numberHouse: 0,
        complement: "Não informado",
        numberPhone: "00000000000",
        dateOfBirth: "2000-01-01"
      })

      if (response.status === 201) {
        setMessage("Cadastro realizado com sucesso!")
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data || error.message)
      setMessage('Erro ao tentar cadastrar. Verifique os dados e tente novamente.')
      setTimeout(() => setMessage(""), 3000)
    }
  }

  return (
    <>
      <section className={style.container}>
        <div className={style.wrapCadastro}>
          <div className={style.wrapRegister}>
            <img className={style.upperVine} src={Vinha} alt='vinha superior' />
            <form className={style.cadastro} onSubmit={handleRegister}>
              <div className={style.vineWrapper}>
                <img className={style.leftVine} src={Vinha} alt='vinha esquerda' />
                <div className={style.formContent}>
                  <h1 className={style.h1}>Crie sua conta</h1>
                  <p className={style.p}>Preencha os campos para se registrar</p>

                  <div className={style.inputGroup}>
                    <p className={style.pInput}>Nome</p>
                    <input
                      className={style.input}
                      type="text"
                      placeholder='Digite seu nome'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <p className={style.pInput}>E-mail</p>
                    <input
                      className={style.input}
                      type="email"
                      placeholder='Digite seu email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <p className={style.pInput}>Senha</p>
                    <input
                      className={style.input}
                      type="password"
                      placeholder='Digite sua senha'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <p className={style.pInput}>Confirmar Senha</p>
                    <input
                      className={style.input}
                      type="password"
                      placeholder='Confirme sua senha'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className={style.wrapButton}>
                  <button className={style.button} type='submit'>Registrar-se</button>

                  </div>
                  {message && <p className={style.message}>{message}</p>}
                  <p className={style.ou}>Ou</p>
                  <p className={style.pLink}>Já tem uma conta? <Link to="/" className={style.link}>Entre aqui</Link></p>
                </div>
                <img className={style.rightVine} src={Vinha} alt='vinha direita' />
              </div>
            </form>
          </div>
        </div>
        <div className={style.wrapImage}>
          <img
            className={style.img}
            src={Image}
            alt='teste'
          />
        </div>
      </section>
    </>
  )
}

export default Login