
import { useEffect, useState, useRef } from "react";
import FormsComment from "./FormsComment";
import Star from './../Star'


const Comment = ({
  comment,
  replies,
  dataComment,
  setActiveComment,
  activeComment,
  editComment,
  deleteComment,
  addCommentsReply,
  addComment,
  parentId = null,
  currentUserId,
}) => {

  const fiveMinutes = 300000;


  const replie = ([])
  const items = [...(new Array(5).keys())];
  const [activeIndex, setActiveIndex] = useState(comment.star);
  const nome ="pitchou luhata luambo"
  console.log(activeIndex)
  const getReplies = (commentId) => {
    dataComment.filter((comment) =>
      comment.parentId === commentId)
      .sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }

  return (
    <>



      <div className="comment" key={comment.id_comments}>
        

          <div className="comment-right-part">
            <div className="comment-content">
      
              <button class="profile-user"><i class="fa-solid fa-user "></i></button>

              <span className="comment-author">{nome}</span>

             

              <span>{new Date(comment.createdAt).toLocaleDateString()} </span>
            </div>
            {
              !(activeComment && activeComment.id === comment.id_comments && activeComment.type === "editing") &&
              <div className='comment-text comment-actions'>{comment.comentario}</div>}

            {(activeComment && activeComment.id === comment.id_comments && activeComment.type === "editing") && (

              <FormsComment submitLabel="Editar" hasCancelButton
                initialText={comment.comentario}
                handleSubmit={(stateInputMessage) => editComment(stateInputMessage, comment.id_comments)}
                handleCancel={() => {
                  setActiveComment(null);
                }} />

            )}

            <div className="comment-actions">
              {currentUserId == comment.id_usuario && (
                <div
                  className="comment-action"
                  onClick={() =>
                    setActiveComment({ id: comment.id_comments, type: "replying" })
                  }
                >
                  Responder
                </div>
              )}
              {currentUserId == comment.id_usuario &&
                (<div
                  className="comment-action"
                  onClick={() =>
                    setActiveComment({ id: comment.id_comments, type: "editing" })
                  }
                >
                  Editar
                </div>)}
              {currentUserId == comment.id_usuario &&
                (
                  <div
                    className="comment-action"
                    onClick={() => deleteComment(comment.id_comments)}
                  >
                    Excluir
                  </div>
                )}

            </div>

            {(activeComment && activeComment.id === comment.id_comments && activeComment.type === "replying") && (
              <FormsComment
                submitLabel="Reply"
                handleSubmit={(text) => addCommentsReply(text, comment.id_comments)}
              />
            )}
            {

              replies.length > 0 && (
                <div className="replies">
                  {replies.map((reply) => (
                    <Comment
                      comment={reply}
                      key={reply.id}
                      setActiveComment={setActiveComment}
                      activeComment={activeComment}
                      editComment={editComment}
                      deleteComment={deleteComment}
                      addComment={addComment}
                      parentId={comment.id_comments}
                      replies={[]}
                      currentUserId={15}
                    />
                  ))}
                </div>
              )
            }

          </div>
        
      </div>

    </>
  );
};

export default Comment;
