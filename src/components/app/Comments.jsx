import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Comments({ id, authorid }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = UserAuth();
  const currentUser = user;
  const commentRef = doc(db, "Articles", id);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleComment = () => {
    if (comment === null || comment === undefined || comment === "") {
      toast.warn("Morate uneti tekst kako bi ste postavili komentar. 😕", {});
      return;
    }
    updateDoc(commentRef, {
      comments: arrayUnion({
        user: user.uid,
        userName: user.displayName,
        comment: comment,
        createdAt: new Date(),
        commentId: uuidv4(),
      }),
    }).then(() => {
      setComment("");
    });
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    if (
      currentUser.uid === comment.user ||
      currentUser.uid === import.meta.env.VITE_ADMIN_UID
    ) {
      console.log(comment);
      updateDoc(commentRef, {
        comments: arrayRemove(comment),
      })
        .then((e) => {
          toast.success("Komentar uspešno obrisan. 😄", {});
          console.log(e);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="comments">
      <div
        style={{
          margin: "30px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <input
          type="text"
          className="comments__input"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            console.log(comment);
          }}
        />
        <button
          className="comments__add"
          onClick={(e) => {
            handleComment();
          }}
        >
          +
        </button>
      </div>

      {comments !== null &&
        comments.map(({ commentId, user, comment, userName, createdAt }) => (
          <div key={commentId} className="comment">
            <div className="comment__author__wrapper">
              <img
                src={`https://api.dicebear.com/5.x/croodles/svg?seed=${userName}`}
                className="comment__pfp"
                alt="Avatar"
              />
              <p className="comment__author fw-700">
                {userName}
                {user === authorid && (
                  <span
                    style={{
                      backgroundColor: "#0077ff",
                      color: "#fff",
                      padding: "3px",
                      borderRadius: "5px",
                      marginLeft: 5,
                    }}
                    title={"Autor objave"}
                  >
                    Autor
                  </span>
                )}
                {user === import.meta.env.VITE_ADMIN_UID && (
                  <span
                    style={{
                      backgroundColor: "#ff77ff",
                      color: "#fff",
                      padding: "3px",
                      borderRadius: "5px",
                      marginLeft: 5,
                    }}
                    title="Administrator platforme"
                  >
                    Admin
                  </span>
                )}
              </p>
            </div>
            <p className="comment__content">{comment}</p>
            {(currentUser.uid === user ||
              currentUser.uid === import.meta.env.VITE_ADMIN_UID) && (
              <button
                className="comments__delete"
                onClick={() =>
                  handleDeleteComment({
                    commentId,
                    user,
                    comment,
                    userName,
                    createdAt,
                  })
                }
              >
                ×
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

export default Comments;
