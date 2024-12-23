import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 My App Hub</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
  },
  title: {
    margin: 0,
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    display: 'inline',
    margin: '0 10px',
  },
};

export default Footer;
