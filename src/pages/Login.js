import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from '@uidotdev/usehooks';


function Login() {

const navigator = useNavigate()
const [user, saveUser] = useLocalStorage("users", {});

const handleLogin = e =>{
  e.preventDefault()
  const elements = e.target.elements

  const email = elements['email'].value
  const password = elements['password'].value
  axios({
    method: 'GET',
    url:'https://66a2a1ad967c89168f20b1c6.mockapi.io/api/v1/users'
  }).then(resp =>{
    if(resp.status === 200){

      const users = resp.data
      const user = users.filter(user => (user.email === email ))
      const userP = users.filter(userP => (userP.password === password ))
      
      if(user.length > 0){

        if(userP.length>0){
        delete user[0].password
        saveUser({...user[0]})
        navigator('/')
        }else{
          alert('Password is wrong')
        }
      }else{
        alert('User is not registred')
      }
    
    }
  })
  .catch(e => console.log(e))
}

  return (
    <section className='py-10'>
      <Container>
        <form onSubmit={handleLogin}>
          <Card className='w-50 mx-auto'>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Card.Text>
          
                <Form.Control
                  name="email"
                  type='email'
                  placeholder="Email"
                  aria-label="Email"
                  className='mb-3'
                />
                <Form.Control
                  name="password"
                  type='password'
                  placeholder="Password"
                  aria-label="Password"
                  className='mb-3'
                />
              </Card.Text>
              <Button variant="outline-primary" type='submit' className='me-2'>Login</Button>
              <Link to="/" className="btn btn-outline-secondary">Register</Link>
            </Card.Body>
          </Card>
        </form>
      </Container>
    </section>
  )
}

export default Login