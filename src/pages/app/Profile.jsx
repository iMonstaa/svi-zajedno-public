import React from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/app/AppHeader";
import { toast } from "react-toastify";
import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import AppNav from "../../components/app/AppNav";
import takeoutImg from "../../assets/images/takeout.svg";

import FactCards from "../../components/app/FactCards";

function Profile() {
  const Navigate = useNavigate();
  const { user, logout } = UserAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      onAuthStateChanged(auth, (currentUser) => {
        console.log("logged out!");
      });
      toast.success("Uspešno ste se odjavili sa naloga. 😭", {});
      Navigate("/login");
    } catch (error) {
      toast.error(error.message, {});
    }
  };

  const facts = [
    {
      text: "Reciklaža smanjuje zagađenje vode i zemlje.",
    },
    {
      text: "Ekološka obnova zelenih površina smanjuje zagađenje.",
    },
    {
      text: "Obnovljivi izvori energije zamenjuju fosilna goriva.",
    },
    {
      text: "Ekološka obnova šuma povećava biodiverzitet.",
    },
    {
      text: "Biljke korišćene u rekuperaciji čiste vazduh.",
    },
    {
      text: "Smanjenje upotrebe plastike smanjuje zagađenje okeana.",
    },
    {
      text: "Osnaživanje ekološke svesti jača održivost.",
    },
    {
      text: "Reciklaža smanjuje potrebu za novim rudnicima.",
    },
    {
      text: "Ekološka obnova pomaže u sprečavanju klimatskih promena.",
    },
    {
      text: "Obnovljivi izvori energije su nepresušni i čiste energije.",
    },
    {
      text: "Bioraznolikost osnažuje ekosisteme i omogućuje opstanak.",
    },
    {
      text: "Efikasnija upotreba energije smanjuje troškove i zagađenje.",
    },
    {
      text: "Reciklaža pomaže u održavanju prirodnih resursa.",
    },
    {
      text: "Zelene tehnologije povećavaju efikasnost i održivost.",
    },
    {
      text: "Ekološka obnova gradova povećava kvalitet života.",
    },
    {
      text: "Održiva proizvodnja hrane smanjuje uticaj na okolinu.",
    },
    {
      text: "Efikasniji transport smanjuje emisiju štetnih gasova.",
    },
    {
      text: "Zelene površine jačaju bioraznolikost i smanjuju zagađenje.",
    },
    {
      text: "Ekološka svijest omogućuje brži napredak ka održivom svetu.",
    },
    {
      text: "Reciklaža može da smanji potrebu za eksploatacijom prirodnih resursa.",
    },
  ];

  return (
    <>
      <div className="profile">
        <div className="profile__info">
          {user.displayName && (
            <img
              src={`https://api.dicebear.com/5.x/croodles/svg?seed=${user.displayName}`}
              width={"100px"}
              alt="Avatar"
            />
          )}
          <div className="profile__info__panel sofia">
            <p className="fw-700" style={{ fontSize: "22px" }}>
              {user && user.displayName}
            </p>
            <p style={{ fontSize: "14px" }}>{user && user.email}</p>

            <p
              style={{
                lineHeight: "1.5em",
                color: user && user.emailVerified ? "#00ff00" : "#ff0000",
              }}
            >
              {user && user.emailVerified
                ? "VERIFIKOVALI STE E-MAIL"
                : "NISTE VERIFIKOVALI E-MAIL"}
            </p>
          </div>
        </div>
        <h1
          className="sofia fw-700"
          style={{ width: "290px", fontSize: "24px", margin: "20px 0" }}
        >
          Zabavne činjenice
        </h1>
        <div className="factcard__wrapper">
          <FactCards>
            <p>{facts[Math.floor(Math.random() * 20)].text}</p>
          </FactCards>
          <FactCards>
            <p>{facts[Math.floor(Math.random() * 20)].text}</p>
          </FactCards>
          <FactCards>
            <p>{facts[Math.floor(Math.random() * 20)].text}</p>
          </FactCards>
        </div>
        <img
          src={takeoutImg}
          width={"320px"}
          style={{ margin: "30px 0" }}
          alt="Taking out the garbage"
        />
        <button
          className="logout"
          style={{ width: "300px" }}
          onClick={handleLogout}
        >
          Odjavite se
        </button>
      </div>
    </>
  );
}

export default Profile;
