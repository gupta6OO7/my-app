import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

  let navigate = useNavigate();

  const [creds, setcreds] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: creds.name,
        email: creds.email,
        password: creds.password
      })
    });
    const json = await response.json()
    if (!json.success) {
      alert(json.errors);
    }
    else {
      localStorage.setItem('authToken', json.authToken);
      console.log(localStorage.getItem('authToken'));
      navigate('/');
    }
  }

  const onChange = (event) => {
    setcreds({ ...creds, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <form style={{
        paddingTop: '120px',
        paddingLeft: '500px',
        paddingRight: '500px'
      }} onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your Name"
            name='name'
            value={creds.name}
            onChange={onChange}></input>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name='email'
            value={creds.email}
            onChange={onChange}></input>
          <small
            id="emailHelp"
            className="form-text text-muted"
          >We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name='password'
            value={creds.password}
            onChange={onChange}></input>
          <small
            id="passHelp"
            className="form-text text-muted"
          >Password must be at least 5 characters long.</small>
        </div>

        <button
          type="submit"
          className="btn m-3 btn-primary"
        >Submit</button>
        <Link to='/login'>
          <button
            type="submit"
            className="btn m-3 btn-success"
          >Already a User?</button>
        </Link>
      </form>
    </div>
  )
}