import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({isLogin}) => {
  return (
    <nav className='d-flex mb-3 bg-dark text-light'>
        <Link to="/" className='me-auto p-2 text-light text-decoration-none h2'>Blog App</Link>
        <Link to="/new" className='p-2  mt-2 text-light text-decoration-none h5'>+ New Posts</Link>
        {
          isLogin?(
            <Link to="/logout" className='btn btn-danger p-2 m-2'>Logout</Link>
          ):(
          <>
            <Link to="/login" className='btn btn-primary p-2 m-2'>Login</Link>
            <Link to="/signup" className='btn btn-secondary p-2 m-2'>Sign Up</Link>
          </>
          )
        }
    </nav>
  )
}

export default Navbar



