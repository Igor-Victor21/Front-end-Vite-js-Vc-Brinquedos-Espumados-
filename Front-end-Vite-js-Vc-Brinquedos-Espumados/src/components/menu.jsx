import { useNavigate } from "react-router-dom";
import MenuLogo from '../assets/image/Logo.png'
import InfoIcon from '../assets/image/InfoUser.png'
import CreateUsersIcon from '../assets/image/UserCreate.png'
import CreateProductsIcon from '../assets/image/CreateProduct.png'
import Home from '../assets/image/Home.png'
import User from '../assets/image/user-test-sem-figma.png'
import Logout from '../assets/image/logout.png'

import style from './menu.module.css'
import { useState, useEffect } from "react";

export const Menu = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        
        if (loggedUser) {
            try {
                const parsedUser = JSON.parse(loggedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Erro ao localizar o usuário:', error);
            }
        }
    }, []);

    const isAdmin = () => {
        if (!user || !user.email) return false;
        return user.email.toLowerCase() === "igor.victorcontato@gmail.com";
    };

    const goToInfoUsers = () => {
        if (isAdmin()) {
            navigate(`/UsersList`);
        } else {
            navigate(`/User`);
        }
    }

    const goToHome = () => {
        if (isAdmin() === true) {
            navigate(`/UserAdmin`);
        } else {
            navigate(`/CreateProducts`);
        }
    }

    const goToCreateUsers = () => {
        if (isAdmin() === true) {
            navigate(`/CreateUsers`);
        } else {
            navigate(`/User`);
        }
    }

    const goToProductsList = () => navigate(`/ProductsList`)
    
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className={style.navBar}>
            <img style={{ width: '80px', height: '80px', cursor: 'pointer' }} onClick={() => navigate('/UserAdmin')} src={MenuLogo} alt="Logo" />
            <img style={{ width: '27px', height: '27px', margin: '10px', cursor: 'pointer' }} src={Home} alt="Home" onClick={goToHome} />
            <img style={{ width: '34px', height: '29px', margin: '10px', cursor: 'pointer' }} src={InfoIcon} alt="UserInfoList" onClick={goToInfoUsers} />
            
            {isAdmin() && (
                <img style={{ width: '26px', height: '24px', margin: '10px', cursor: 'pointer' }} src={CreateUsersIcon} alt="Create" onClick={goToCreateUsers} />
            )}
            
            <img className={style.iconProductsList} src={CreateProductsIcon} alt="ProductsList" onClick={goToProductsList} />

            <div className={style.wrapIcons}>
                <img style={{ width: '29px', height: '29px', margin: '5px', marginTop: '35px',cursor: 'pointer' }} src={Logout} alt="Person" onClick={logout}/>
                <img style={{ margin: '30px', width: '38px', height: '39px', border: '2px solid black', borderRadius: '100%' }} src={User} alt="User" />
            </div>
        </nav>
    )
}