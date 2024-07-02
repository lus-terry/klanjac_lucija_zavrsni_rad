import React from "react";
import {Button} from "semantic-ui-react"
import { useDispatch } from "react-redux";
import { addToCart, getTotals } from "../slices/cartSlice";



const ProductCardView = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        dispatch(getTotals());
    };

  


  return (
    <div className="flex m-3 overflow-hidden  bg-white shadow-md" style={{ height: "600px", width: "900px" }} >
   
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


  );
};

export default ProductCardView;