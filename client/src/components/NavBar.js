import React, {useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
import {useAuth0} from "@auth0/auth0-react"
import {Link} from 'react-router-dom'

const NavBar = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { logout } = useAuth0();

    return(
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/api/home">Medi</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/api/home">Dashboard</NavLink>       
                        </NavItem>
                        {/* <NavItem>
                            <NavLink tag={Link} to="/api/saved">Saved Discounts</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/api/settings">Settings</NavLink>
                        </NavItem> */}
                        {props.role === 'admin' ? 
                        <NavItem>
                            <NavLink tag={Link} to="/api/admin">Admin Panel</NavLink>
                        </NavItem> : 
                        <span></span>}
                        <NavItem>
                            <NavLink href="#" onClick={() => logout()}>Log out</NavLink>
                        </NavItem>
                        
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
  }

  export default NavBar