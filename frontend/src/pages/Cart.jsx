import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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

  return (
    <div className="content_container_blank ">
      <h2>Shopping Cart</h2>

      {cart.cartItems.length === 0 ? (
        <div className="row_container pt-20">
          <div className="normal_text  ">your cart is currently empty</div>

          <Button
            style={{ width: "20%" }}
            onClick={() => handleNavigate("/shop")}
          >
            {" "}
            start shopping
          </Button>
        </div>
      ) : (
        <div>
          <div className=" flex  text-center items-center justify-between  border-gray-500 border-b-2 pb-1 razmaknut_text text-base">
            <div className="w-2/5">PRODUCT</div>
            <div className="w-1/5">PRICE</div>
            <div className="w-1/5">QUANTITY</div>
            <div className="w-1/5">TOTAL</div>
          </div>

          <div className=" obican_text flex flex-col w-screen items-center pt-5">
            {cart.cartItems?.map((cartItem) => (
              <div
                className="flex border-b border-t h-50 items-center w-screen razmaknut_text"
                key={cartItem._id}
              >
                {/*div koji sadrži sliku, ime i description */}
                <div className=" w-2/5 flex items-left ">
                  <img
                    className="h-40 pr-8 p-2 pl-20"
                    src={cartItem.image.url}
                    alt={cartItem.name}
                  />
                  <div className=" flex flex-col text-left justify-center">
                    <h3 className="razmaknut_text">{cartItem.name}</h3>
                  </div>
                </div>

                {/*div koji sadrži price */}
                <div className="flex w-1/5 text-center justify-center">
                  €{cartItem.price}
                </div>

                {/*div koji sadrži quantity */}
                <div class="flex w-1/5 items-center justify-center  ">
                  <div
                    class="flex text-center justify-between px-2 items-center border-zinc-500/50 border-2 p-1"
                    style={{ width: "150px" }}
                  >
                    <button
                      onClick={() => handleDecreaseCart(cartItem)}
                      className="rounded-full text-center flex items-center justify-center overflow-hidden bg-zinc-500/25 w-6 h-6 pb-1 "
                    >
                      <span className="font-thin">-</span>
                    </button>
                    <div class="pr-4 pl-4 text-center items-center justify-center cart-total">
                      {cartItem.cartTotalQuantity}
                    </div>
                    <button
                      onClick={() => handleIncreaseCart(cartItem)}
                      className="rounded-full text-center flex items-center justify-center overflow-hidden bg-zinc-500/25 w-6 h-6 pb-1 "
                    >
                      <span className="font-bold">+</span>
                    </button>
                  </div>
                </div>

                {/*div koji sadrži total */}
                <div className="w-1/5  relative razmaknut_text">
                  <button
                    className="absolute right-10 top-0 hover:font-bold "
                    onClick={() => handleRemoveFromCart(cartItem)}
                  >
                    x
                  </button>
                  <div className=" text-center justify-center">
                    €{cartItem.price * cartItem.cartTotalQuantity}
                  </div>
                </div>

                {/*div koji sadrži remove button */}
              </div>
            ))}
          </div>

          <div className="flex">
            <div className=" w-2/5  flex items-left pl-20">
              <div className="obican_text ">
                <Button
                  className=" items-center justify-center"
                  onClick={() => handleClearCart()}
                >
                  {" "}
                  Clear cart
                </Button>
              </div>
            </div>
            <div className="flex  w-1/5 "></div>
            <div className="flex flex-col text-left w-2/5 normal_text">
              <div className="cart-checkout flex flex-col pt-10">
                <div className="flex razmaknut_text">
                  <div className="w-1/2">TOTAL COST:</div>
                  <div className="w-1/2 text-center ">
                    {" "}
                    €{cart.cartTotalAmount}
                  </div>
                </div>
                <p className="obican_text text-sm pt-2">
                  Taxes and shipping are calculated at checkout
                </p>

                <div className="flex items-start  pt-3  gap-3">
                  <div className="flex w-1/3 ">
                    <Button
                      onClick={() => navigate("/shop")}
                      style={{ width: "100%" }}
                      clas
                    >
                      {" "}
                      Continue Shopping
                    </Button>
                  </div>
                  <div className="flex flex-col w-1/3 pb-10">
                    {auth._id ? (
                      <Button
                        style={{ width: "100%" }}
                        onClick={() => navigate("/checkout")}
                      >
                        Checkout
                      </Button>
                    ) : (
                      <>
                        <Button id="button_blocked" style={{ width: "100%" }}>
                          Checkout
                        </Button>
                        <div className="flex flex-row justify-center">
                          <p className="pr-2 text-xs">
                            Please login to continue.
                          </p>
                          <Link
                            to="/login"
                            className="text-xs hover:text-blue-300 "
                          >
                            Login
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
