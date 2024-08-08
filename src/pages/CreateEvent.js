import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from '@uidotdev/usehooks';

function CreateEvent() {
const navigator = useNavigate()
const [user, saveUser] = useLocalStorage("users", {});

    const handleCreateEvent = e => {
        e.preventDefault()
        const elements = e.target.elements 
        const eventName = elements['eventName'].value
        const date = elements['date'].value
        const description = elements['description'].value
        const location = elements['location'].value
        const category = elements['category'].value
        const imageSrc = elements['imageSrc'].value
        const price = elements['price'].value


        if (user && user.id) {
          axios({
            method: 'POST',
            url: `https://66a2a1ad967c89168f20b1c6.mockapi.io/api/v1/users/${user.id}/events`,
            data: { eventName, date, description, location, category, imageSrc,price }
          }).then(resp => {
            if (resp.status === 201) navigator('/dashboard');
            else alert('Something went wrong');
          }).catch(err => {
            console.error(err);
            alert('An error occurred while creating the event.');
          });
        } else {
          alert('User not logged in');
        }
      };
      
  
    
  return (
    <section className='py-5'>
    <Container>
      <form  onSubmit={handleCreateEvent}>
        <Card className='w-50 mx-auto'>
          <Card.Body>
            <Card.Title>Create Event</Card.Title>
            <Card.Text>
        
              <Form.Control
                name="eventName"
                type='text'
                placeholder="Name of Event"
                aria-label="eventName"
                className='mb-3'
                
              />
              <Form.Control
                name="date"
                type='date'
                placeholder="Date of Event"
                aria-label="date"
                className='mb-3'
              />
              <Form.Control
                name="description"
                type='text'
                placeholder="Description of event"
                aria-label="description"
                className='mb-3'
              />
              <Form.Control
                name="location"
                type='text'
                placeholder="Location of event"
                aria-label="location"
                className='mb-3'
              />
              <Form.Control
                name="category"
                type='text'
                placeholder="Category of event"
                aria-label="category"
                className='mb-3'
              />
              <Form.Control
              name="imageSrc"
              type='text'
              placeholder="Insert image URL"
              aria-label="imageSrc"
              className='mb-3'
            />
            <Form.Control
              name="price"
              type='number'
              placeholder="Ticket Price "
              aria-label="price"
              className='mb-3'
            />
            </Card.Text>
            <Button variant="outline-primary" type='submit' className='me-2'>Create</Button>
            <Link to="/" className="btn btn-outline-secondary">Home</Link>
          </Card.Body>
        </Card>
      </form>
    </Container>
  </section>
  )
}

export default CreateEvent