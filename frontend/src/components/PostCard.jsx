
const PostCard = ({post,deletePost,onEdit}) => {


  return (
    <div className="card my-3">
      <div className="card-header">
        <h3>{post.title}</h3>
      </div>
      <div className="card-body">
        <p>{post.content}</p>
        <p className="h6 d-flex justify-content-end"> - Author: {post.author.username}</p>
      </div>
      <div className="card-footer d-flex">
        <div className="col">
          <p className="card-text">Created At: {new Date(post.createdAt).toLocaleString()}</p>
        </div>
        <div className="justify-content-end">
          <button className="btn btn-primary me-2" onClick={()=>{onEdit(post._id)}}>Edit</button>
          <button className="btn btn-danger" onClick={()=>deletePost(post._id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default PostCard