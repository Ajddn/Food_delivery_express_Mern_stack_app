import React from 'react';

const Footer = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 35vh)', }}>
      <div style={{ flex: '1' }}>
        <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', padding: '25px', backgroundColor: '#EDEEF7' }}>
          {/* Footer content */}
          © 2023 Copyright:
          <a style={{ color: 'black',fontWeight:'bold' }} href="https://mdbootstrap.com/">
            FoodDeliveryexpress.com
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
