const express = require("express");
const cloudinary = require("../utils/cloudinary");
const { Product } = require("../models/product");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();

//CREATE
router.post("/", isAdmin, async (req, res) => {
  const { name, shortDesc, longDesc, price, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "webShop", //images are saved in folder onlineShop
      });

      if (uploadRes) {
        const product = new Product({
          name,
          shortDesc,
          longDesc,
          price,
          image: {
            url: uploadRes.secure_url,
            public_id: uploadRes.public_id,
          },
        });

        const savedProduct = await product.save();

        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log("params", req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*DELETE PRODUCT

router.delete("/:id", async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        //checking if exists
        if(!product) return res.status(400).send("Product not found.");
        console.log("id", product.image.public_id)
        //deleting picture from cloudinary and product from db
        if(product.image.public_id) {
            const destroyResponse = await cloudinary.uploader.destroy(
                product.image.public_id
            );

            if(destroyResponse) {
                const deletedProduct = await Product.findByIdAndDelete(req.params.id);

                res.status(200).send(deletedProduct);   
            }
        } else {
            console.log("Action terminated. Failed to delete product image.")
        }
    } catch(error) {
        res.status(500).send(error);
    }
}); */

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Checking if exists
    if (!product) return res.status(400).send("Product not found.");

    // Deleting picture from cloudinary and product from db
    console.log("Product:", product);
    console.log("Product Image:", product.image);

    if (product.image && product.image.public_id) {
      try {
        const destroyResponse = await cloudinary.uploader.destroy(
          product.image.public_id
        );

        console.log("destroyResponse", destroyResponse);

        if (destroyResponse.result === "ok") {
          const deletedProduct = await Product.findByIdAndDelete(req.params.id);
          res.status(200).send(deletedProduct);
        } else {
          console.log("Failed to delete image on Cloudinary");
          res.status(500).send("Failed to delete image on Cloudinary");
        }
      } catch (innerError) {
        console.log("Error inside if block:", innerError);
        res.status(500).send(innerError);
      }
    } else {
      console.log("Action terminated. Failed to delete product image.");
      res.status(400).send("Failed to delete product image.");
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send(error);
  }
});

//EDIT PRODUCT

router.put("/:id", isAdmin, async (req, res) => {
  //if we selected a new image, we first must destroy current one on cloudinary
  console.log("req.body.productImg", req.body.productImg);
  if (req.body.productImg) {
    try {
      const destroyResponse = await cloudinary.uploader.destroy(
        req.body.product.image.public_id
      );
      console.log("destroyResponse", destroyResponse);

      if (destroyResponse) {
        const uploadedResponse = await cloudinary.uploader.upload(
          req.body.productImg,
          {
            upload_preset: "webShop",
          }
        );

        if (uploadedResponse) {
          const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.product,
                image: uploadedResponse,
              },
            },
            { new: true }
          );
          res.status(200).send(updatedProduct);
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.product,
        },
        { new: true }
      );
      res.status(200).send(updatedProduct);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
