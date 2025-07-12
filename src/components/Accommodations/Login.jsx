import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/login/login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://apibookingsaccomodations-production.up.railway.app/api/V1/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/alojamientos");
    } catch (error) {
      setError("Credenciales inválidas 401");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
            alt="login icon"
            className={styles.loginIcon}
          />
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales para entrar al hotel goku</p>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label>Correo Electrónico</label>
            <div className={styles.inputWithIcon}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                alt="email"
              />
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <div className={styles.inputWithIcon}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.loginButton}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
              alt="login"
            />
            Iniciar Sesión
          </button>
        </form>

        <div className={styles.support}>
          <p>
            ¿Necesitas ayuda?{" "}
            <a href="https://academy.kodigo.org/">Contacta soporte</a>
          </p>
          <p className={styles.note}>
            Confia en nosotros. Tus datos estan protegidos (talvez).
          </p>
        </div>
      </div>
    </div>
  );
}
