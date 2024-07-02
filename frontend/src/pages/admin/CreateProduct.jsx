import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { productsCreate } from "../../slices/productsSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();


  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");

  console.log(productImg);

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    console.log(file);

    TransformFile(file);
  };

  const TransformFile = (file) => {

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
  
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productsCreate({
        name,
        price,
        shortDesc,
        longDesc,
        image: productImg,
      })
    );
  };

  return (
    <div className="row_container">
      <p style={{ fontSize: "22px" }}>Create a product: </p>

      <form
        className="flex flex-col w-full px-20 items-center gap-5 "
        style={{ height: "750x", width: "1200px" }}
        onSubmit={handleSubmit}
      >
        <div className="flex w-full gap-10 ">
          <div className="  flex flex-col items-left text-left pl-2 justify-center gap-2 w-1/2">
            <p>name:</p>
            <input
              className="input"
              type="text"
              required
              placeholder=""
              onChange={(e) => setName(e.target.value)}
            />
            <p>price:</p>
            <input
              className="input"
              type="number"
              required
              placeholder="€  0.00"
              onChange={(e) => setPrice(e.target.value)}
            />
            <p>short description:</p>
            <textarea
              style={{ height: "100px", boxSizing: "border-box" }}
              className="input"
              type="text"
              placeholder=""
              onChange={(e) => setShortDesc(e.target.value)}
            />
            <p>long description:</p>
            <textarea
              style={{ height: "200px" }}
              className="input"
              type="text"
              placeholder=""
              onChange={(e) => setLongDesc(e.target.value)}
            />
          </div>
          <div className=" flex  w-1/2 h-full items-center">
            <div className="gap-5 flex flex-col">
              <p>image:</p>
              <label className="button" style={{ width: "400px" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProductImageUpload}
                  style={{ display: "none" }}
                  required
                />
                Choose File
              </label>

              <div
                className=" flex align-center justify-center border-gray-200 border-2 "
                style={{ height: "420px", width: "400px" }}
              >
                {productImg ? (
                  <div>
                    <img
                      src={productImg}
                      alt="product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className=" justify-center items-center flex flex-col">
                    Image preview will appear here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="items-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
