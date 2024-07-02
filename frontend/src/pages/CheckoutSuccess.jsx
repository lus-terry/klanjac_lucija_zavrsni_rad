import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const CheckoutSuccess = () => {
  let { orderId } = useParams();
  const { list } = useSelector(state => state.orders);
  const [order, setOrder] = useState({});

  useEffect(() => {
    let selectedOrder = list.find(order => order._id === orderId);
    if (selectedOrder) {
      setOrder(selectedOrder);
    } else {
      setOrder({});
    }
  }, [list, orderId]);

  return (
    <div className="content_container_blank ">
    <div className='px-20 w-full'>
     <div className="form_container_cart"> 
     <div className='flex flex-col gap-5'>

     
      <h2>Checkout Success</h2>
      <p>Thank you for your order!</p>
      <div className='normal_text'>Your order number is: {orderId}</div>
      
      
      <div className='flex flex-col gap-4  border-gray-500 border-t-2 pt-2 '>
        <p>Your order:</p>
        {order.products ? 
        (order.products.map((product, index) => (
        <div className='flex items-center'>
          <img className="pr-5 h-24 object-cover"  src={product?.image} alt={product?.name} />
          <div className='flex flex-col gap-1' key={index}>
            <div>{"NAME: " + product?.name}</div>
            <div>{"PRICE: €" + product?.price}</div>
            <div>{"QUANTITY: " + product?.cartQuantity}</div>
            <div>{"SUBTOTAL: " + product?.cartQuantity * product?.price}</div>
          </div>
        </div>
        ))
        ):(
          <div>No products available.</div>
        )}
        
       
        <p>TOTAL PRICE: {"€" + (order.total / 100).toLocaleString()}</p>
   
      </div>

      <div className='flex flex-col gap-4  border-gray-500 border-t-2 pt-2'>
        <p>SHIPPING DETAILS:</p> 
        <div className='flex flex-col gap-2'>
          <div>{"NAME: " + order?.shipping?.firstName + " " + order?.shipping?.lastName}</div>
          <div>{"EMAIL: " + order?.shipping?.email}</div>
          <div>{"PHONE: " + order?.shipping?.phone}</div>
          <div className='flex flex-col'>
            <div>ADDRESS:</div>
            <div>{order?.shipping?.firstName + " " + order?.shipping?.lastName}</div>
            <div>{order?.shipping?.address + " " + order?.shipping?.apartment}</div>
            <div>{order?.shipping?.city + ", " + order?.shipping?.postalCode}</div>
            <div>{order?.shipping?.country}</div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default CheckoutSuccess;
