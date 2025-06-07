//landing window of games app
//display a card of all the games

import React, { useState, useEffect } from 'react';
import AppCard from '../../components/AppCard';

const GamesWindow = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/my-apphub/app-data/Games/games-meta.json')
            .then(response => response.json())
            .then(data => {
                const visibleGames = data.games.filter((game) => game.display);
                setGames(visibleGames);
            })
            .catch(error => console.error('Error fetching games:', error));

        return () => {
            setGames([]);
        }
    }, []);

    if (games.length === 0) {
        return (
            <div className="container text-center mt-5">
                <p>Loading games...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Available Games</h2>
            <p className="text-center">Click on a game to play</p>
            <div className="row">
                {games.map((game) => (
                    <div className="col-md-4 mb-4" key={game.id}>
                        <AppCard
                            image={game.cardImage}
                            title={game.name}
                            summary={game.cardData.summary}
                            link={game.link}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default GamesWindow;