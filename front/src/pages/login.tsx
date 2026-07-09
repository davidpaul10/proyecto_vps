import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { correo, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      navigate("/products");
      window.location.reload();
    } catch {
      setMensaje("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={login}>
        <h1>Iniciar sesión</h1>
        <p>Accede al sistema de productos</p>

        <input placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {mensaje && <span className="error">{mensaje}</span>}

        <button>Entrar</button>

        <small>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </small>
      </form>
    </div>
  );
}