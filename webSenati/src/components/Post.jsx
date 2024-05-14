import { useState, useContext } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import Comments from "./Comments";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // Consulta para obtener los datos de los "likes" del post
  const { isLoading, error, data: likes } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => makeRequest.get("/likes?postId=" + post.id).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  // Mutación para manejar los "likes"
  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidar y volver a obtener los datos de "likes"
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(likes.includes(currentUser.id));
  };

  return (
    <div className="post">
      <div className="container">
        <div className="content">
          <h2>{post.titulo}</h2>
          <p>Fecha de subida: {moment(post.fecha_subida).format("LLL")}</p>
          <p>Usuario ID: {post.id_usuario}</p>
          <p>{post.ruta}</p>
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "Cargando..."
            ) : likes.includes(currentUser.id) ? (
              <span style={{ color: "red" }} onClick={handleLike}>
                Me gusta
              </span>
            ) : (
              <span onClick={handleLike}>Me gusta</span>
            )}
            {likes?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            Ver comentarios
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
