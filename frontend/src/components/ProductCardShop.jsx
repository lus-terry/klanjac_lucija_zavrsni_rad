import React from "react";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addToCart, getTotals } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCardHomePage = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(getTotals());
  };

  return (
    <div
      className="m-3 w-full max-w-xs overflow-hidden  bg-white shadow-md"
      style={{ height: "680x" }}
    >
      <img
        style={{ height: "400px", width: "100%" }}
        className="object-cover m-0"
        src={product.image?.url}
        alt={product.name}
      />

      <div style={{ height: "280px" }} className="p-2">
        <div className="h-1/3 mt-1 px-2 razmaknut_text text-center text-lg flex flex-col">
          <div
            className="product_name"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            {product.name}
          </div>
          <div className="  normal_text text-sm">{product.price}€</div>
        </div>

        <div className="h-1/3  items-center text-center justify-center  pt-1 flex flex-col">
          <div className="  normal_text  " style={{ fontSize: "15px" }}>
            {product.longDesc}
          </div>
        </div>

        <div className="h-1/3  flex flex-col justify-end items-center">
          <Button
            onClick={() => handleAddToCart(product)}
            style={{ width: "70%" }}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardHomePage;
