const express = require('express');
const cors = require('cors');

require('dotenv').config();

const pool = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API CRUD Productos funcionando' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

pool.connect()
  .then(client => {
    console.log('✅ Conectado a PostgreSQL');
    client.release();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar con PostgreSQL:', err.message);
  });