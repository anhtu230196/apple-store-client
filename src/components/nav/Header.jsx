import React, { useEffect, useState } from 'react'
import { Badge, Menu } from 'antd';
import { HomeOutlined, UserAddOutlined, UserOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux';
import Search from '../forms/Search';

const { SubMenu, Item } = Menu;

function Header() {
    const [current, setCurrent] = useState('home')
    const dispatch = useDispatch()
    const { user, cart } = useSelector(state => state)

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    useEffect(() => {
        setCurrent(window.location.pathname);
    }, [window.location.pathname]);

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart?.length} offset={[9, 0]}>Cart</Badge>
                </Link>
            </Item>
            {
                !user ? <>
                    <Item key="register" icon={<UserAddOutlined />} className="float-right">
                        <Link to="/register">Register</Link>
                    </Item>
                    <Item key="login" icon={<UserOutlined />} className="float-right">
                        <Link to="/login">Login</Link>
                    </Item>
                </> : <SubMenu key="SubMenu" title={user.email} className="float-right" icon={<UserOutlined />}>
                    {user.role === "admin" ?
                        <Item><Link to="/admin/dashboard">Dashboard</Link></Item>
                        :
                        <Item><Link to="/user/history">Dashboard</Link></Item>
                    }
                    <Item icon={<LogoutOutlined />} onClick={logout} >Logout</Item>
                </SubMenu>
            }
            <span className="float-right">
                <Search />
            </span>
        </Menu>
    )
}

export default Header
