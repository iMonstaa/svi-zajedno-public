import { UserAuth } from "../../context/AuthContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const { user } = UserAuth();
  // const [file, setFile] = useState(null);
  // const [title, setTitle] = useState("");
  // const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
    author: user.displayName,
    userId: user.uid,
  });

  const handleSubmitPin = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      toast.warn("Pokušajte da učitate sliku ponovo! 😅", {
        toastId: "retryUpl",
      });
      return;
    }
    if (formData.title.length > 30) {
      toast.warn("Naslov mora imati manje od 30 slova!!! 😡", {});
      return;
    }
    if (formData.description.length > 600) {
      toast.warn("Naslov mora imati manje od 600 slova!!! 😡", {});
      return;
    }
    if (user.emailVerified === false) {
      toast.error(
        "Morate verifikovati e-mail adresu pre objavljivanja! 📩",
        {}
      );
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        const err = JSON.stringify(error._baseMessage);
        if (
          err.startsWith('"Firebase Storage: User does not have permission', 0)
        ) {
          toast.error(
            "Morate verifikovati e-mail adresu pre objavljivanja! 📩",
            {}
          );
        } else {
          toast.error(
            "Nažalost, objavljivanje nije uspelo, pokušajte ponovo! 😅",
            {}
          );
        }
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Pinned");
          addDoc(articleRef, {
            Title: formData.title,
            Description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            Author: user.displayName,
            userId: user.uid,
          })
            .then(() => {
              toast.success("Objava je uspešno postavljena! 🤩", {
                toastId: "postSuccess",
              });
              setProgress(0);
              Navigate("/app");
            })
            .catch((error) => {
              const err = JSON.stringify(error.code);
              if (err === '"permission-denied"') {
                toast.error(
                  "Morate verifikovati e-mail adresu pre objavljivanja! 📩",
                  {}
                );
              } else {
                toast.error(
                  "Nažalost, objavljivanje nije uspelo, pokušajte ponovo! 😅",
                  {}
                );
              }
              setProgress(0);
            });
        });
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      toast.warn("Pokušajte da učitate sliku ponovo! 😅", {
        toastId: "retryUpl",
      });
      return;
    }
    if (formData.title.length > 30) {
      toast.warn("Naslov mora imati manje od 30 slova!!! 😡", {});
      return;
    }
    if (formData.description.length > 600) {
      toast.warn("Tekst mora imati manje od 600 slova!!! 😡", {});
      return;
    }
    if (user.emailVerified === false) {
      toast.error(
        "Morate verifikovati e-mail adresu pre objavljivanja! 📩",
        {}
      );
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        const err = JSON.stringify(error._baseMessage);
        if (
          err.startsWith('"Firebase Storage: User does not have permission', 0)
        ) {
          toast.error(
            "Morate verifikovati e-mail adresu pre objavljivanja! 📩",
            {}
          );
        } else {
          toast.error(
            "Nažalost, objavljivanje nije uspelo, pokušajte ponovo! 😅",
            {}
          );
        }
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            Title: formData.title,
            Description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            Author: user.displayName,
            comments: [],
            likes: [],
            userId: user.uid,
          })
            .then(() => {
              toast.success("Objava je uspešno postavljena! 🤩", {
                toastId: "postSuccess",
              });
              setProgress(0);
              Navigate("/app");
            })
            .catch((error) => {
              const err = JSON.stringify(error.code);
              if (err === '"permission-denied"') {
                toast.error(
                  "Morate verifikovati e-mail adresu pre objavljivanja! 📩",
                  {}
                );
              } else {
                toast.error(
                  "Nažalost, objavljivanje nije uspelo, pokušajte ponovo! 😅",
                  {}
                );
              }
              setProgress(0);
            });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length !== 0) {
      setFormData({ ...formData, image: e.target.files[0] });
      return;
    } else {
      toast.warn("Pokušajte da učitate sliku ponovo! 😅", {
        toastId: "retryUpl",
      });
      setFormData({ ...formData, image: "" });
      return;
    }
  };

  return (
    <div className="newpost sofia">
      <h1 className="fw-700">Nova objava</h1>
      <form id="newpost" onSubmit={handleSubmit}>
        <input
          type="text"
          className="newpost__input"
          placeholder="Naslov"
          name="title"
          required
          maxLength={30}
          value={formData.title}
          onChange={(e) => {
            // setTitle(e.target.value);
            handleChange(e);
          }}
          // onChange={(e) => setTitle(e.target.value)}
        />
        <p className="newpost__input__count">{formData.title.length}/30</p>
        <textarea
          className="newpost__input"
          placeholder="Tekst objave"
          required
          name="description"
          rows={9}
          cols={50}
          style={{ resize: "none" }}
          maxLength={600}
          value={formData.description}
          onChange={(e) => {
            handleChange(e);
            // setText(e.target.value);
          }}
        ></textarea>
        <p className="newpost__input__count newpost__input__count--2">
          {formData.description.length}/600
        </p>
        <label
          htmlFor="import_img"
          className="newpost__import fw-700"
          id="import_img_label"
        >
          +{" "}
          <p className="newpost__import__marker">
            {formData.image.name || "Slika formata jpg,png,webp"}
          </p>
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          name="image"
          id="import_img"
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => {
            handleImageChange(e);
          }}
        />
        <button type="submit" className="newpost__button">
          Postavi objavu!
        </button>
        {user && user.uid === "kWL8scRFRzNtH2ul4i1NP8Nua4S2" && (
          <button className="newpost__button" onClick={handleSubmitPin}>
            Postavi pin!
          </button>
        )}
      </form>
      <div className="progress">
        <p className="progress__num fw-700">Status Objave: {`${progress}%`}</p>
        <p className="progress__num progress__num--two fw-700">
          Status Objave: {`${progress}%`}
        </p>
        <div className="progress__bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default NewPost;
