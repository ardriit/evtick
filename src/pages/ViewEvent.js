import { useLocalStorage } from '@uidotdev/usehooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

function ViewEvent() {
  const {id} = useParams()
  const [qty, setQty] = useState(1)
  const[event, setEvent] = useState()
  const [cart, saveCart] = useLocalStorage('cart', [])
  const [user, saveUser] = useLocalStorage("users", {});

  useEffect(() =>{
    axios.get(`https://66a2a1ad967c89168f20b1c6.mockapi.io/api/v1/events/${id}`)
    .then(resp =>{
        if(resp.status === 200) setEvent(resp.data)
            
    })
    .catch(error => console.log(error))
  },[id])

  const handleCart = e =>{
    e.preventDefault()

  if (!user || !user.id) {
    alert('Please login first');
    return;
  }

    const exists = (event, events) => events.some(ev => ev.id === event.id);
    if (exists(event, cart)) {
      saveCart(cart.map(item => item.id === event.id ? { ...item, qty: item.qty + parseInt(qty) } : item));
    } else {
      saveCart([...cart, { ...event, qty: parseInt(qty) }]);
    }

    alert('Event added to cart');
    setQty(1)
  };
    
  
  return (
    <section className='py-5'>
      <Container>

        {
            event && <div className='row'>

                <img src={event.imageSrc} className='col-6 '/>
                <div className='col-6 text-center border '>
                
                    <h1>{event.eventName}</h1>
                    
                    <div className='row'>
                    <p className='col-6 text-muted'>Location: {event.location}</p>
                    <p className='col-6 text-muted'>Event Category: {event.category}</p>
                    </div>

                    <h3>Price: {event.price}&euro;</h3>

                    <form className='mb-2 text-center' onSubmit={handleCart}>

                    <input type='number' name='qty' min={1} max={4} style = {{height: 34, marginRight: 10}} onChange={e => setQty(parseInt(e.target.value))} value={qty}/>

                    <Button variant='outline-primary' type='submit'>
                    <i class="fa-solid fa-plus"> Add to cart</i>
                    </Button>
                    </form>

                    <h3>Total: {event.price * qty}&euro;</h3>

                    <Card>
                        <Card.Header>Description of Event </Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-2">
                                {' '}
                                {event.description}.{' '}
                            </blockquote>
                        </Card.Body>
                    </Card>


                   
                </div>
               
            </div>
       }

      </Container>

    </section>
  )
}

export default ViewEvent