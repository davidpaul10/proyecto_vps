const pool = require('../config/db');

const getProducts = async (req, res) => {
  try {
    const productos = await pool.query(
      'SELECT * FROM productos ORDER BY id DESC'
    );

    res.json(productos.rows);
  } catch (error) {
    console.error('Error en getProducts:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { nombre, precio, stock, categoria } = req.body;

    if (!nombre || !precio || stock === undefined || !categoria) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const nuevoProducto = await pool.query(
      `INSERT INTO productos (nombre, precio, stock, categoria)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, precio, stock, categoria]
    );

    res.status(201).json({
      message: 'Producto creado correctamente',
      producto: nuevoProducto.rows[0],
    });
  } catch (error) {
    console.error('Error en createProduct:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, categoria } = req.body;

    const productoActualizado = await pool.query(
      `UPDATE productos
       SET nombre = $1, precio = $2, stock = $3, categoria = $4
       WHERE id = $5
       RETURNING *`,
      [nombre, precio, stock, categoria, id]
    );

    if (productoActualizado.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({
      message: 'Producto actualizado correctamente',
      producto: productoActualizado.rows[0],
    });
  } catch (error) {
    console.error('Error en updateProduct:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productoEliminado = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING *',
      [id]
    );

    if (productoEliminado.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};