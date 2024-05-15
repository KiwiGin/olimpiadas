
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../components/Comments";
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get("/likes?postId=" + post.id);
        setLikes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLikes();
  }, [post.id]);

  const handleLike = async () => {
    try {
      if (likes.includes(currentUser.id)) {
        await axios.delete("/likes?postId=" + post.id);
        setLikes(likes.filter((id) => id !== currentUser.id));
      } else {
        await axios.post("/likes", { postId: post.id });
        setLikes([...likes, currentUser.id]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + post.id);
      // Optionally, you can trigger a re-fetch of posts or navigate away
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post">
      <div className="p-5">
        <div className="flex items-center content-between relative">
          <div className="flex gap-5">
            <img src={"/upload/" + post.profilePic} alt="" />
            <div className="flex flex-col">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="font-medium">{post.name}</span>
              </Link>
              <span className="text-xs">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : likes.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {likes?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
