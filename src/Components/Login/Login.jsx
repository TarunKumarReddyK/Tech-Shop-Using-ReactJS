import React, { useState, useEffect, useRef } from 'react';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const formRef = useRef(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closeForm();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    isFormVisible && (
      <div className="overlay">
        <div className="form-container" ref={formRef}>
          <button className="close-button" onClick={closeForm}>✖</button>
          <h2>{isLogin ? 'Login' : 'Signup'}</h2>
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span className="toggle-link" onClick={toggleForm}>
              {isLogin ? 'Signup' : 'Login'}
            </span>
          </p>
          <form>
            <input type="text" placeholder="Username" required />
            {!isLogin && <input type="email" placeholder="Email" required />}
            <input type="password" placeholder="Password" required />
            {!isLogin && <input type="password" placeholder="Confirm Password" required />}
            <button type="submit">{isLogin ? 'Signin' : 'Signup'}</button>
          </form>
          <div className="separator mt-4">
            ------------- or login with ----------------
          </div>
          <div className="social-login">
            <button className="facebook">Facebook</button>
            <button className="google">Google</button>
            <button className="twitter">Twitter</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
