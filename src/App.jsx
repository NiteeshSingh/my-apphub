import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainSection from './components/MainSection';

import Counter from './apps/Counter/Counter';
import MyCodeforces from './apps/MyCodeforces/MyCodeforces';
import GamesWindow from './apps/Games/GamesWindow';
import TangoGame from './apps/Games/Tango/TangoGame';

const App = () => {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        {/* Header is always visible */}
        <Header />
        
        {/* Main content of the app */}
        <main className='d-flex flex-grow-1 bg-light'>
          <Routes>
            <Route path="/my-apphub/" element={<MainSection />} />
            <Route path="/my-apphub/counter" element={<Counter />} />
            <Route path="/my-apphub/my-codeforces" element={<MyCodeforces />} />
            <Route path="/my-apphub/games" element={<GamesWindow />} />
            <Route path="/my-apphub/games/tango" element={<TangoGame />} />
          </Routes>
        </main>
        
        {/* Footer is always visible */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

