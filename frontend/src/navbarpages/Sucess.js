import React, { useEffect } from 'react';
import { sucess } from '../assests';
import { useNavigate } from 'react-router-dom';

const Sucess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the home page after 5 seconds (5000 milliseconds)
    const timeout = setTimeout(() => {
      navigate('/');
    }, 2000);

    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '80px 0', background: '#EBF0F5' }}>
      <div className="card" style={{ background: 'white', padding: '60px', borderRadius: '4px', boxShadow: '0 2px 3px #C8D0D8', display: 'inline-block', margin: '0 auto' }}>
        <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
          <img src={sucess} alt="sucess" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <h1 style={{ color: '#88B04B', fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif', fontWeight: '900', fontSize: '40px', marginBottom: '10px' }}>Payment Successful</h1>
        <p style={{ color: '#404F5E', fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif', fontSize: '20px', marginLeft: '110px' }}>Order confirmed</p>
      </div>
    </div>
  );
};

export default Sucess;
