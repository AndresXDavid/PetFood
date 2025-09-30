const router = require('express').Router();
const Product = require('../models/Product');

// GET /api/productos - Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET /api/productos/{id} - Obtener producto por ID
router.get('/productos/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;