import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../api/api'
// import { Nav } from "./components/navBar"
import style from './CreateProducts.module.css'

function CreateProducts() {
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    description: '',
    measures: '',
    price: '',
    image: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const checkAdmin = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/Login');
        return;
      }
      const user = JSON.parse(storedUser);
      if (user.email !== 'igor.victorcontato@gmail.com') {
        navigate('/User');
      } else {
        fetchUsers();
      }
    };
    checkAdmin();
  }, [navigate]);

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
      <div style={{ padding: '2rem' }}>
        <h1>Criar novo produto</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <input type="text" name="name" placeholder="Nome Produto" value={product.name} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Descrição" value={product.description} onChange={handleChange} required />
          <input type="text" name="measures" placeholder="Medidas" value={product.measures} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Preço" value={product.price} onChange={handleChange} required />
          <input type="text" name="image" placeholder="URL da imagem" value={product.image} onChange={handleChange} required />
          <button type="submit">Criar Produto</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </section>
  )
}

export default CreateProducts