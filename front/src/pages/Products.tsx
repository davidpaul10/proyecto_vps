import { useEffect, useState } from "react";
import api from "../api";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
};

export default function Products() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [editando, setEditando] = useState<number | null>(null);

  const cargarProductos = async () => {
    const res = await api.get("/products");
    setProductos(res.data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      nombre,
      precio: Number(precio),
      stock: Number(stock),
      categoria,
    };

    if (editando) {
      await api.put(`/products/${editando}`, data);
    } else {
      await api.post("/products", data);
    }

    setNombre("");
    setPrecio("");
    setStock("");
    setCategoria("");
    setEditando(null);
    cargarProductos();
  };

  const editar = (p: Producto) => {
    setEditando(p.id);
    setNombre(p.nombre);
    setPrecio(String(p.precio));
    setStock(String(p.stock));
    setCategoria(p.categoria);
  };

  const eliminar = async (id: number) => {
    await api.delete(`/products/${id}`);
    cargarProductos();
  };

  const salir = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <header>
        <div>
          <h1>Gestión de Productos</h1>
          <p>CRUD con React, Express, PostgreSQL y Docker</p>
        </div>
        <button className="logout" onClick={salir}>Cerrar sesión</button>
      </header>

      <section className="content">
        <form className="product-form" onSubmit={guardar}>
          <h2>{editando ? "Editar producto" : "Nuevo producto"}</h2>

          <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input placeholder="Precio" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          <input placeholder="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
          <input placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} />

          <button>{editando ? "Actualizar" : "Agregar"}</button>
        </form>

        <div className="table-card">
          <h2>Listado de productos</h2>

          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td>{p.categoria}</td>
                  <td>
                    <button className="edit" onClick={() => editar(p)}>Editar</button>
                    <button className="delete" onClick={() => eliminar(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}