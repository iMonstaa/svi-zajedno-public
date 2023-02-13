import React from "react";
import refreshBtn from "../../assets/images/refresh.svg";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function AirQualityWidget() {
  const [AQI, setAQI] = useState("?");
  const [NO2, setNO2] = useState("?");
  const [O3, setO3] = useState("?");
  const [PM10, setPM10] = useState("?");
  const [PM2_5, setPM2_5] = useState("?");
  const [AQItext, setAQItext] = useState("Greška");
  const [location, setLocation] = useState({});

  const checkLocationPermission = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    checkLocationPermission()
      .then((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      })
      .catch((error) => {
        toast.error(error, { toastId: "GeoError" });
      });
  }, []);

  useEffect(() => {
    if (location.lat && location.lng) {
      handleRefresh();
    }
  }, [location]);

  const handleRefresh = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {},
        (error) => {}
      );
    }
    if (location.lat && location.lng && navigator.geolocation) {
      try {
        await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${
            location.lat || "44.81552"
          }&lon=${location.lng || "20.46011"}&appid=${
            import.meta.env.VITE_OPENWEATHER_APIKEY
          }`
        )
          .then((response) => response.json())
          .then((json) => {
            setAQI((prev) => json.list[0].main.aqi);
            setNO2((prev) => json.list[0].components.no2);
            setO3((prev) => json.list[0].components.o3);
            setPM10((prev) => json.list[0].components.pm10);
            setPM2_5((prev) => json.list[0].components.pm2_5);

            switch (json.list[0].main.aqi) {
              case 1:
                setAQItext((prev) => "Dobar");
                break;
              case 2:
                setAQItext((prev) => "Prihvatljiv");
                break;
              case 3:
                setAQItext((prev) => "Umeren");
                break;
              case 4:
                setAQItext((prev) => "Loš");
                break;
              case 5:
                setAQItext((prev) => "Veoma loš");
                break;
              default:
                setAQItext((prev) => "Greška");
                break;
            }
          });
      } catch (error) {
        console.error(error);
        toast.error(
          "Trenutno nismo u mogućnosti da prikažemo kvalitet vazduha. API je nedostupan. Pokušajte kasnije 😅",
          { toastId: "FailAPI" }
        );
      }
    } else {
      toast.error(
        "Nažalost, nismo uspeli da pribavimo Vašu lokaciju, proverite da li ste dozvolili pristup lokaciji! 🔒",
        {}
      );
    }
  };

  return (
    <div className="widget__wrapper sofia">
      <div className="widget" data-aqi={AQI}>
        <p className="widget__name">Kvalitet vazduha na lokaciji</p>
        <img
          src={refreshBtn}
          onClick={() => {
            toast.success("Uspešno osveženo! 🔁", {});
            handleRefresh();
          }}
          alt="Refresh"
          className="widget__refresh"
        />
        <div className="widget__aqi">
          <p className="widget__aqi__text" data-aqi={AQI}>
            {AQItext}
          </p>
          <p className="widget__aqi__number">{AQI}</p>
        </div>
        <table className="widget__aqi__values">
          <tbody>
            <tr className="widget__aqi__values__row">
              <td className="widget__aqi__values__column">{NO2}</td>
              <td className="widget__aqi__values__column">
                NO<sub>2</sub>
              </td>
            </tr>
            <tr className="widget__aqi__values__row">
              <td className="widget__aqi__values__column">{O3}</td>
              <td className="widget__aqi__values__column">
                O<sub>3</sub>
              </td>
            </tr>
            <tr className="widget__aqi__values__row">
              <td className="widget__aqi__values__column">{PM10}</td>
              <td className="widget__aqi__values__column">
                PM<sub>10</sub>
              </td>
            </tr>
            <tr className="widget__aqi__values__row">
              <td className="widget__aqi__values__column">{PM2_5}</td>
              <td className="widget__aqi__values__column">
                PM<sub>2.5</sub>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span className="widget__subtext">
        Podatke o kvalitetu vazduha pruža{" "}
        <a
          href={"https://openweathermap.org/api/air-pollution"}
          target={"_blank"}
        >
          OpenWeatherMap API
        </a>
      </span>
    </div>
  );
}

export default AirQualityWidget;
