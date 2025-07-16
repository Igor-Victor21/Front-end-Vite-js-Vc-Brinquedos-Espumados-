import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import style from './UserAdmin.module.css';

function UserAdmin() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editUserId, setEditUserId] = useState(null);
    const [editData, setEditData] = useState({
        fullName: '',
        email: '',
        password: '',
        cpf: '',
        socialReason: '',
        stateRegistration: '',
        cnpj: '',
        cep: '',
        uf: '',
        city: '',
        neighborhood: '',
        road: '',
        numberHouse: '',
        complement: '',
        numberPhone: '',
        dateOfBirth: '',
    });

    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

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

    const fetchUsers = async () => {
        try {
            const response = await api.get('users');
            setUsers(response.data);
        } catch (err) {
            setError('Erro ao carregar usuários');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
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
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter((u) => u.id !== id));
        } catch (err) {
            setError('Erro ao deletar o usuário');
        }
    };

    const handleProductsDelete = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter((p) => p.id !== id));
        } catch (err) {
            alert('Erro ao deletar produto');
        }
    };

    const handleEditClick = (user) => {
        setEditUserId(user.id);
        setEditData({
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            cpf: user.cpf,
            socialReason: user.socialReason,
            stateRegistration: user.stateRegistration,
            cnpj: user.cnpj,
            cep: user.cep,
            uf: user.uf,
            city: user.city,
            neighborhood: user.neighborhood,
            road: user.road,
            numberHouse: user.numberHouse,
            complement: user.complement,
            numberPhone: user.numberPhone,
            dateOfBirth: user.dateOfBirth,
        });
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

    const handleEditChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' && value !== '' ? Number(value) : value;
        setEditData({ ...editData, [name]: newValue });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`users/${editUserId}`, editData);
            setEditUserId(null);
            fetchUsers();
        } catch (err) {
            setError('Erro ao atualizar usuário');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUsers(null);
        navigate('/Login');
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <section id={style.menuBar}>
                <div className={style.buttonMenu} onClick={() => navigate('/CreateUsers')}>
                    <h2>Criar usuário</h2>
                </div>
                <div className={style.buttonMenu} onClick={() => navigate('#s1')}>
                    <h2>Exibir usuários</h2>
                </div>
                <div className={style.buttonMenu} onClick={() => navigate('/CreateProducts')}>
                    <h2>Criar produto</h2>
                </div>
                <div className={style.buttonMenu} onClick={() => navigate('#s2')}>
                    <h2>Exibir produtos</h2>
                </div>
                <div className={style.buttonMenu} onClick={handleLogout}>
                    <h2>Sair</h2>
                </div>
            </section>

            <section id={style.s1}>
                <div style={{ padding: '2rem' }}>
                    <h1>Lista de usuários</h1>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} style={{ marginBottom: '1rem' }}>
                                {editUserId === user.id ? (
                                    <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <input type="text" name="fullName" value={editData.fullName} onChange={handleEditChange} placeholder="Nome Completo" required />
                                        <input type="email" name="email" value={editData.email} onChange={handleEditChange} placeholder="E-mail" required />
                                        <input type="password" name="password" value={editData.password} onChange={handleEditChange} placeholder="Senha" required />
                                        <input type="text" name="cpf" value={editData.cpf} onChange={handleEditChange} placeholder="CPF" required />
                                        <button type="submit">Salvar</button>
                                        <button type="button" onClick={() => setEditUserId(null)}> Cancelar
                                        </button>
                                    </form>
                                ) : (
                                    <>
                                        <strong>{user.fullName}</strong> — {user.email}
                                        <div style={{ display: 'inline-flex', gap: '0.5rem', marginLeft: '1rem', }}
                                        >
                                            <button onClick={() => handleEditClick(user)}>Editar</button>
                                            <button onClick={() => handleDelete(user.id)}>Deletar</button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id={style.s2}>
                <div style={{ padding: '2rem' }}>
                    <h1>Lista de produtos</h1>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id} style={{ marginBottom: '1rem' }}>
                                {editProductId === product.id ? (
                                    <>
                                        <input name="name" value={editedProduct.name} onChange={handleChange} placeholder="Nome Produto" />
                                        <input name="description" value={editedProduct.description} onChange={handleChange} placeholder="Descrição" />
                                        <input name="price" type="number" value={editedProduct.price === 0 ? '' : editedProduct.price} onChange={handleChange} placeholder="Preço" />
                                        <input name="measures" type="text" value={editedProduct.measures} onChange={handleChange} placeholder="Medidas" />
                                        <input name="image" value={editedProduct.image} onChange={handleChange} placeholder="URL da Imagem" />
                                        <button onClick={handleSave}>Salvar</button>
                                        <button onClick={() => setEditProductId(null)}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <img width={50} height="auto" src={product.image} alt={product.name} /> <br /> Nome: {product.name} <br /> Descrição: {product.description} <br /> Preço: {product.price} <br /> Medidas: {product.measures} <br />
                                        <button onClick={() => handleProductsEditClick(product)} style={{ marginLeft: '1rem' }}>Editar</button>
                                        <button onClick={() => handleProductsDelete(product.id)} style={{ marginLeft: '0.5rem' }}>Deletar</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default UserAdmin;
