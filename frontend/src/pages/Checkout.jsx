import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SmallCart from "../components/SmallCart";
import { Button } from "semantic-ui-react";
import { orderCreate } from "../slices/ordersSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);

  console.log("user", user);
  console.log("cart", cart);

  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const {
    userId,
    firstName,
    lastName,
    company,
    address,
    apartment,
    city,
    country,
    postalCode,
    phone,
    email,
  } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user) {
      setInputValue((prevState) => ({
        ...prevState,
        userId: user._id,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      userId: userId,
      products: cart.cartItems.map((cartItem) => ({
        id: cartItem._id,
        name: cartItem.name,
        price: cartItem.price,
        cartQuantity: cartItem.cartTotalQuantity,
        subtotal: cartItem.price * cartItem.cartTotalQuantity,
        image: cartItem.image.url,
      })),
      total: cart.cartTotalAmount * 100,
      shipping: {
        firstName,
        lastName,
        company,
        address,
        apartment,
        city,
        country,
        postalCode,
        phone,
        email,
      },
      delivery_status: "pending",
      payment_status: "pending",
    };

    try {
      const { payload } = await dispatch(orderCreate(newOrder));
      console.log("payload", payload);

      if (payload && payload._id) {
        console.log("payload._id", payload._id);

        toast.success("Your order was successful!");

        navigate(`/checkout-success/${payload._id}`);
      } else {
        throw new Error("Invalid payload");
      }
    } catch (error) {
      // Error handling
      console.error(error);
      toast.error("There was an error processing your order.");
    }
  };

  return (
    <div className="content_container_blank ">
      <div className="flex gap-5 w-full px-10">
        <div className="form_container_cart">
          <h2>Checkout</h2>

          <form onSubmit={handleSubmit}>
            Shipping address
            <div className="flex flex-row gap-2">
              <input
                type="text"
                name="firstName"
                value={firstName}
                placeholder="First name"
                onChange={handleOnChange}
                className="custom-input w-1/2"
              />
              <input
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Last name"
                onChange={handleOnChange}
                className="custom-input w-1/2"
              />
            </div>
            <input
              type="text"
              name="company"
              value={company}
              placeholder="Company (optional)"
              onChange={handleOnChange}
              className="custom-input"
            />
            <div className="flex flex-row gap-2">
              <input
                type="text"
                name="address"
                value={address}
                placeholder="Address"
                onChange={handleOnChange}
                className="custom-input w-1/2"
              />

              <input
                type="text"
                name="apartment"
                value={apartment}
                placeholder="Apartment, suite, etc. (optional)"
                onChange={handleOnChange}
                className="custom-input w-1/2"
              />
            </div>
            <select
              name="country"
              value={country}
              onChange={handleOnChange}
              className="custom-input "
            >
              <option value="" disabled>
                Select Country
              </option>
              <option value="Croatia">Croatia</option>
            </select>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                name="city"
                value={city}
                placeholder="City"
                onChange={handleOnChange}
                className="custom-input w-1/2"
              />

              <input
                type="text"
                name="postalCode"
                value={postalCode}
                placeholder="Postal code"
                onChange={handleOnChange}
                className="custom-input w-1/2"
              />
            </div>
            <input
              type="phone"
              name="phone"
              value={phone}
              placeholder="Phone (optional)"
              onChange={handleOnChange}
              className="custom-input"
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleOnChange}
              className="custom-input"
            />
            <div className="items-center justify-center">
              <Button type="submit" className="submit_button">
                ORDER
              </Button>
            </div>
          </form>
        </div>

        <div className=" form_container_cart">
          <div className="flex flex-col  p-6">
            <h2>Cart</h2>
            <SmallCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
