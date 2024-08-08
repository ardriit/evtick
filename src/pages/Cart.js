import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { Button, Container, Table, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Cart() {

  const [cart, saveCart] = useLocalStorage('cart', [])
  const [user, saveUser] = useLocalStorage("users", {});
  const [orders, saveOrders] = useLocalStorage("orders", []);


const handleRemove = (id) =>{
    // e.preventDefault()
    saveCart(cart.filter(item => item.id !== id))
}


const handleOrder = e => {
  e.preventDefault()
    const newOrder ={
      email: user.email,
      items:cart,
      date: new Date().toISOString(),
    }
    
    saveOrders([...orders, newOrder])
 
    saveCart([])
    alert('Order placed successfully')

}

  return (
    <section className="py-5">
      <Container>
        <h1 className="text-center mb-4">Cart</h1>
        {cart && cart.length > 0 ? (
          <>
          <Table  bordered >
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Price (&euro;)</th>
                <th>Quantity</th>
                <th>Total (&euro;)</th>
                <th>Remove</th>

              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.eventName}</td>
                  <td>{item.price}&euro;</td>
                  <td>{item.qty}</td>
                  <td>{item.price * item.qty}&euro;</td>
                  <td>
                    <Button variant='danger' onClick={() => handleRemove(item.id)}>Remove</Button>
                  </td>

                </tr>
                
              ))}
             
            </tbody>
       
          </Table>
          {
          (user && user.email) ? <>
          <Form onSubmit={handleOrder}>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm={1}>
                  Email:
                </Form.Label>
                <Col sm="4">
                  <Form.Control readOnly defaultValue={user.email} />
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit">
                Order
              </Button>
            </Form>
            </> : (cart && cart.length > 0) && <p>Please <Link to="/login">login</Link> first.</p>
        }
          </>

        ) : (
          <p className="text-center">Your cart is empty</p>
        )}
  
      </Container>
    </section>
  )
}

export default Cart