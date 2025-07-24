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
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [editing, setEditing] = useState(false)
    const [editForm, setEditForm] = useState({
        image: '',
        name: '',
        measures: '',
        price: 0
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) navigate('/')
    }, [navigate])

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products')
            setProducts(response.data)
        } catch (err) {
            setError('Erro ao carregar produtos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleProductClick = (product) => {
        setSelectedProduct(selectedProduct?.id === product.id ? null : product)
        setEditing(false)
        setEditForm({
            image: product.image,
            name: product.name,
            // Garante que é string
            measures: product.measures.toString(),
            // Garante que é float 
            price: parseFloat(product.price) 
        })
    }

    const handleEdit = () => {
        setEditing(true)
    }

    const handleSave = async () => {
        try {
            const productToUpdate = {
                ...editForm,
                // Converte para float
                price: parseFloat(editForm.price), 
                // Garante que é string
                measures: editForm.measures.toString() 
            }
            
            await api.put(`/products/${selectedProduct.id}`, productToUpdate)
            fetchProducts()
            setEditing(false)
            setSelectedProduct({...selectedProduct, ...productToUpdate})
        } catch (err) {
            setError('Erro ao atualizar produto')
        }
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/products/${selectedProduct.id}`)
            fetchProducts()
            setSelectedProduct(null)
        } catch (err) {
            setError('Erro ao deletar produto')
        }
    }

    const handleHide = () => {
        setSelectedProduct(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditForm({
            ...editForm,
            [name]: name === "price" ? parseFloat(value) || 0 : value
        })
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
                            {products.map((product) => (
                                <div key={product.id}>
                                    <div 
                                        className={style.containerListInfo} 
                                        onClick={() => handleProductClick(product)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div>
                                            <img style={{ width: '80px', height: '80px' }} src={product.image} alt="foto-produto"/>
                                        </div>
                                        <div>
                                            <p className={style.textInfoList}>{product.name}</p>
                                        </div>
                                        <div>
                                            <p className={style.textInfoList}>{product.measures}</p>
                                        </div>
                                        <div>
                                            <p className={style.textInfoList}>R$ {product.price}</p>
                                        </div>
                                    </div>

                                    {selectedProduct?.id === product.id && (
                                        <div className={style.productDetails}>
                                            {editing ? (
                                                <div className={style.editForm}>
                                                    <input type='text' name='image' value={editForm.image} onChange={handleInputChange} placeholder='URL da Imagem'></input>
                                                    <input type='text' name='name' value={editForm.name} onChange={handleInputChange} placeholder='Nome do Produto'></input>
                                                    <input type='text' name='measures' value={editForm.measures} onChange={handleInputChange} placeholder='Medidas'></input>
                                                    <input type='number' name='price' value={editForm.price} onChange={handleInputChange} placeholder='Preço' step='0.01'></input>
                                                </div>
                                            ) : (
                                                <div className={style.productInfo}>
                                                    <img 
                                                        style={{ width: '150px', height: '150px' }} 
                                                        src={selectedProduct.image} 
                                                        alt="foto-produto-expandida" 
                                                    />
                                                    <p>Nome: {selectedProduct.name}</p>
                                                    <p>Medidas: {selectedProduct.measures}</p>
                                                    <p>Preço: R$ {selectedProduct.price}</p>
                                                </div>
                                            )}
                                            <div className={style.actions}>
                                                {editing ? (
                                                    <button onClick={handleSave}>Salvar</button>
                                                ) : (
                                                    <button onClick={handleEdit}>Editar</button>
                                                )}
                                                <button onClick={handleDelete}>Deletar</button>
                                                <button onClick={handleHide}>Ocultar informações</button>
                                            </div>
                                        </div>
                                    )}
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