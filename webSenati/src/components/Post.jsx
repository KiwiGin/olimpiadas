
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../components/Comments";
import { useState, useContext } from "react";
import moment from "moment";
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import PerfilDefault from '../assets/perfil_default.svg';
import Spinner from "../assets/Spinne.svg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id], 
    queryFn: async () => {
      // console.log('WAASAAA');
      const response = await makeRequest.get('/likes/', { params: { postId: post.id } });
      // console.log('PASO');
      return response.data;
    }
  });

  const queryClient = useQueryClient();

  // Additional logging for debugging
  // console.log({ isLoading, error, data });

  const mutation = useMutation({
    mutationFn: (liked) => {
      if(liked) {
        return makeRequest.delete('/likes/deleteLike/', { params:{postId: post.id} })
      }
      return makeRequest.post('/likes/addLike', {postId: post.id, nombre_usuario: currentUser.nombre})
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  })

  const handleLike = async () => {
    try {
      mutation.mutate(data.includes(currentUser.email))
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      // await axios.delete("/posts/" + post.email);
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
            <img className="w-10 h-10 rounded-full object-cover bg-white" src={PerfilDefault} alt="" />
            <div className="flex flex-col">
              <Link
                to={`/profile/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="font-medium">{post.nombre_usario}</span>
              </Link>
              <span className="text-xs">{moment(post.fecha_subida).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.email_usuario === currentUser.email && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="my-5">
          <p>{post.descripcion}</p>
          <div className="w-full h-full">
            <img className="w-full h-full object-fit mt-5" src={post.media} alt="" />
          </div>
          {/* <img className="w-full max-h-[500px] object-cover mt-5" src={"https://images.pexels.com/photos/21287054/pexels-photo-21287054/free-photo-of-comida-ciudad-vacaciones-calle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" /> */}
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 cursor-pointer text-[14px]">
            {isLoading ? (
              <img src={Spinner} alt="" className="h-5" />
            ) : data.includes(currentUser.email) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {/* {console.log(data)} */}
            {data?.length} Likes
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
