import * as React from 'react';
import {Button} from "semantic-ui-react"
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { addToCart, getTotals } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ProductCardDialog({prodId}) {
const [product, setProduct] = useState({})
  const [open, setOpen] = React.useState(false);
  const {items} = useSelector(state => state.products)

  const handleClickOpen = () => {
    let selectedProd = items.filter((item) => item._id === prodId)
    selectedProd = selectedProd[0]
    setProduct(selectedProd)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      dispatch(getTotals());
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
        
            <div className="flex m-3 overflow-hidden  bg-white "   >
                    
                    <img
                    style={{ height: "600px" , width: "400px"}}
                    className="object-cover m-0"
                    src={product.image?.url}
                    alt={product.name}
                    />

                    <div style={{ width: "500px" }} className="p-10 items-center">
                        <div className="h-1/3 mt-1 px-2 razmaknut_text text-center text-lg flex flex-col gap-2">
                            {product.name}
                            <div className="  normal_text text-sm">
                            {product.price}€
                            </div>
                        </div>

                        
                        
                        <div className="ml-10 h-1/3 w-full text-left  pt-1 flex flex-col normal_text text-lg">
                            
                                {product.longDesc}
                    
                            
                        </div>

                        <div className="h-1/3  flex flex-col justify-end items-center">
                            <Button  onClick={() => handleAddToCart(product)} style={{width: '70%'}} >ADD TO CART</Button>
                        </div>

                    </div>


                    
                    </div>
     
      
      </BootstrapDialog>
    </React.Fragment>
  );
}