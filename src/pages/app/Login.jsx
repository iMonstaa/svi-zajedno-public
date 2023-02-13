import { useState } from "react";
import React from "react";
import Header from "../../components/app/AppHeader";
import Footer from "../../components/app/AppFooter";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Navigate = useNavigate();
  const { user, signIn } = UserAuth();

  const handlePassReset = () => {
    if (email === "") {
      toast.info("Unesite svoj e-mail i ponovo kliknite na ovo dugme! 😄", {});
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("E-mail za resetovanje šifre poslat! 📤", {});
      })
      .catch((error) => {
        toast.error(`Došlo je do greške! - ${error.code} 😟`, {});
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      onAuthStateChanged(auth, (currentUser) => {
        console.log("Logged in!");
      });
      toast.success("Uspešno ste se prijavili! 🔑", {});
      Navigate("/app");
    } catch (error) {
      toast.error(error.message, {});
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <form className="login" id="login" onSubmit={handleLogin}>
        <input
          className="login__input"
          type="email"
          name="email"
          placeholder="test@example.com"
          id="mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login__input"
          name="password"
          placeholder="********"
          autoComplete="off"
          id="pass"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login__button login__button--black">
          Prijavite se
        </button>
        <div className="login__redirect">
          Nemate nalog?{" "}
          <Link className="login__redirect__link" to="/register">
            Registrujte se.
          </Link>
        </div>
        <div className="login__redirect">
          Zaboravili ste šifru?{" "}
          <span className="login__redirect__link" onClick={handlePassReset}>
            Resetujte šifru.
          </span>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default Login;
