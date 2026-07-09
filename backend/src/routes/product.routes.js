const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

const verificarToken = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verificarToken, getProducts);
router.post('/', verificarToken, createProduct);
router.put('/:id', verificarToken, updateProduct);
router.delete('/:id', verificarToken, deleteProduct);

module.exports = router;