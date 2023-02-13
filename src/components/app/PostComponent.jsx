import React from "react";
import { Link } from "react-router-dom";
import imgPin from "../../assets/images/pin.webp";

function PostComponent({ postContent }) {
  const postDate = new Date(+`${postContent.date.seconds}000`);

  return (
    <Link
      to={`/app/${postContent.pinned ? "pin" : "post"}/${
        postContent.identifier
      }`}
    >
      <div className={`post sofia${postContent.pinned ? " post--pinned" : ""}`}>
        <span className="post__title fw-700">{postContent.title}</span>
        <div className="post__author">
          <div className="post__author__pfp">
            <img
              src={`https://api.dicebear.com/5.x/croodles/svg?seed=${postContent.name}`}
              alt="Author's profile picture"
            />
          </div>
          <div className="post__author__name">{postContent.name}</div>
          <div className="post__author__date fw-700">·</div>
          <div className="post__author__date">
            {`${postDate.getDate()}-${
              postDate.getMonth() + 1
            }-${postDate.getFullYear()}`}
          </div>
        </div>
        <div className="post__overlay"></div>
        <img className="post__banner" src={postContent.imageId} alt="Content" />
        <img src={imgPin} alt="pinned post" className="post__pin" />
      </div>
    </Link>
  );
}

export default PostComponent;
