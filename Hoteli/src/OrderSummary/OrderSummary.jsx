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
    </div>
  );
};

export default OrderSummary;
