import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { useState } from "react";
import OrderCardDialog from './OrderCardDialog';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function UserCardDialog({userId}) {
  const [user, setUser] = useState({})
  const [orders, setOrders] = useState([])
  const [open, setOpen] = React.useState(false);
  const { list: usersList } = useSelector(state => state.users);
  const { list: ordersList } = useSelector(state => state.orders);

  const handleClickOpen = () => {
    let selectedUser = usersList.filter((user) => user._id === userId)
    setUser(selectedUser[0] || {});
    console.log("user", user)
    console.log("orders", orders)
    let selectedOrders = ordersList.filter((order) => order.userId === userId)
    console.log("selected", selectedOrders)
    setOrders(selectedOrders);
    
    setOpen(true);
  };

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
        
            <div className="flex flex-col m-3 overflow-hidden  bg-white p-10 gap-3"   >
     
                        <h2>User details</h2>
                        <div className='flex w-full justify-between'>

                            <div className='flex flex-col w-1/2 gap-2'>
                                <div>{"NAME: " + user.name}</div>
                                <div>{"EMAIL: " + user.email}</div>
                                <div>{"ID: " + user._id}</div>
                                <div>{"ROLE: " + (user.isAdmin ? "Admin" : "Customer")}</div>
                          
                            </div>

                            <div className='flex flex-col w-1/2'>
                              <p className='pb-5'>User's orders:</p>
                              <div className='flex flex-col gap-2'>
                                {orders.map(order => (
                                  <div className='flex justify-between' key={order._id} >
                                    {order._id} 
                                    <button className='text-green-500 hover:text-green-700'>
                                      <OrderCardDialog  orderId={order._id}/>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          
                          </div>
                  
                        </div>                        

               

                    
            
     
      
      </BootstrapDialog>
    </React.Fragment>
  );
}