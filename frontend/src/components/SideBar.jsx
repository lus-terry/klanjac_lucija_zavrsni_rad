import {  NavLink } from "react-router-dom";
import {FaUsers, FaStore, FaClipboard, FaTachometerAlt} from "react-icons/fa"



const SideBar = () => {

    return <nav id="side-bar">

  

   
     
            <NavLink className={({isActive}) => 
                isActive ? "link-active" : "link-inactive"
                } 
                to="/admin/summary"
            >
                <FaTachometerAlt/> Summary 
            </NavLink>

            <NavLink className={({isActive}) => 
                isActive ? "link-active" : "link-inactive"
                } 
                to="/admin/products"
            >
                <FaStore/> Products
            </NavLink>

            <NavLink className={({isActive}) => 
                isActive ? "link-active" : "link-inactive"
                } 
                to="/admin/orders"
            >
                <FaClipboard/> Orders
            </NavLink>

            <NavLink className={({isActive}) => 
                isActive ? "link-active" : "link-inactive"
                } 
                to="/admin/users"
            >
                <FaUsers/> Users
            </NavLink>


  
   
  

    
     </nav>;
}
 
export default SideBar;