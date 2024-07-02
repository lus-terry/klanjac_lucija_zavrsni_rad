import { Link } from "react-router-dom";
import Logo from "./Logo";
import SmallIcons from "./SmallIcons";
import { useSelector } from "react-redux";


const NavBar = () => {

    const auth = useSelector((state) => state.auth);

    return <nav id="nav-bar">

    <Link to="/"  >
          <Logo/>
    </Link>

    <div className="flex flex-col items-end space-y-2">
      <SmallIcons/>
      <div>
      <ul className="flex space-x-10 text-sm ">
        {auth.isAdmin ? 
                  <li>
                      <Link to="/admin/summary" className="font-black">ADMIN</Link>
                  </li>
        : null}
                  <li>
                      <Link to="/aboutUs">ABOUT US</Link>
                  </li>
                  <li>
                      <Link to="/shop" >SHOP</Link>
                  </li>
                  <li>
                      <Link to="/visit" >VISIT</Link>
                  </li>
                  <li>
                      <Link to="/gallery" >GALLERY</Link>
                  </li>
                  <li>
                      <Link to="/contact" >CONTACT</Link>
                  </li>
              </ul>
      </div>

    </div>
  
  

    
     </nav>;
}
 
export default NavBar;