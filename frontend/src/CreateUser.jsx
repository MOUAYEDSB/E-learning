import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser({ onAddUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { Name: name, Email: email, Age: age };
    onAddUser(newUser);
    navigate('/users'); // Redirect to the users list page
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input
              type='text'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Age</label>
            <input
              type='number'
              className='form-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
