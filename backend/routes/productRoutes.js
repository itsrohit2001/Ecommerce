const express = require("express");
const { product_data } = require("../data/product_data");
const router = express.Router();

router.get("/", (req, res) => {
  const skip = parseInt(req.query.skip) || 0; // everything in url seems string so parseint used
  const limit = parseInt(req.query.limit) || 6;
  const id = req.query.id;
  const search = req.query.search || "";
  const category = req.query.category || "";

  if (id) {
    const product = product_data.find((p) => p.id === parseInt(id));
    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  }


  // Filter products based on search and category
  const filteredProducts = product_data.filter((product) => {
    const matchesCategory =
      category === "" || category === "All" || product.category?.toLowerCase() === category?.toLowerCase();

    const matchesSearch =
      search === "" ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  res.json({
    products: filteredProducts.slice(skip, skip + limit),
    count: filteredProducts.length,
  });
});

router.get("/popular", (req, res) => {
  const count = parseInt(req.query.count) || 3;
  const popularProducts = product_data.sort((a, b) =>
    a.rating * 0.7 + a.reviews * 0.3 < b.rating * 0.7 + b.reviews * 0.3 ? 1 : -1
  );

  res.json(popularProducts.slice(0, count));
});

module.exports = router;
