import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>My App Hub</h1>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}><a href="/">Home</a></li>
          <li style={styles.navItem}><a href="#about">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
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

export default Header;
