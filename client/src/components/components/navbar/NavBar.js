import React, {useState, useEffect, useContext} from 'react'
import {useAuth0} from "@auth0/auth0-react"
import {Link} from 'react-router-dom'
import {UserContext} from '../../context/UserContext'

import NavLink from './NavLink'
import { LogoSquare, 
         DashboardBlack, 
         SavedBlack,
         LogoutBlack,
         SettingsBlack,
         SupportBlack,
         UserBlack,
         Hamburger, 
         Admin
        } from '../../../assets'
import './NavBar.css'

const NavBar = (props) => {
    const { logout } = useAuth0();

    const [currPage, setCurrPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        switch(window.location.pathname) {
            case '/api/home': 
                setCurrPage(0);
                break;
            case '/api/profile': 
                setCurrPage(1);
                break;
            case '/api/settings':
                setCurrPage(2);
                break;
            case '/api/saved': 
                setCurrPage(3);
                break;
            case '/api/support': 
                setCurrPage(4);
                break;
            default: 
                break;
        }
    }, [])

    return(
        <div className="NavBar">
            <img className="hamburger" 
                 src={Hamburger} 
                 onClick={() => setOpen(!open)}
                 alt="Hamburger menu icon" />
            <div className={open ? 'contents open' : 'contents'}>
                <div className="header">
                    <img src={LogoSquare} alt="Medi logo" />
                    <h2>Medi</h2>
                </div>
                <div className="links">
                    
                    <NavLink to="/api/home" 
                            onClick={() => setCurrPage(0)} 
                            img={DashboardBlack} 
                            selected={currPage === 0}
                            name="Dashboard"/>
                    <NavLink to="/api/profile" 
                            onClick={() => setCurrPage(1)} 
                            img={UserBlack} 
                            selected={currPage === 1} 
                            name="Profile"/>
                    <NavLink to="/api/settings" 
                            onClick={() => setCurrPage(2)} 
                            img={SettingsBlack} 
                            selected={currPage === 2} 
                            name="Settings"/>
                    <NavLink to="/api/saved" 
                            onClick={() => setCurrPage(3)} 
                            img={SavedBlack} 
                            selected={currPage === 3} 
                            name="Saved Offers"/>
                    <NavLink to="/api/support" 
                            onClick={() => setCurrPage(4)} 
                            img={SupportBlack} 
                            selected={currPage === 4} 
                            name="Support"/>
                    {user.role === 'admin' && 
                    <NavLink to="/api/admin" 
                             img={Admin} 
                             name="Admin"/>}
                    <NavLink to="#" 
                            onClick={() => logout()} 
                            img={LogoutBlack} 
                            selected={currPage === 5} 
                            name="Log out"/>
                </div>
            </div>
            
        </div>
    )
  }

  export default NavBar