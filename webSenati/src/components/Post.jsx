
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shadow-custom bg-white rounded-3xl m-5">
      <div className="p-5">
        <div className="flex items-center justify-between relative">
          <div className="flex gap-5">
            {/* <img className="w-10 h-10 rounded-full object-cover" src={"/upload/" + post.profilePic} alt="" /> */}
            <img className="w-10 h-10 rounded-full object-cover" src={"https://images.pexels.com/photos/23720223/pexels-photo-23720223.jpeg/"} alt="" />
            <div className="flex flex-col">
              <Link
                to={`/profile/${post.userid}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="font-medium">{post.usernombre}</span>
              </Link>
              <span className="text-xs">{moment(post.fecha_subida).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userid === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="my-5">
          <p>{post.titulo}</p>
          {/* <img className="w-full max-h-[500px] object-cover mt-5" src={"/upload/" + post.img} alt="" /> */}
          <img className="w-full max-h-[500px] object-cover mt-5" src={"https://images.pexels.com/photos/21287054/pexels-photo-21287054/free-photo-of-comida-ciudad-vacaciones-calle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 cursor-pointer text-[14px]">
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
          <div className="flex items-center gap-2 cursor-pointer text-[14px]" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-[14px]">
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
