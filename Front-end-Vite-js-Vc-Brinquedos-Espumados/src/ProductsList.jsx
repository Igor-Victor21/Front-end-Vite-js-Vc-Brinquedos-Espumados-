import style from './Products.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import { Menu } from './components/menu'

function ProductsList() {
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [editProductId, setEditProductId] = useState(null)
    const [editedProduct, setEditedProduct] = useState({})

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) navigate('/')
    }, [navigate])

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.get('/products')
                setProducts(response.data)
            } catch (err) {
                setError('Erro ao carregar produtos')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const handleDelete = async (id) => {
        try {
            await api.delete(`/products/${id}`)
            setProducts(products.filter((p) => p.id !== id))
        } catch (err) {
            alert('Erro ao deletar produto')
        }
    }

    const handleEditClick = (product) => {
        setEditProductId(product.id)
        setEditedProduct({ ...product })
    }

    const handleSave = async () => {
        try {
            const response = await api.put(`/products/${editProductId}`, editedProduct)
            setProducts(
                products.map((p) => (p.id === editProductId ? response.data : p))
            )
            setEditProductId(null)
        } catch (err) {
            alert('Erro ao atualizar produto')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditedProduct({ ...editedProduct, [name]: name === "price" || name === "measures" ? Number(value) : value })
    }


    if (loading) return <p>Carregando produtos...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <Menu />
            <section id={style.containerInfoListProducts}>
                <div className={style.headerTitle}>
                    <h1>Lista de Produtos</h1>
                    <p>Rastrear estoque, disponibilidade e necessidades de reabastecimento em tempo real.</p>
                </div>
                <div>
                    <section id={style.containerList}>
                        <div className={style.wrapList}>
                            <div className={style.headerList}>
                                <div className={style.textHeaderList}>
                                    <p className={style.textList}>Imagem Produto</p>
                                </div>
                                <div className={style.textHeaderList}>
                                    <p className={style.textList}>Nome</p>
                                </div>
                                <div className={style.textHeaderList}>
                                    <p className={style.textList}>Medidas</p>
                                </div>
                                <div className={style.textHeaderList}>
                                    <p className={style.textList}>Preço</p>
                                </div>
                            </div>
                            {products.map((list) => (
                                <div key={list.id} className={style.containerListInfo}>
                                    <div>
                                        <img style={{ width: '80px', height: '80px' }} src={list.image} alt="foto-produto" />
                                    </div>
                                    <div>
                                        <p className={style.textInfoList}>{list.name}</p>
                                    </div>
                                    <div>
                                        <p className={style.textInfoList}>{list.measures}</p>
                                    </div>
                                    <div>
                                        <p className={style.textInfoList}>R$ {list.price}</p>
                                    </div>
                                    <button onClick={() => handleEditClick(product)} style={{ marginLeft: '1rem' }}>Editar</button>
                                    <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '0.5rem' }}>Deletar</button>
                                </div>
                            ))}
                        </div>

                    </section>
                </div>
            </section>
        </>
    )
}

export default ProductsList