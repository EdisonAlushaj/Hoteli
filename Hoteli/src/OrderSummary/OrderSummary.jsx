import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderSummaryCrud } from '../endpoints';
import cookieUtils from '../cookieUtils.jsx';

const OrderSummary = () => {
  const userId = cookieUtils.getUserIdFromCookies();
  const [data, setData] = useState({
    roomBookings: [],
    orders: [],
    orderDrinks: [],
    shezlongReservations: [],
    orderCoffees: [],
    activitiesReservations: [],
    saunaReservations: [],
    spaReservations: [],
    tableReservations: [],
    fitnesApplies: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios.get(`${OrderSummaryCrud}/summary/${userId}`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("API Error:", error);
        setError('Do you have an account. Please Sign In/Up.');
        setLoading(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      <h1 className="cover-title">Order Summary</h1>

      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Room Booking</p>
        <div className="activities-list">
          {data.roomBookings && data.roomBookings.length > 0 ? (
            data.roomBookings.map((roomBookings, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Booking ID:</strong> {roomBookings.roomBookingId}</p>
                  <p><strong>Check In Date:</strong> {roomBookings.checkInDate}</p>
                  <p><strong>Check Out Date:</strong> {roomBookings.checkOutDate}</p>
                  <p><strong>Payment Method:</strong> {roomBookings.paymentMethod}</p>
                  <p><strong>Total Order Price:</strong> ${roomBookings.totalBookingPrice}</p>
                  {roomBookings.roomBookingItems && roomBookings.roomBookingItems.length > 0 ? (
                    roomBookings.roomBookingItems.map((roomBookingItems, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p><strong>Room ID:</strong> {roomBookingItems.roomId}</p>
                        <p><strong>Room Name:</strong> {roomBookingItems.roomName}</p>
                        <p><strong>Quantity:</strong> {roomBookingItems.quantity}</p>
                        <p><strong>Price:</strong> {roomBookingItems.price}</p>
                        <p><strong>Price * Quantity:</strong> ${roomBookingItems.price * roomBookingItems.quantity}</p>
                      </div>
                    ))
                  ) : <p>No order items found.</p>}
                </div>
              </div>
            ))
          ) : <p>No orders found.</p>}
        </div>
      </div>

      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Food Order</p>
        <div className="activities-list">
          {data.orders && data.orders.length > 0 ? (
            data.orders.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Order ID:</strong> {order.orderId}</p>
                  <p><strong>Delivery Location:</strong> {order.deliveryLocation}</p>
                  <p><strong>Delivery Number:</strong> {order.deliveryNumber}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Total Order Price:</strong> ${order.totalOrderPrice}</p>
                  {order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((orderItem, idx) => (
                      <div key={idx}>
                        <p><strong>Food ID:</strong> {orderItem.menuFoodId}</p>
                        <p><strong>Food Name:</strong> {orderItem.foodName}</p>
                        <p><strong>Price:</strong> ${orderItem.price}</p>
                        <p><strong>Quantity:</strong> {orderItem.quantity}</p>
                        <p><strong>Price * Quantity:</strong> ${orderItem.price * orderItem.quantity}</p>
                      </div>
                    ))
                  ) : <p>No order items found.</p>}
                </div>
              </div>
            ))
          ) : <p>No orders found.</p>}
        </div>
      </div>

      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Drinks Order</p>
        <div className="activities-list">
          {data.orderDrinks && data.orderDrinks.length > 0 ? (
            data.orderDrinks.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Order ID:</strong> {order.orderId}</p>
                  <p><strong>Delivery Location:</strong> {order.deliveryLocation}</p>
                  <p><strong>Delivery Number:</strong> {order.deliveryNumber}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Total Order Price:</strong> ${order.totalOrderDrinkPrice}</p>
                  {order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((orderItem, idx) => (
                      <div key={idx}>
                        <p><strong>Drink ID:</strong> {orderItem.menuDrinkId}</p>
                        <p><strong>Drink Name:</strong> {orderItem.drinkName}</p>
                        <p><strong>Price:</strong> ${orderItem.price}</p>
                        <p><strong>Quantity:</strong> {orderItem.quantity}</p>
                        <p><strong>Price * Quantity:</strong> ${orderItem.price * orderItem.quantity}</p>
                      </div>
                    ))
                  ) : <p>No order items found.</p>}
                </div>
              </div>
            ))
          ) : <p>No orders found.</p>}
        </div>
      </div>

      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Coffee Order</p>
        <div className="activities-list">
          {data.orderCoffees && data.orderCoffees.length > 0 ? (
            data.orderCoffees.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Order ID:</strong> {order.orderCoffeeId}</p>
                  <p><strong>Delivery Location:</strong> {order.deliveryLocation}</p>
                  <p><strong>Delivery Number:</strong> {order.deliveryNumber}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Total Order Price:</strong> ${order.totalOrderPrice}</p>
                  {order.orderCoffeeItems && order.orderCoffeeItems.length > 0 ? (
                    order.orderCoffeeItems.map((orderItem, idx) => (
                      <div key={idx}>
                        <p><strong>Drink ID:</strong> {orderItem.menuCoffeeId}</p>
                        <p><strong>Drink Name:</strong> {orderItem.cafeName}</p>
                        <p><strong>Price:</strong> ${orderItem.price}</p>
                        <p><strong>Quantity:</strong> {orderItem.quantity}</p>
                        <p><strong>Price * Quantity:</strong> ${orderItem.price * orderItem.quantity}</p>
                      </div>
                    ))
                  ) : <p>No order items found.</p>}
                </div>
              </div>
            ))
          ) : <p>No orders found.</p>}
        </div>
      </div>

      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Shezlong Reservation</p>
        <div className="activities-list">
          {data.shezlongReservations && data.shezlongReservations.length > 0 ? (
            data.shezlongReservations.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Reservation ID:</strong> {order.reservationId}</p>
                  <p><strong>Shezlong Id:</strong> {order.shezlongId}</p>
                  <p><strong>Reservation Date:</strong> {order.reservationDate}</p>
                  {order.user && order.user.length > 0 ? (
                    order.user.map((user, idx) => (
                      <div key={idx}>
                        <p><strong>User Id:</strong> {user.userId}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                      </div>
                    ))
                  ) : <p>No shezlong reservation found.</p>}
                </div>
              </div>
            ))
          ) : <p>No reservation found.</p>}
        </div>
      </div>
      
      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Activities Reservations</p>
        <div className="activities-list">
          {data.activitiesReservations && data.activitiesReservations.length > 0 ? (
            data.activitiesReservations.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Reservation ID:</strong> {order.reservationId}</p>
                  <p><strong>Activities Id:</strong> {order.activitiesId}</p>
                  <p><strong>Activities Name:</strong> {order.activitiesName}</p>
                  {order.user && order.user.length > 0 ? (
                    order.user.map((user, idx) => (
                      <div key={idx}>
                        <p><strong>User Id:</strong> {user.userId}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                      </div>
                    ))
                  ) : <p>No Activities reservation found.</p>}
                </div>
              </div>
            ))
          ) : <p>No reservation found.</p>}
        </div>
      </div>

      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Sauna Reservations</p>
        <div className="activities-list">
          {data.saunaReservations && data.saunaReservations.length > 0 ? (
            data.saunaReservations.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Reservation ID:</strong> {order.reservationId}</p>
                  <p><strong>Sauna Id:</strong> {order.saunaId}</p>
                  <p><strong>Sauna Name:</strong> {order.saunaName}</p>
                  <p><strong>Reservation Date:</strong> {order.reservationDate}</p>
                  {order.user && order.user.length > 0 ? (
                    order.user.map((user, idx) => (
                      <div key={idx}>
                        <p><strong>User Id:</strong> {user.userId}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                      </div>
                    ))
                  ) : <p>No Sauna reservation found.</p>}
                </div>
              </div>
            ))
          ) : <p>No reservation found.</p>}
        </div>
      </div>

      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Spa Reservations</p>
        <div className="activities-list">
          {data.spaReservations && data.spaReservations.length > 0 ? (
            data.spaReservations.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Reservation ID:</strong> {order.reservationId}</p>
                  <p><strong>Spa Id:</strong> {order.spaId}</p>
                  <p><strong>Spa Name:</strong> {order.spaName}</p>
                  <p><strong>Reservation Date:</strong> {order.reservationDate}</p>
                  {order.user && order.user.length > 0 ? (
                    order.user.map((user, idx) => (
                      <div key={idx}>
                        <p><strong>User Id:</strong> {user.userId}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                      </div>
                    ))
                  ) : <p>No Spa reservation found.</p>}
                </div>
              </div>
            ))
          ) : <p>No reservation found.</p>}
        </div>
      </div>

      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Table Reservations</p>
        <div className="activities-list">
          {data.tableReservations && data.tableReservations.length > 0 ? (
            data.tableReservations.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Reservation ID:</strong> {order.reservationId}</p>
                  <p><strong>Table Id:</strong> {order.tableId}</p>
                  <p><strong>Max Guests:</strong> {order.maxGuests}</p>
                  <p><strong>Reservation Date:</strong> {order.reservationDate}</p>
                  <p><strong>Special Requests:</strong> {order.specialRequests}</p>
                  <p><strong>Establishment:</strong> {order.establishment}</p>
                  {order.user && order.user.length > 0 ? (
                    order.user.map((user, idx) => (
                      <div key={idx}>
                        <p><strong>User Id:</strong> {user.userId}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                      </div>
                    ))
                  ) : <p>No Table reservation found.</p>}
                </div>
              </div>
            ))
          ) : <p>No reservation found.</p>}
        </div>
      </div>

      <div>
        <p className="cover-title" style={{ fontSize: '1.4em' }}>Fitnes Apply</p>
        <div className="activities-list">
          {data.fitnesApplies && data.fitnesApplies.length > 0 ? (
            data.fitnesApplies.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Reservation ID:</strong> {order.reservationId}</p>
                  <p><strong>Fitnes Id:</strong> {order.FitnesId}</p>
                  {order.user && order.user.length > 0 ? (
                    order.user.map((user, idx) => (
                      <div key={idx}>
                        <p><strong>User Id:</strong> {user.userId}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                      </div>
                    ))
                  ) : <p>No Fitnes Apply found.</p>}
                </div>
              </div>
            ))
          ) : <p>No Apply found.</p>}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
