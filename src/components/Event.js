import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Button } from 'react-bootstrap';

function Event({id,eventName, date, description, location, category, imageSrc,price}) {
  return (
    <Card className="mb-4 shadow-lg" style={{ width: '20rem', borderRadius: '10px', overflow: 'hidden' }}>
      <Card.Img variant="top" src={imageSrc} style={{ height: '180px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title className="text-center text-3xl">{eventName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-center">{date}</Card.Subtitle>
        <Card.Text className="text-center">
          <span className="d-block font-weight-bold">Location: {location}</span>
         
        </Card.Text>
        <Card.Text style={{fontWeight: 'bold'}}className="text-center">
          Price: {price}&euro;
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Link to={`/event/${id}`} className="btn btn-primary">View Event</Link>
        </div>
      </Card.Body>
    </Card>
  
  )
}

export default Event