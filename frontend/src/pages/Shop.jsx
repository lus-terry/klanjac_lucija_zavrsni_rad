

import { Button } from "semantic-ui-react";
import ProductCardShop from "../components/ProductCardShop";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const  Shop = () => {
  
    //  const {data, error, isLoading} = useGetAllProductsQuery();
    const {items: data, status} = useSelector((state) => state.products);

    const navigate = useNavigate();

    return (
    <div className="content_container ">
        
        <div className="row_container ">
 

            {status === "success" ? (
                <>
                <div className="flex " > 
                    {data &&
                    data?.map(product => 
                    <ProductCardShop
                    key = {product._id}
                    product = {product}
                    />
                    )}
                </div>
                </>

            ) : status === "pending" ? (
                <p>Loading...</p>
            ) : (
                <p>Unexpected error occured...</p>
            )}
        
            <Button style={{width: '20%'}}  onClick={() => navigate("/cart")} >GO TO CART</Button>
          

        </div>
        
    </div>
    );
};
 
export default Shop;