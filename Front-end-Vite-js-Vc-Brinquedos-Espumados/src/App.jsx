import style from './App.module.css'
import { useNavigate } from 'react-router-dom'

import UserImage from './assets/image/user-test-sem-figma.png'

function App(){
  const navigate = useNavigate()
  return (
    <>
  {/* <InfoModal visible={isModalVisible} onClose={() => setModalVisible(false)} /> */}
  {/* <InfoCell /> */}

  {/* {showToast && (
    <div className={style.toastConteiner}>
      <p className={style.toastMessage}>{messageToast}</p>
    </div>
  )} */}

  <section className={style.Card}>
    <button className={style.UserImagePosition}>
      <img
        className={style.UserImage}
        src={UserImage}
        alt="User"
      />
    </button>

    <p className={style.MessageIntro}>Bom dia!</p>
    <p className={style.Slogan}>
      Tenha momentos divertidos e únicos com seus filhos com a VC brinquedos Espumados
    </p>
    <input className={style.SearchBar} type="text" placeholder="Procurar" />
  </section>

  <p className={style.Text}>Nova Coleção</p>

  <section className={style.Bar}>
    <button className={style.BarItem} onClick={() => setBarContent(1)}>
      <p className={style.textBtn}>Todos</p>
    </button>
    <button className={style.BarItem} onClick={() => setBarContent(2)}>
      <span className={style.textBtn}>Kits</span>
    </button>
    <button className={style.BarItem} onClick={() => setBarContent(3)}>
      <span className={style.textBtn}>Promoções</span>
    </button>
  </section>

  <div className={style.conteinerCards}>
    <div className={style.wrapCards}>
      {/* {produtosFiltrados.map((item) => (
        <button
          key={item.id}
          style={{ marginRight: 16 }}
          onClick={() => handleProduct(item)}
        >
          <Card
            name={item.name}
            description={item.description}
            image={item.image}
            price={item.price}
            id={item.id}
            toast={(jaExiste) => showCustomToast(jaExiste)}
          />
        </button>
      ))} */}
    </div>
  </div>
  {/* <Nav /> */}
    </>
  )

}

export default App