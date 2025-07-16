import style from './App.module.css'
import { useNavigate, Link } from 'react-router-dom'

import Image from './assets/image/user-test-sem-figma.png'

function App(){
  const navigate = useNavigate()
  return (
    <>
      <section className={style.container}>
        <div className={style.wrapLogin}>
          <div className={style.login}> 
            <h1>Bem vindo(a) de volta!!</h1>
            <p>Digite suas credenciais para acessar sua conta</p>
            <input type="text" placeholder='Digite seu email'/>
            <input type="password" placeholder='Digite sua senha'/>
            <button onClick={() => navigate("/Login")}>Entrar</button>
            <p>Ou</p>
            <p>Não tem uma conta? <Link to="/Login" className={style.link}>Cadastrar-se</Link></p>
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