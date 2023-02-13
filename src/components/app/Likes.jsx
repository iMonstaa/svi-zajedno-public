import React from "react";
import { db } from "../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";

function Likes({ id, likes }) {
  const { user } = UserAuth();

  const likesRef = doc(db, "Articles", id);

  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("removed like");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="likes">
      <svg
        title="Like Apple SVG File"
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill={likes?.includes(user.uid) ? "#ff5252" : "none"}
        stroke={likes?.includes(user.uid) ? "#ff5252" : "#00000077"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={handleLike}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span className="fw-700">Likes:</span> {likes?.length || "0"}
    </div>
  );
}

export default Likes;
