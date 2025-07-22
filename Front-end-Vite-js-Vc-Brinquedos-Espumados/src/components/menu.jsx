import { useNavigate } from "react-router-dom";
import MenuLogo from '../assets/image/Logo.png'
import InfoIcon from '../assets/image/InfoUser.png'
import CreateUsersIcon from '../assets/image/UserCreate.png'
import CreateProductsIcon from '../assets/image/CreateProduct.png'
import Home from '../assets/image/Home.png'
import User from '../assets/image/user-test-sem-figma.png'
import Logout from '../assets/image/logout.png'

import style from './menu.module.css'
import { useState } from "react";

export const Menu = () => {
    const navigate = useNavigate()
    

    const goToInfoUsers = () => navigate(`/UsersList`)
    const goToCreateUsers = () => navigate(`/CreateUsers`)
    const goToCreateProducts = () => navigate(`/CreateProducts`)
    const goToHome = () => navigate(`/`)
    const logout = () => {
        localStorage.removeItem('user');
        setUsers(null);
        navigate('/Login');
    };

    console.log(open)

    return (
        <nav className={style.navBar}>
            <img style={{ width: '80px', height: '80px', cursor: 'pointer' }} onclick="window.scrollTo({ top: 0, behavior: 'smooth' })" onClick={() => navigate('/UserAdmin')}src={MenuLogo} alt="Logo" />
            <img style={{ width: '27px', height: '27px',margin: '10px' }} src={Home} alt="Home" onClick={goToHome} />
            <img style={{ width: '34px', height: '29px',margin: '10px',}} src={InfoIcon} alt="Person" onClick={goToInfoUsers} />
            <img style={{ width: '26px', height: '24px',margin: '10px' }} src={CreateUsersIcon} alt="Person" onClick={goToCreateUsers} />
            <img style={{ width: '37px', height: '34px',margin: '10px' }} src={CreateProductsIcon} alt="Person" onClick={goToCreateProducts} />

            <div className={style.wrapIcons}>
                <img style={{ width: '29px', height: '29px', margin: '5px', marginTop: '35px' }} src={Logout} alt="Person" onClick={logout} />
                <img style={{ margin: '30px', width: '38px', height: '39px', border: '2px solid black', borderRadius: '100%' }} src={User} alt="User" />
            </div>
        </nav>
    )



}