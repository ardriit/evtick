import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className='bg-light py-5 mt-5'>
    <Container className='d-flex justify-content-between'>
    <p className="text-center mb-0">Copyrights &copy; EvTick, 2024.</p>
    <p className="text-center mb-0">Developed by <a href='https://github.com/ardriit' target='blank'>ardriit</a></p>
    </Container>  
    </footer>
  )
}

export default Footer