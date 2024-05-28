import { useContext, useState } from "react";

import { AuthContext } from "../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import moment from "moment";
import PerfilDefault from '../assets/perfil_default.svg';

const Comments = ({ postId }) => {
  const [comentario, setComentario] = useState("");
  const { currentUser } = useContext(AuthContext);

  // const { isLoading, error, data } = useQuery(["comentarios"], () =>
  //   makeRequest.get().then((res) => {
  //     return res.data;
  //   })
  // );

  const { isLoading, error, data } = useQuery({
    queryKey: ["comentarios", postId], 
    queryFn: () =>
      makeRequest.get("/comentarios/",{ params: { postId } }).then((res) => res.data), 
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComentario) => {
      return makeRequest.post('/comentarios/addComment', newComentario)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comentarios", postId]);
    },
  })

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ post_id: postId, comentario: comentario, email_usuario: currentUser.email, nombre_usuario: currentUser.nombre});
    setComentario("");
  };

  return (
    <div className="comments">
      <div className="flex items-center justify-between gap-3 my-5">
        <img className="w-10 h-10 rounded object-cover" src={PerfilDefault} alt="" />
        {/* <img className="w-10 h-10 rounded object-cover" src={"/upload/" + currentUser.profilePic} alt="" /> */}
        <input
          className="flex-grow border bg-transparent text-black p-2"
          type="text"
          placeholder="write a comment"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <button className="border-none bg-indigo-400 text-white p-2 cursor-pointer rounded" onClick={handleClick}>Send</button>
      </div>

            {error
              ? console.log(error)
              : isLoading
              ? "loading"
              : data.map((comment) => (
                  <div className="flex justify-between gap-5 mx-0 my-7" key={comment.id}>
                    <img className="w-10 h-10 rounded object-cover" src={PerfilDefault} alt="" />
                    {/* <img className="w-10 h-10 rounded object-cover" src={"/upload/" + comment.profilePic} alt="" /> */}
                    <div className="flex-[5] flex flex-col gap-[3 px] items-start">
                      <span className="font-medium">{comment.nombre_usuario}</span>
                      <p className="text-gray-500">{comment.comentario}</p>
                    </div>
                    <span className="flex-1 self-center text-gray-500 text-xs">
                      {moment(comment.fecha_subida).fromNow()}
                    </span>
                  </div>
                ))}
    </div>
  );
};

export default Comments;