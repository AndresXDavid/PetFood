const router = require('express').Router();
const Product = require('../models/Product');
const authenticateToken = require('../middleware/auth');

// Aplica el middleware a todas las rutas de este archivo
router.use(authenticateToken);

// POST /api/inventario/entrada - Aumentar existencias
router.post('/inventario/entrada', async (req, res) => {
  const { producto_id, cantidad } = req.body;
  try {
    const product = await Product.findById(producto_id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    product.existencias += cantidad;
    await product.save();
    res.json({ message: 'Entrada de producto registrada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// POST /api/inventario/salida - Disminuir existencias con validación
router.post('/inventario/salida', async (req, res) => {
  const { producto_id, cantidad } = req.body;
  try {
    const product = await Product.findById(producto_id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Lógica de validación
    if ((product.existencias - cantidad) < product.stock_minimo) {
      return res.status(400).json({ error: 'Stock insuficiente para la salida' });
    }

    product.existencias -= cantidad;
    await product.save();
    res.json({ message: 'Salida de producto registrada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;