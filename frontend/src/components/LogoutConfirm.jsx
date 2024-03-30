import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutConfirm = ({handleLogout}) => {
    const navigate=useNavigate();
    const handleBack=()=>{
        navigate('/');
    }
  return (
    <div className='container bg-dark text-white col-5 p-5 rounded'>
        <div className="row ms-3 mb-2">
            <h2>Are You Sure ?</h2>
        </div>
        <div className="d-flex">
                <button className='btn btn-outline-secondary mx-4' onClick={handleBack}>Cancel</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default LogoutConfirm