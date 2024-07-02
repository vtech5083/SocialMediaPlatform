import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.js';
import '../css/Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let formErrors = {};

    for (let key in formData) {
      if (!formData[key]) {
        formErrors[key] = 'This field is required';
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/api/users/login', formData);
        console.log(response.data);
        login(response.data); // Set the session as authenticated
      } catch (error) {
        console.error(error);
        alert("Invalid username or password")
      }
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>

      <div className="reset-password">
        <p>Forgot Password? <Link to="/reset">Reset Password</Link></p>
      </div>

      <div className="signup-link">
        <p>Not a user yet? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
