import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
function SearchModal({ show, closeModal }) {
  const [location, setLocation] = useState("");
  const [garbage, setGarbage] = useState("");
  const [custom, setCustom] = useState("");

  const handleLocation = (e) => {
    setLocation(e.target.value);
    if (e.target.value === "OTHER") {
      toast.info("Unesite lokaciju manuelno 📍", {});
    }
  };
  const handleType = (e) => {
    setGarbage(e.target.value);
  };
  const handleCustom = (e) => {
    setCustom(e.target.value);
  };

  const handleSearch = () => {
    if (location === "" || garbage === "") {
      toast.warn("Polja moraju biti popunjena! 😟", {});
    }
    if (location === "OTHER" && custom === "") {
      toast.warn("Polja moraju biti popunjena! 😟", {});
    }
    window.open(
      `https://www.google.com/maps/search/${
        garbage !== "" && garbage
      }+recycling+center+near+${
        location !== "" && (location !== "OTHER" ? location : custom)
      }/`,
      "_blank"
    );
  };

  return (
    <div
      className={`searchmodal__wrapper searchmodal__wrapper${
        !show && "--disabled"
      } sofia`}
    >
      <div className="searchmodal">
        <svg
          onClick={closeModal}
          className="searchmodal__close"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="30px"
          height="30px"
        >
          <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
        </svg>
        <div className="searchmodal__content">
          <select
            className="searchmodal__input"
            onChange={(e) => {
              handleLocation(e);
            }}
          >
            <option disabled selected>
              Odaberite mesto:
            </option>
            <option value="OTHER">Ostalo</option>
            <optgroup label="Mesta">
              <option value="Beograd">Beograd</option>
              <option value="Novi Sad">Novi Sad</option>
              <option value="Niš">Niš</option>
              <option value="Kragujevac">Kragujevac</option>
              <option value="Subotica">Subotica</option>
              <option value="Zrenjanin">Zrenjanin</option>
              <option value="Pančevo">Pančevo</option>
              <option value="Užice">Užice</option>
              <option value="Čačak">Čačak</option>
              <option value="Sombor">Sombor</option>
              <option value="Zaječar">Zaječar</option>
              <option value="Kraljevo">Kraljevo</option>
              <option value="Vrbas">Vrbas</option>
              <option value="Leskovac">Leskovac</option>
              <option value="Smederevo">Smederevo</option>
              <option value="Vranje">Vranje</option>
              <option value="Prokuplje">Prokuplje</option>
              <option value="Kruševac">Kruševac</option>
              <option value="Vršac">Vršac</option>
              <option value="Velika Plana">Velika Plana</option>
              <option value="Šabac">Šabac</option>
              <option value="Ruma">Ruma</option>
              <option value="Gornji Milanovac">Gornji Milanovac</option>
              <option value="Loznica">Loznica</option>
              <option value="Sremska Mitrovica">Sremska Mitrovica</option>
              <option value="Smederevska Palanka">Smederevska Palanka</option>
              <option value="Inđija">Inđija</option>
              <option value="Kosovska Mitrovica">Kosovska Mitrovica</option>
              <option value="Lajkovac">Lajkovac</option>
              <option value="Kikinda">Kikinda</option>
            </optgroup>
          </select>
          <input
            style={{ display: location === "OTHER" ? "block" : "none" }}
            type="text"
            placeholder="Unesite ime mesta:"
            className="searchmodal__input"
            onChange={(e) => {
              handleCustom(e);
            }}
          />
          <select
            className="searchmodal__input"
            onChange={(e) => {
              handleType(e);
            }}
          >
            <option disabled selected>
              Odaberite tip otpada:
            </option>
            <option value="Glass">Staklo</option>
            <option value="Plastic">Plastika</option>
            <option value="Metal">Metal</option>
            <option value="Electronics">Elektronika</option>
            <option value="Vehicles">Prevozna sredstva</option>
            <option value="Agricultural">Poljovrivreda</option>
          </select>
          <button className="searchmodal__button sofia" onClick={handleSearch}>
            Pretraga
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
