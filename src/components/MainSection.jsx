import React, { useState, useEffect } from 'react';
import AppCard from './AppCard';

const MainSection = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // Fetch the app metadata from the JSON file
    fetch('/my-apphub/app-meta.json')
      .then((response) => response.json())
      .then((data) => {
        // Filter apps where display is true
        const visibleApps = data.apps.filter((app) => app.display);
        setApps(visibleApps);
      })
      .catch((error) => console.error('Error fetching app metadata:', error));
  }, []);

  // Render loading state while data is being fetched
  if (apps.length === 0) {
    return (
      <div className="container text-center mt-5">
        <p>Loading apps...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Available Apps</h2>
      <div className="row">
        {apps.map((app) => (
          <div className="col-md-4 mb-4" key={app.id}>
            <AppCard
              image={app.cardImage}
              title={app.name}
              summary={app.cardData.summary}
              link={app.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection;
