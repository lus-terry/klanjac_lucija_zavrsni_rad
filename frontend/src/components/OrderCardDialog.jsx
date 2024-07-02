import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { useState } from "react";
import moment from 'moment';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function OrderCardDialog({orderId}) {
  const [order, setOrder] = useState({})
  const [open, setOpen] = React.useState(false);
  const {list} = useSelector(state => state.orders)

  const handleClickOpen = () => {
    let selectedOrder = list.find(order => order._id === orderId);
    if (selectedOrder) {
      setOrder(selectedOrder);
    } else {
      setOrder({});
    }
    setOpen(true);
  };

  React.useEffect(() => {
    if (open) {
      console.log("order", order);
    }
  }, [open, order]);


  const handleClose = () => {
    setOpen(false);
  };



  return (
    <React.Fragment style={{ height: "600px", width: "900px" }}>
      <div onClick={handleClickOpen}>
        View
      </div>
      <BootstrapDialog
        onClose={handleClose}
  
        open={open}
        maxWidth={"md"} 
        fullWidth={true}
      >
        
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        
            <div className="flex flex-col m-3 overflow-hidden  bg-white p-10 gap-3"  style={{ width: "500px" }} >
     
                        <h2>Order details</h2>
                        <div>
                        {"DELIVERY STATUS: " + order?.delivery_status}
                        </div>
                        <div>
                        {"CREATED: " + moment(order?.createdAt).fromNow()}
                        </div>
                        

                        <div className='flex flex-col gap-2'>
                            <p>ORDERED PRODUCTS:</p> 
                            {order.products ? 
                            (order.products.map((product, index) => (
                            <div className='flex flex-col' key={index}>
                                <div>{"NAME: " + product?.name}</div>
                                <div>{"PRICE: €" + product?.price}</div>
                                <div>{"QUANTITY: " + product?.cartQuantity}</div>
                            </div>))
                            ):(
                              <div>No products available.</div>
                            )}
                            <p>TOTAL PRICE:</p> 
                            <div>{"€" + (order.total/100).toLocaleString()}</div>
                        </div>
                  
                        

                        

                        <div className='flex flex-col gap-2'>
                            <p>SHIPPING DETAILS:</p> 
                            <div className='flex flex-col'>
                                <div>{"NAME: " + order?.shipping?.firstName + " " + order?.shipping?.lastName}</div>
                                <div>{"EMAIL: " + order?.shipping?.email}</div>
                                <div>{"PHONE: " + order?.shipping?.phone}</div>
                                <div className='flex flex-col'>
                                    <div>ADDRESS:</div>
                                    <div>{order?.shipping?.firstName + " " + order?.shipping?.lastName}</div>
                                    <div>{order?.shipping?.address + " " + order?.shipping?.apartment}</div>
                                    <div>{order?.shipping?.city + ", " + order?.shipping?.postal_code}</div>
                                    <div>{order?.shipping?.address?.country}</div>
                                </div>
                                
                        </div>
                  
                        </div>                        

                    </div>


                    
            
     
      
      </BootstrapDialog>
    </React.Fragment>
  );
}