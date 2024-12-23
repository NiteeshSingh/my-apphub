import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainSection from './components/MainSection';

import Counter from './apps/Counter/Counter';

const App = () => {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        {/* Header is always visible */}
        <Header />
        
        {/* Main content of the app */}
        <main className='d-flex flex-grow-1 bg-light'>
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route path="/counter" element={<Counter />} />
            {/* <Route path="/weather-tracker" element={<WeatherTracker />} />
            <Route path="/task-manager" element={<TaskManager />} /> */}
          </Routes>
        </main>
        
        {/* Footer is always visible */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

