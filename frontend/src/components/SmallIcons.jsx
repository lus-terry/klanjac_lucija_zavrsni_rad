
import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import FavouritesIcon from './FavouriteIcon';
import AvatarIcon from './AvatarIcon';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slices/authSlice';
import { toast } from "react-toastify";
import AvatarIconGreen from './AvatarIconGreen';
import { clearCart} from "../slices/cartSlice";

const SmallIcons = () => {

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)


  return (
    <div className="flex items-center justify-center space-x-1">
      <div className="w-8 h-8 flex items-center justify-center">
        <Link to="/favourites" ><FavouritesIcon /></Link>
      </div>
      <div className="w-8 h-8 flex items-center justify-center">
        <Link to="/cart" ><CartIcon/></Link>
      </div>
      {/**TODO: skuzit zas bez pt-1 nisu poravnati */}
      <div className="w-8 h-8 flex pt-1 justify-center">
      {
        auth._id ?
        <AvatarIconGreen 
          onClick={() => {  
              dispatch(clearCart());
              dispatch(logoutUser());
              toast.warning("Logged out", {position: 'bottom-left'});
              console.log("clicked")
            }}
            name={auth.name} 
        />
        :  <Link to="/register"><AvatarIcon/> </Link>
      
      }
        
      </div>
    </div>
  );
}

export default SmallIcons;
