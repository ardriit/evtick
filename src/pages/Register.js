import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
const navigator = useNavigate()

const handleRegister = e =>{
  e.preventDefault()
  const elements =e.target.elements
  const name = elements['name'].value
  const surname = elements['surname'].value
  const email = elements['email'].value
  const password = elements['password'].value

  axios(
    {
      method: 'POST',
      url:'https://66a2a1ad967c89168f20b1c6.mockapi.io/api/v1/users',
      data:{name, surname, email, password}
    }
  ).then(
    resp => {
      if(resp.status == 201 ) navigator('/login'); else alert('Something is wrong');
    } ).catch(e => console.log(e))

}


  return (
    <section className='py-10'>
      <Container>
        <form onSubmit={handleRegister}>
          <Card className='w-50 mx-auto'>
            <Card.Body>
              <Card.Title>Register</Card.Title>
              <Card.Text>
                <Form.Control
                  name="name"
                  placeholder="Name"
                  aria-label="Name"
                  className='mb-3'
                />
                <Form.Control
                  name="surname"
                  placeholder="Surname"
                  aria-label="Surname"
                  className='mb-3'
                />
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
              <Button variant="outline-primary" type='submit' className='me-2'>Register</Button>
              <Link to="/login" className="btn btn-outline-secondary">Login</Link>
            </Card.Body>
          </Card>
        </form>
      </Container>
    </section>
  )
}

export default Register