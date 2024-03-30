import React, { useState} from 'react';

const PostForm = ({createPost,Editpost,handleEditPost}) => {
    const [title,setTitle]=useState(Editpost.title||'');
    const [content,setContent]=useState(Editpost.content||'');

    const handlePostForm=async(e)=>{
        e.preventDefault();
        if (Object.keys(Editpost).length >0)
            await handleEditPost(Editpost._id,{title,content});
        else
            await createPost({title,content});
        setTitle('');
        setContent('');
    }



    return (
        <div className='container bg-info p-4 rounded text-white'>
            <form onSubmit={handlePostForm}>
                <div className="form-group mb-2">
                    <label className='mb-2'>Title</label>
                    <input type="text" className='form-control' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="form-group mb-2">
                    <label className='mb-2'>Content</label>
                    <textarea className='form-control' value={content} cols="30" rows="10" onChange={(e)=>setContent(e.target.value)}></textarea>
                </div>
                <button type='submit' className='btn btn-success mt-2'>{Object.keys(Editpost).length >0?"Edit Post":"Add new Post"}</button>
            </form>
        </div>
    )
}

export default PostForm;