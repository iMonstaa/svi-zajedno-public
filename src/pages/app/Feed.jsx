import { useState } from "react";
import PostComponent from "../../components/app/PostComponent";
import plusIcon from "../../assets/images/Plus.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

function Feed() {
  const [articles, setArticles] = useState([]);
  const [pinned, setPinned] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const pinnedRef = collection(db, "Pinned");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    const q2 = query(pinnedRef, orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
    onSnapshot(q2, (snapshot) => {
      const pinned = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPinned(pinned);
    });
  }, []);

  return (
    <div className="feed">
      {pinned.length === 0
        ? ""
        : pinned.map(({ id, Author, Title, imageUrl, createdAt, userId }) => (
            <PostComponent
              postContent={{
                identifier: id,
                name: Author,
                title: Title,
                imageId: imageUrl,
                date: createdAt,
                userId: userId,
                pinned: true,
              }}
              key={id}
            />
          ))}
      {articles.length === 0 ? (
        <p className="sofia">Nema objava</p>
      ) : (
        articles.map(({ id, Author, Title, imageUrl, createdAt }) => (
          <PostComponent
            postContent={{
              identifier: id,
              name: Author,
              title: Title,
              imageId: imageUrl,
              date: createdAt,
              pinned: false,
            }}
            key={id}
          />
        ))
      )}

      <Link to="/app/post/new" className="create">
        <img src={plusIcon}></img>
      </Link>
    </div>
  );
}

export default Feed;
