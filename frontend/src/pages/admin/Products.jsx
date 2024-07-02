import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Products = () => {
    const navigate = useNavigate();

    return(
    <div className="row_container">
        <h2 className="pb-0">Products:</h2>
        <Button  onClick={() => navigate("/admin/products/create-product")}>
                    Create new
        </Button>
        <Outlet/>
    </div>) 
}
 
export default Products;