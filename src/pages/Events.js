import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Event from '../components/Event'

// function Events() {
//   const[events, setEvents] = useState()
//   const [page, setPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
  
//   const url =new URL(`https://66a2a1ad967c89168f20b1c6.mockapi.io/api/v1/events`)
//   url.searchParams.append('page', page)
//   url.searchParams.append('limit', 10)
// console.log(url)


// const handlePrev = e => {
//   e.preventDefault();
//   if (page > 1) {
//     setPage(page - 1);
//   }
// };

// const handleNext = (e) => {
//   e.preventDefault();
//   if (page < totalPages) {
//     setPage(page + 1);
//   }
// };
// useEffect(() =>{
// axios.get(url)
// .then(resp => {if(resp.status === 200){
  
//   setEvents(resp.data)
// }
// }).catch(error => console.log(error))
// },[page])
function Events() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  
  const fetchEvents = async (page) => {
    try {
      const response = await axios.get('https://66a2a1ad967c89168f20b1c6.mockapi.io/api/v1/events', {
        params: {
          page: page,
          limit: 10
        }
      });

      if (response.status === 200) {
        setEvents(response.data);
        
        // Check if there is more data
        if (response.data.length < 10) {
          setHasNextPage(false); // No more data if less than limit
        }     
        else {
          setHasNextPage(true); // More data available
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  const handlePrev = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (hasNextPage) {
      setPage(page + 1);
    }
  };

  return (
    <section className='py-5'>
      <Container>
       {/* Insert there prev and next */}
       <div className='mb-5 '>
        <Button className='me-2' onClick={handlePrev} variant='primary'>Previous</Button>
        <Button className='' onClick={handleNext} variant='primary'>Next</Button>

       </div>

        <div className='row'>
          {
            events && events.map(event => <div className='col-4' key={event.id}>
              <Event {...event}/>
            </div>)
          }
        </div>
      </Container>
    </section>
  )
}

export default Events