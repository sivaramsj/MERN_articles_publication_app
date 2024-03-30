import PostCard from './PostCard';

const Posts = ({posts,deletePost,onEdit}) => {
    
    return (
        <div className="container">
            <div className="row">
                {posts.map((post)=>{
                    return (<div key={post._id}>
                                <PostCard post={post} deletePost={deletePost} onEdit={onEdit}/>
                            </div>)
                })}
            </div>
        </div>
    )
}

export default Posts