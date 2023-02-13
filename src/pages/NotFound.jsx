import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function NotFound() {
  const style404wrapper = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const style404 = {
    fontSize: "120px",
    lineHeight: "100%",
  };

  useEffect(() => {
    toast.warn("Nažalost, ova stranica nije pronađena ili ne postoji!", {
      toastId: "404notFound",
    });
  }, []);

  return (
    <div style={style404wrapper}>
      <div className="🌈 sofia fw-700" style={style404}>
        404
      </div>
      <Link to="/" className="sofia fw-700 hoverspread">
        NAZAD NA POČETNU
      </Link>
    </div>
  );
}

export default NotFound;
