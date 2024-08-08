import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react'
import { Badge } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const [cart, saveCart] = useLocalStorage('cart', [])
  const [user, saveUser] = useLocalStorage("users", {});
const navigator=useNavigate()

  const handleLogout = e => {
    e.preventDefault()
      saveUser({})
      saveCart([])
      navigator('/')
    
  }
  return (
    <Nav className="ms-auto">
      <Nav.Link href="/">Events</Nav.Link>
      <Nav.Link href="createevent">Create Event</Nav.Link>
      <Nav.Link href="/cart">Cart <Badge bg="dark"> {cart.length}</Badge>  
      </Nav.Link>
      <NavDropdown title={(user && user.email) && user.name} id="basic-nav-dropdown ">
        {
          !(user && user.email) ? <>
        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
        <NavDropdown.Item href="/register">Register</NavDropdown.Item>
        </> :
        <>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
        </>
        }
        </NavDropdown>
    </Nav>
)
}

export default Menu