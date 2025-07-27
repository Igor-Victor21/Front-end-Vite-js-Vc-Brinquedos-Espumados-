import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import style from './User.module.css';
import { Menu } from './components/menu';

function User() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/Login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setEditData(parsedUser);
        setLoading(false);
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/users/${user.id}`, editData);
            setUser(editData);
            localStorage.setItem('user', JSON.stringify(editData));
            setEditMode(false);
        } catch (err) {
            setError('Erro ao atualizar usuário');
            console.error(err);
        }
    };

    const handleEditChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' && value !== '' ? Number(value) : value;
        setEditData({ ...editData, [name]: newValue });
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;
    if (!user) {
        return (
            <section id={style.s1}>
                <div style={{ padding: '2rem' }}>
                    <h1>Nenhum usuário encontrado</h1>
                    <button onClick={handleLogout}>Voltar ao Login</button>
                </div>
            </section>
        );
    }

    return (
        <>
            <Menu />
            <section id={style.s1}>
                <div className={style.containerUser}>
                    <h1>Detalhes do Usuário</h1>

                    {!editMode ? (
                        <>
                            <div className={style.wrapUser}>
                                <p><strong>Nome Completo:</strong> {user.fullName}</p>
                                <p><strong>E-mail:</strong> {user.email}</p>
                                <p><strong>CPF:</strong> {user.cpf}</p>
                                <p><strong>Razão Social:</strong> {user.socialReason}</p>
                                <p><strong>Inscrição Estadual:</strong> {user.stateRegistration}</p>
                                <p><strong>CNPJ:</strong> {user.cnpj}</p>
                                <p><strong>CEP:</strong> {user.cep}</p>
                                <p><strong>Estado:</strong> {user.uf}</p>
                                <p><strong>Cidade:</strong> {user.city}</p>
                                <p><strong>Bairro:</strong> {user.neighborhood}</p>
                                <p><strong>Rua:</strong> {user.road}</p>
                                <p><strong>Número:</strong> {user.numberHouse}</p>
                                <p><strong>Complemento:</strong> {user.complement}</p>
                                <p><strong>Telefone:</strong> {user.numberPhone}</p>
                                <p><strong>Data de Nascimento:</strong> {user.dateOfBirth}</p>
                                <button className={style.btnEdit} onClick={() => setEditMode(true)}>Editar</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <input type="text" name="fullName" value={editData.fullName} onChange={handleEditChange} placeholder="Nome Completo" required />
                            <input type="email" name="email" value={editData.email} onChange={handleEditChange} placeholder="E-mail" required />
                            <input type="password" name="password" value={editData.password} onChange={handleEditChange} placeholder="Senha" required />
                            <input type="text" name="cpf" value={editData.cpf} onChange={handleEditChange} placeholder="CPF" required />
                            <input type="text" name="socialReason" value={editData.socialReason} onChange={handleEditChange} placeholder="Razão Social" required />
                            <input type="text" name="stateRegistration" value={editData.stateRegistration} onChange={handleEditChange} placeholder="Inscrição Estadual" required />
                            <input type="text" name="cnpj" value={editData.cnpj} onChange={handleEditChange} placeholder="CNPJ" required />
                            <input type="text" name="cep" value={editData.cep} onChange={handleEditChange} placeholder="CEP" required />
                            <input type="text" name="uf" value={editData.uf} onChange={handleEditChange} placeholder="UF" required />
                            <input type="text" name="city" value={editData.city} onChange={handleEditChange} placeholder="Cidade" required />
                            <input type="text" name="neighborhood" value={editData.neighborhood} onChange={handleEditChange} placeholder="Bairro" required />
                            <input type="text" name="road" value={editData.road} onChange={handleEditChange} placeholder="Rua" required />
                            <input type="number" name="numberHouse" value={editData.numberHouse} onChange={handleEditChange} placeholder="Número da Casa" required />
                            <input type="text" name="complement" value={editData.complement} onChange={handleEditChange} placeholder="Complemento" />
                            <input type="text" name="numberPhone" value={editData.numberPhone} onChange={handleEditChange} placeholder="Telefone" required />
                            <input type="text" name="dateOfBirth" value={editData.dateOfBirth} onChange={handleEditChange} placeholder="Data de Nascimento" required />

                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <button className={style.btnEdit} type="submit">Salvar</button>
                                <button className={style.button} type="button" onClick={() => setEditMode(false)}>Cancelar</button>
                                <div style={{ marginBottom: '1rem' }}>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </>
    );
}

export default User;