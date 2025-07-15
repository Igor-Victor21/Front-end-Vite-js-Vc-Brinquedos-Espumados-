import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import './Login.module.css'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      navigate('/')
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get('/users');
      const users = response.data;
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!foundUser) {
        setMessage("Email ou senha incorretos");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);

      //verifica se é admin
      if (foundUser.email === 'igor.victorcontato@gmail.com') {
        navigate('/UserAdmin');
      } else {
        navigate('/User');

      }

    } catch (error) {
      setMessage('Erro ao tentar logar: ' + (error.message || 'Erro desconhecido'));
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Entrar</button>
        <p>{message}</p>
      </form>
    </div>
  )
}

export default Login