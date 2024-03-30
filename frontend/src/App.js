import Navbar from './components/Navbar';
import Form from './components/Form';
import Posts from './components/Posts';
import {Route, Routes, useNavigate} from 'react-router-dom'
import PostForm from './components/PostForm';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import LogoutConfirm from './components/LogoutConfirm';


function App() {

    const [posts,setPosts]=useState([]);
    const [editpost,setEditPosts]=useState({});
    const [isLogin,SetisLogin]=useState(false);

    const navigate=useNavigate();

    const getPosts=async()=>{
      await fetch('http://localhost:3000/api/post')
      .then(res=>{
          res.json().then(data=>setPosts(data));
      })
    }

    useEffect(()=>{
        getPosts();
    },[posts]);

  
  //to handle user creation
  const handleCreateUser=async(userData)=>{
    await fetch('http://localhost:3000/api/user/',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(userData),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          alert(data.message);
        });
      } else {
        response.json().then(data => {
          alert(data);
        });
      }
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });
  }


  //handle Login
  const handleLogin =async(userData) =>{
    await fetch('http://localhost:3000/api/user/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(userData),
    }).then(response=>{
      response.json().then(data=>{
        localStorage.setItem("token",data.token);
        SetisLogin(true);
      });
    })
  }

  const handleLogout=async()=>{
    await localStorage.removeItem('token');
    SetisLogin(false);
    navigate('/');
  }


  //create new posts
  const handleCreatePost = async (postData) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login to create a post');
      return;
    }

    try {
      const decodedToken = jwtDecode(token); 
      const authorId = decodedToken._id;

      const newPostData = {
        ...postData,
        author: authorId, 
      };

      await fetch('http://localhost:3000/api/post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify(newPostData),
      }).then((response) => {
        if (response.ok) {
          alert('Post created successfully!');         
          navigate('/');
        } else {
          response.json().then((data) => {
            alert(data.message);
          });
        }
      });
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post');
    }
  };


  //delete Post
  const handleDeletePost=async(postId)=>{
    const token = localStorage.getItem('token');
    if(!token){
      alert("Please Login to delete a Post");
      return;
    }
    try{
      await fetch(`http://localhost:3000/api/post/${postId}`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'x-auth-token':localStorage.getItem('token')
        },
      }).then(res=>{
        if(res.ok){
          alert('Post Deleted Successfully');
        }
        else{
          res.json().then(data=>{
            alert(data)
          });
        }
      });
    }
    catch(error){
      console.log("Error Creating Post:",error);
      alert("An error occurred while Delete the post")
    }
  }

  //edit post in Form
  const handleEdit=(id)=>{
    let post = posts.find((post)=>post._id===id);
    setEditPosts(post);
    navigate('/new');
    // setEditPosts({});
  }

  //handle Edit Post 
  const handleEditPost=async(postId,EditPostData)=>{
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login to Edit a post');
      return;
    }

    try{
      await fetch(`http://localhost:3000/api/post/${postId}`,{
        method:"PUT",
        headers:{
          'Content-Type': 'application/json',
          'x-auth-token':token
        },
        body: JSON.stringify(EditPostData),
      }).then(res=>{
        if(res.ok){
          alert("Post Edited SuccessFully");
          setEditPosts({});
          navigate('/');
        }
        else{
          res.json().then(data=>{
            alert(data);
          });
        }
      });
    } catch(err){
        console.error('Error creating post:', err);
        alert('An error occurred while Editing the post');
    }
  }

  return (
    <>
      <Navbar isLogin={isLogin}/>
      <Routes>
        <Route path="/signup" element={<Form createUser={handleCreateUser} isSignUp={true} />} />
        <Route path="/login" element={<Form createUser={handleLogin}  isSignUp={false} />}/>
        <Route path="/logout" element={<LogoutConfirm handleLogout={handleLogout}/>}/>
        <Route path="/new" element={<PostForm createPost={handleCreatePost} Editpost={editpost} handleEditPost={handleEditPost}/>}/>
        <Route path="/" element={<Posts posts={posts} deletePost={handleDeletePost} onEdit={handleEdit}/>}/>
      </Routes>
    </>
  );
}


export default App;
