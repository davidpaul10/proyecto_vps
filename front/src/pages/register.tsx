import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", { nombre, correo, password });
      navigate("/");
    } catch {
      setMensaje("No se pudo registrar el usuario");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={registrar}>
        <h1>Crear cuenta</h1>
        <p>Registra un usuario nuevo</p>

        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {mensaje && <span className="error">{mensaje}</span>}

        <button>Registrarme</button>

        <small>
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </small>
      </form>
    </div>
  );
}