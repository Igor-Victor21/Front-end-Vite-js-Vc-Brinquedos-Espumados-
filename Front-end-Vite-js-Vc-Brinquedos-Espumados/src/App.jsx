import style from './App.module.css'
import { useNavigate } from 'react-router-dom'

function App(){
  const navigate = useNavigate()
  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <section className={style.card}>
        <button onClick={() => navigate('/Login')}>Sing-in</button>
        <h1>Bom dia Michely!</h1>
        <p>Tenha momentos divertidos e únicos com seus filhos com a VC brinquedos Espumados</p>
        <input placeholder='Procurar'></input>
      </section>

      <h4>Nova Coleção</h4>

      <section>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </section>

      <section>
        {/* cards */}
      </section>
    </>
  )

}

export default App