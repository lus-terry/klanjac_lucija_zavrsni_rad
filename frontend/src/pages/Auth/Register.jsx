import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import { Link , useNavigate} from "react-router-dom";
import { Button } from "semantic-ui-react";


const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector((state) => state.auth);

    console.log(auth);

    useEffect(() => {
        if(auth._id) {
            navigate("/")
        }
    }, [auth._id, navigate]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const { email, password, name } = user;

    const handleSubmit = (e) => {
        //handling submit  without reloading the page
        e.preventDefault();

        dispatch(registerUser(user));
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return ( 
        <div className="content_container_forest">
        
        <div className="form_container ">

            <div className="text-2xl mb-4 text-center">Signup</div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
            
                <div>
                <label htmlFor="email" className="block font-medium text-gray-700">
                    Email
                    </label>
                    <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={handleOnChange}
                    className="custom-input"
                    />
                </div>
                <div>
                <label htmlFor="username" className="block font-medium text-gray-700">
                    Username
                    </label>
                    <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Create username"
                    onChange={handleOnChange}
                    className="custom-input"
                    />
                </div>
                <div>
                <label htmlFor="password" className="block font-medium text-gray-700">
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Create password"
                    onChange={handleOnChange}
                    className="custom-input"
                    />
                </div>
                <div className="text-center text-red-700">
                    {auth.registerStatus === "rejected" ? (
                        <p>{auth.registerError}</p>
                    ) : null}
                </div>
               
                <div className="items-center">
                    <Button
                    type="submit"
                    className="button"
                    >
                    Signup
                    </Button>
                </div>
                <span className="flex text-center">
                    <div className="w-3/4 ">Already have an account?</div>
                    <div className="w-1/4 text-left"><Link to="/login" className="custom-details-color hover:font-bold">Login</Link></div> 
                </span>
                
                </form>
                </div>
        </div>
     );
}
 
export default Register;