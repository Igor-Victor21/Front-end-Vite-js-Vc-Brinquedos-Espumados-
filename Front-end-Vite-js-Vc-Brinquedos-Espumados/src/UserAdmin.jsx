import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Menu } from './components/menu'
import style from './UserAdmin.module.css';

import SetaVoltar from './assets/image/seta.png'

function UserAdmin() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        description: '',
        measures: '',
        price: '',
        image: ''
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) navigate('/');

        async function fetchProducts() {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (err) {
                setError('Erro ao carregar produtos');
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [navigate]);

    const isAdmin = () => {
        if (!user || !user.email) return false;
        return user.email.toLowerCase() === "igor.victorcontato@gmail.com";
    };

    const handleProductsDelete = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter((p) => p.id !== id));
        } catch (err) {
            alert('Erro ao deletar produto');
        }
    };

    const handleProductsEditClick = (product) => {
        setEditProductId(product.id);
        setEditedProduct({ ...product });
    };

    const handleSave = async () => {
        try {
            const response = await api.put(`/products/${editProductId}`, editedProduct);
            setProducts(products.map((p) => (p.id === editProductId ? response.data : p)));
            setEditProductId(null);
        } catch (err) {
            alert('Erro ao atualizar produto');
        }
    };

    const handleCancelEdit = () => {
        setEditProductId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value
        });
    };

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <section className={style.navigateBar}>
                <Menu />
                <header>
                    <div className={style.wrapHeader}>
                        <div className={style.wrapBoxProduct}>
                            <img className={style.backBtn} src={SetaVoltar} alt="Voltar" onClick={() => navigate(-1)} />
                            <div>
                                <h1 className={style.textHeader}>Adicione Um Novo Produto</h1>
                            </div>
                            <div className={style.wrapButton}>
                                <button className={style.buttonPublicar} onClick={() => navigate('/CreateProducts')}>Publicar</button>
                            </div>
                        </div>
                    </div>
                </header>
            </section>

            <section className={style.containerImg}>
                <div style={{ padding: '2rem' }}>
                    <h1>Lista de Produtos</h1>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {products.map((product) => (
                            <li key={product.id} className={style.listProducts}>
                                {editProductId === product.id ? (
                                    <div className={style.editForm}>
                                        <input type="text" name="name" value={editedProduct.name} onChange={handleChange} placeholder="Nome" />
                                        <input type="text" name="description" value={editedProduct.description} onChange={handleChange} placeholder="Descrição" />
                                        <input type="text" name="measures" value={editedProduct.measures} onChange={handleChange} placeholder="Medidas" />
                                        <input type="number" name="price" value={editedProduct.price} onChange={handleChange} placeholder="Preço" />
                                        <input type="text" name="image" value={editedProduct.image} onChange={handleChange} placeholder="URL da Imagem" />
                                        <div className={style.editButtons}>
                                            <button onClick={handleSave} className={style.wrapEditProducts}>Salvar</button>
                                            <button onClick={handleCancelEdit} className={style.wrapEditProducts}>Cancelar</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={style.wrapProducts}>
                                        <img src={product.image} alt={product.name} className={style.productImg} />
                                        <br />
                                        <strong>{product.name}</strong>
                                        <br />
                                        <button className={style.buttonProducts} onClick={() => handleProductsEditClick(product)}>Editar</button>
                                        <button className={style.buttonProducts} onClick={() => handleProductsDelete(product.id)}>Deletar</button>
                                    </div>
                                )}
                            </li>
                        ))}
                        <li>
                            <button className={style.btnAdd} onClick={() => navigate('/CreateProducts')}>+</button>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default UserAdmin;