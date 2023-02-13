import { UserAuth } from "../../context/AuthContext";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Test from "../../assets/images/nav.webp";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Comments from "../../components/app/Comments";
import Likes from "../../components/app/Likes";

function Post() {
  const { user } = UserAuth();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const Navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Da li ste sigurni da želite da obrišete objavu? 🤔")) {
      try {
        await deleteDoc(doc(db, "Articles", id));
        toast.success("Objava uspešno obrisana! 🫡", {});
        const storageRef = ref(storage, article?.imageUrl);
        await deleteObject(storageRef).then(() => {
          Navigate("/app");
        });
      } catch (error) {
        toast.error("Došlo je do greške! 😵‍💫", {});
      }
    }
  };

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data() });
    });
  }, []);

  return (
    <div className="xpost sofia">
      {article && (
        <>
          <div className="xpost__header">
            <img
              className="xpost__header__img"
              src={article?.imageUrl}
              alt="Banner"
            />
            <div className="xpost__header__overlay"></div>
          </div>
          <h1 className="xpost__header__title fw-700">{article?.Title}</h1>
          <Likes id={id} likes={article?.likes} />
          <div className="xpost__author">
            <div className="xpost__author__pfp">
              <img
                src={`https://api.dicebear.com/5.x/croodles/svg?seed=${article?.Author}`}
                alt=""
              />
            </div>
            <div className="xpost__author__name">{article?.Author}</div>
            <div className="xpost__author__date fw-700">·</div>
            <div className="xpost__author__date">
              {`${article?.createdAt?.toDate().getDate()}-${
                article?.createdAt?.toDate().getMonth() + 1
              }-${article?.createdAt?.toDate().getFullYear()}`}
            </div>
          </div>
          <div className="xpost__content">{article?.Description}</div>
          {user &&
            (user.uid === article?.userId ||
              user.uid === import.meta.env.VITE_ADMIN_UID) && (
              <button className="xpost__delete" onClick={handleDelete}>
                Obriši objavu
              </button>
            )}
          <Comments id={id} authorid={article?.userId} />
        </>
      )}
    </div>
  );
}

export default Post;
