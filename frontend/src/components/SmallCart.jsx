import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../slices/cartSlice";




const SmallCart = () => {

    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleNavigate = (link) => {
        navigate(link);
    };
    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };
    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem));
    };
    const handleIncreaseCart = (cartItem) => {
        dispatch(addToCart(cartItem));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return(
        <div className="flex flex-col" >
 
        

    
        
                
                    <div className=" flex  items-center justify-center text-center  border-gray-500 border-b-2  " >
                        <div className="razmaknut_text w-2/5 text-lg justify-center text-center">PRODUCT</div>
                        <div className="razmaknut_text w-1/5 text-lg justify-center text-center">PRICE</div>
                        <div className="razmaknut_text w-1/5 text-lg justify-center text-center">QUANTITY</div>
                        <div className="razmaknut_text w-1/5 text-lg justify-center text-center">TOTAL</div>
                 
                    </div>

                   
                    <div className=" normal_text flex flex-col items-center pt-5" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {cart.cartItems?.map(cartItem => (
                            <div className="flex border-b border-t h-50 items-center w-full" key= {cartItem._id}>


                                {/*div koji sadrži sliku, ime i description */}
                                 <div className=" w-2/5 flex items-left ">
                                    <img className= "h-20 pr-8 p-2 " src={cartItem.image.url} alt={cartItem.name} />
                                    <div className=" flex flex-col text-left justify-center">
                                        <h3 className="razmaknut_text">{cartItem.name}</h3>
                                       
                                    </div>
                                </div>

                                {/*div koji sadrži price */}
                                <div className="flex w-1/5 justify-center text-center">
                                    €{cartItem.price}
                                </div>

                                {/*div koji sadrži quantity */}
                                <div class="flex w-1/5 items-center justify-center " >
                                    <div class="flex text-center justify-between px-2 items-center border-zinc-500/50 border-2 p-1" style={{width: '100px'}}>
                                        <button onClick={() => handleDecreaseCart(cartItem)}
                                                className="rounded-full text-center flex items-center justify-center overflow-hidden bg-zinc-500/25 w-6 h-6 pb-1 "
                                        >
                                           <span className="font-thin">-</span>
                                        </button>
                                        <div class="text-center items-center justify-center cart-total">
                                            {cartItem.cartTotalQuantity}
                                        </div>
                                        <button onClick={() => handleIncreaseCart(cartItem)}
                                                className="rounded-full text-center flex items-center justify-center overflow-hidden bg-zinc-500/25 w-6 h-6 pb-1 ">
                                            <span className="font-bold">+</span>
                                        </button>
                                    </div>
                                </div>


                                    
                                
                                    
                                {/*div koji sadrži total */}       
                                <div className="w-1/5  justify-center text-center relative">
                              
                             
                                <div className="razmaknut_text text-center justify-center ">
                                    €{cartItem.price * cartItem.cartTotalQuantity}
                                </div>

                                <button className="absolute right-3 top-0 hover:font-bold" onClick={() => handleRemoveFromCart(cartItem)}>
                                       x
                                </button>
                                
                           

                                </div>

                                {/*div koji sadrži remove button */}    
                               

                          
                            </div>
                        ))}
                    </div>

                    <div className="flex">

                        <div className=" w-3/5  flex items-left ">
                      
                            
                        </div>
                        <div className="flex  w-2/5 ">
            
                            
                                <div className="flex pt-10 obican_text w-full">
                                                <div className="razmaknut_text w-2/3 text-m">TOTAL COST:</div>
                                                <div className="w-1/3 text-center "> €{cart.cartTotalAmount}</div>
                                </div> 
                               
                                </div>
        
    
                        </div>
            
        
        </div>
      
        
    );
};

export default SmallCart;