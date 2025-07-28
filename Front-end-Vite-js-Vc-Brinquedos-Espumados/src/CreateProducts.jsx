import { useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../api/api'
import { Menu } from './components/menu'
import style from './CreateProducts.module.css'

import SetaVoltar from './assets/image/seta.png'


function CreateProducts() {
  const navigate = useNavigate()

  const [menuVisible, setMenuVisible] = useState(true)
  const [product, setProduct] = useState({
    name: '',
    description: '',
    measures: '',
    price: '',
    image: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = {
        ...product,
        price: parseFloat(product.price),
      }
      await api.post('/products', body)
      setSuccess('Produto criado com sucesso!')
      setTimeout(() => navigate('/'), 1000)
    } catch (err) {
      setError('Erro ao criar produto')
    }
  }

  return (
    <section>
      <div className={style.wrapCreateProducts}>
        <div className={style.wrapPageBack}>
          <img className={style.backBtn} src={SetaVoltar} alt="Voltar" onClick={() => navigate(-1)} />
        </div>
        <h1>Detalhes do Produto</h1>
        <p>Informações importantes para descrever e exibir seu produto.</p>

        <form onSubmit={handleSubmit} className={style.formProducts}>
          <div className={style.row}>
            <div className={style.inputGroup}>
              <h2>Nome do Produto:</h2>
              <input type="text" name="name" placeholder="Nome Produto" value={product.name} onChange={handleChange} required />
            </div>
            <div className={style.inputGroup}>
              <h2>Preço:</h2>
              <input type="number" name="price" placeholder="Preço" value={product.price} onChange={handleChange} required />
            </div>
          </div>

          <h2>Url do Produto:</h2>
          <input type="text" name="image" placeholder="URL da imagem" value={product.image} onChange={handleChange} required />

          <h2>Descrição:</h2>
          <input type="text" name="description" placeholder="Descrição" value={product.description} onChange={handleChange} required style={{ height: '100px' }} />

          <h2>Medidas:</h2>
          <input type="text" name="measures" placeholder="Medidas" value={product.measures} onChange={handleChange} required />

          <button type="submit">Criar Produto</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
      {/* <div>
        {/* menu é ocultado se menuVisible for falso */}
      <div className={`${menuVisible ? '' : style.hiddenMenu}`}>
      </div>
    </section >
  )
}

export default CreateProducts
