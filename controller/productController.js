const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const Product = require("../model/productModel");

// Create a new product
exports.createProduct = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }

      const { secure_url, originalname } = result;

      const newProduct = new Product({
        title: req.body.title,
        image: {
          publicUrl: secure_url,
          fileName: originalname,
        },
      });

      newProduct
        .save()
        .then((product) => {
          res.status(200).json({
            success: true,
            message: "Product created!",
            data: product,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Error while creating the product",
          });
        });
    });
  });
};

// Get all products
exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json({
        success: true,
        data: products,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error while fetching all products",
      });
    });
};

// Get a single product by its ID
exports.getProductById = (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error while fetching the product",
      });
    });
};

// Update a product by its ID
exports.updateProductById = (req, res) => {
  const productId = req.params.id;
  const { newTitle, newImage } = req.body;

  Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        title: newTitle,
        image: newImage,
      },
    },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product updated!",
        data: product,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error while updating the product",
      });
    });
};

// Delete a product by its ID
exports.deleteProductById = (req, res) => {
  const productId = req.params.id;

  Product.findByIdAndRemove(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product deleted!",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error while deleting the product",
      });
    });
};
