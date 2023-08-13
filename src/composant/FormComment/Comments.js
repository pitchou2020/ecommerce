import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import CommentForm from "./FormsComment";
import Comment from "./Comment";
import api from '../../config/configApi'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Star from './../Star'
import { getComment } from "./CommentsReducer";
import { addComment } from "./CommentsReducer";
import { addCommentReply } from "./CommentsReducer";
import { editComments } from "./CommentsReducer";
import{deleteComments} from "./CommentsReducer"


import spinner from './../../assets/images/spinner.gif'

const Comments = ({ activeIndex }) => {
  const [activeComment, setActiveComment] = useState(null);
  const idUser = localStorage.getItem('idUser')
  const currentUserId = 15;
  const [dataComment, setDataComment] = useState({
    loading: false,
    console: false,
    data: undefined
  });

  const [APIState, setAPIState] = useState({
    loading: false,
    error: true,
    data: undefined
  })
  const [showModalComment, setShowModalComment] = useState(false)
  const params = useParams();
  const idcad = useState(params.id);
  const initialText = "";
  const [stateInputMessage, setStateInputMessage] = useState(initialText)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { articles } = useSelector(state => ({
    ...state.articleReducer
  }))
  const location = useLocation()
  const [comment, setComment] = useState([])
  const comments = useSelector(state => state.CommentsReducer)


  const [statusEnvio, setEnvioStatus] = useState({
    type: '',
    mensagem: ''
  })

  const goLogin = () => { navigate("/login") }

  const addComments = async (stateInputMessage, parentId = null) => {
    /*
    if (currentUserId===null) {
      goLogin()
      }*/

    const form = {
      id_recettes: location.state.id_recette,
      id_usuario: 15,
      parentId,
      comentario: stateInputMessage,
      star: activeIndex,
    }
    await dispatch(addComment(form))
    dispatch(getComment())

    setStateInputMessage("")
  }



  const addCommentsReply = async (stateInputMessage, parentId) => {
    /*
    if (currentUserId===null) {
      goLogin()
      }*/
    const form = {
      id_recettes: location.state.id_recette,
      id_usuario: 15,
      parentId: parentId,
      comentario: stateInputMessage,
    }
    await dispatch(addCommentReply(form))

    dispatch(getComment())
    setActiveComment(null);

  }
  let updatedDataComments = {}


  const editComment = async (stateInputMessage, commentsId) => {
    comments.data.map((comment) => {
      if (comment.id_comments === commentsId) {
        updatedDataComments = { ...comment, comentario: stateInputMessage }
      }
    })
    await dispatch(editComments(updatedDataComments))
    dispatch(getComment())
    setActiveComment(null);
  }

  const deleteComment = async (id_comments) => {
    await dispatch(deleteComments(id_comments))
    dispatch(getComment())
  };

  useEffect(() => {



  }, []);


  const items = [...(new Array(5).keys())];
  let content;
  let count;
  let rootComments = ([])
  let commentRecette = ([])
  if (!comments.data && !comments.loading && !comments.error) {
    dispatch(getComment())
  }
  else if (comments.loading) {
    content = <img src={spinner} alt='spinning loader' />
  }
  else if (comments.error) {
    content = <p> An error has occured</p>
  }
  else if (comments.data?.length > 0) {
    commentRecette = comments.data.filter((comment) => comment.id_recettes === location.state.id_recette);
    rootComments = commentRecette.filter((comment) => comment.parentId === null);
    count = Object.keys(commentRecette).length
    content =
      rootComments.map((rootComment) => (

        <Comment
          key={rootComment.id_comments}
          comment={rootComment}
          replies={comments.data.filter((comment) => comment.parentId === rootComment.id_comments)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())}
          dataComment={comments.data}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          addComments={addComments}
          deleteComment={deleteComment}
          editComment={editComment}
          addCommentsReply={addCommentsReply}
          currentUserId={15}
        />
      ))
  }

  return (
    <>
      <div className="comments">
        <h3 className="comments-title">{count + " comentários"} </h3>
        <div className="comment-form-title"> Conte sua experiença com a receita</div>
        <CommentForm submitLabel="Comentar" handleSubmit={addComments} />
        <div className="comments-container">
          {content}
        </div>
      </div>
    </>
  );
};

export default Comments;


