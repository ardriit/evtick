import { useLocalStorage } from '@uidotdev/usehooks'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Tab, Tabs, Table } from 'react-bootstrap'
import Event from '../components/Event'


function Dashboard() {

  const [user, saveUser] = useLocalStorage("users", {});
  const [orders, saveOrders] = useLocalStorage("orders", []);
  const[myEvents, setMyEvents] = useState()

  const filteredOrders = orders.filter(order => order.email === user.email);

  useEffect(() =>{
  axios.get(`https://66a2a1ad967c89168f20b1c6.mockapi.io/api/v1/users/${user.id}/events`)
  .then(resp => {
    if(resp.status = 200){
      setMyEvents(resp.data)
  }
})
},[])
  return (
    
    
    <section className='py-5'>
      <Container>
      <Tabs
      defaultActiveKey="myevents"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="myevents" title="My Events">
      <div className='row'>
          {
            myEvents && myEvents.map(event => <div className='col-3' key={event.id}>
              <Event {...event}/>
            </div>)
          }
        </div>
      </Tab>
      <Tab eventKey="myorders" title="My Orders">
      <h2 className="text-center mt-5">Orders</h2>
        { filteredOrders.length > 0 ? (
          <Table striped bordered >
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Order Date</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, orderIndex) => (
                <tr key={orderIndex}>
                  <td>{orderIndex + 1}</td>
                  <td>{order.email}</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>
                    <Table  bordered >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Event Name</th>
                          <th>Price (€)</th>
                          <th>Quantity</th>
                          <th>Total (€)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, itemIndex) => (
                          <tr key={item.id}>
                            <td>{itemIndex + 1}</td>
                            <td>{item.eventName}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                            <td>{item.price * item.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </td>
                </tr>
              ))}
            </tbody>
       
          </Table>
   ) : (
          <p className="text-center">You have no orders</p>
        )}
      </Tab>
      </Tabs>
      </Container>
    </section>
  )
}

export default Dashboard