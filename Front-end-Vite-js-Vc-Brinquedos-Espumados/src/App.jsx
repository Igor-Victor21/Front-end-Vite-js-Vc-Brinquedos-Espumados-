import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api/api'

import style from './App.module.css'

import Vinha from './assets/image/vinha.png'
import Image from './assets/image/Crianças-brincando.png'


function App(){
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      if(parsedUser.email === 'igor.victorcontato@gmail.com'){
        navigate('/UserAdmin')
      }else{
        navigate('/User')
      }
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get('/users');
      const users = response.data;
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!foundUser) {
        setMessage("Email ou senha incorretos");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);

      //verifica se é admin
      if (foundUser.email === 'igor.victorcontato@gmail.com') {
        navigate('/UserAdmin');
      } else {
        navigate('/User');

      }

    } catch (error) {
      setMessage('Erro ao tentar logar: ' + (error.message || 'Erro desconhecido'));
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <section className={style.container}>
        <div className={style.wrapLogin}>
        <div className={style.containerLogin}>
          <img className={style.upperVine} src={Vinha} alt='vinha superior'/>
          <form className={style.login} onSubmit={handleLogin}>
            <div>
              <img className={style.leftVine} src={Vinha} alt='vinha esquerda'/>
              <img className={style.rightVine} src={Vinha} alt='vinha direita'/>
            </div>
            <h1 className={style.h1}>Bem vindo(a) de volta!!</h1>
            <p className={style.p}>Digite suas credenciais para acessar sua conta</p>
            <p className={style.pInput}>E-mail</p>
            <input 
            className={style.input} 
            type="email" 
            placeholder='Digite seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
            <p className={style.pInput}>Senha</p>
            <input 
            className={style.input} 
            type="password" 
            placeholder='Digite sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
            <button className={style.button} type='submit'>Entrar</button>
            <p>{message}</p>
            <p className={style.ou}>Ou</p>
            <p className={style.pLink}>Não tem uma conta? <Link to="/Login" className={style.link}>Cadastrar-se</Link></p>
          </form>
        </div>
        </div>
        <div className={style.wrapImage}>
          <img 
          className={style.img}
          src={Image}
          alt='teste'/>
        </div>
      </section>
    </>
  )
}

export default App