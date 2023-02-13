import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Turnstile } from "@marsidev/react-turnstile";
import Header from "../../components/app/AppHeader";
import Footer from "../../components/app/AppFooter";
import pfpFemale from "../../assets/images/pfp_female.svg";
import pfpMale from "../../assets/images/pfp_male.svg";
import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import {
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [captchaRes, setCaptchaRes] = useState("");

  const Navigate = useNavigate();
  const { user, createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      onAuthStateChanged(auth, (currentUser) => {
        updateProfile(currentUser, {
          displayName: username,
        });
        sendEmailVerification(currentUser).then(() => {
          toast.success(
            "Uspešna registracija! Proverite e-mail radi verifikacije naloga. ✉️",
            { toastId: "verifSuccess" }
          );
        });
      });
      Navigate("/app");
    } catch (error) {
      toast.error(error.message, {});
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <form className="login" id="register" onSubmit={handleSubmit}>
        <img
          style={{
            width: 70,
            margin: "0 auto",
            border: "1px solid #000",
            height: 70,
            borderRadius: 35,
          }}
          src={`https://api.dicebear.com/5.x/croodles/svg?seed=${username}`}
          alt={"Profilna"}
          title={"Profilna slika"}
        ></img>
        <input
          type="text"
          className="login__input"
          name="username"
          placeholder="John Doe"
          id="name"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
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

        {/* <div className="login__gender">
          <label>
            <input
              className="login__gender__radio"
              type="radio"
              name="gender"
              value="male"
              defaultChecked
            />
            <img src={pfpMale} alt="Male" />
          </label>

          <label>
            <input
              className="login__gender__radio"
              type="radio"
              name="gender"
              value="female"
            />
            <img src={pfpFemale} alt="Female" />
          </label>
        </div> */}
        <button
          disabled={
            username === "" ||
            email === "" ||
            password === "" ||
            captchaRes === ""
          }
          type="submit"
          className="login__button"
        >
          Registracija
        </button>
        <div className="login__redirect">
          Već imate nalog?{" "}
          <Link className="login__redirect__link" to="/login">
            Prijavite se.
          </Link>
        </div>
        <Turnstile
          siteKey="0x4AAAAAAACM3qByMBBBaDpS"
          style={{ scale: "0.8" }}
          options={{
            theme: "light",
          }}
          onError={() => {
            toast.error(
              "CAPTCHA nije uspela sa verifikacijom! Može doći do greške na Safari (iOS) pregledaču. 😅",
              {}
            );
            setCaptchaRes("");
          }}
          onSuccess={() => {
            setCaptchaRes("x");
          }}
          onExpire={() => {
            toast.warning("CAPTCHA je istekla! Pokušajte ponovo.", {});
            setCaptchaRes("");
          }}
        />
      </form>
      <Footer />
    </>
  );
}

export default Register;
