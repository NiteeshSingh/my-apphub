import React from 'react';

const GameFeedback = ({ message, gameStatus = 'playing' }) => {
    const getAlertClass = () => {
        switch (gameStatus) {
            case 'won':
                return 'alert-success';
            case 'lost':
                return 'alert-danger';
            default:
                return 'alert-info';
        }
    };

    return (
        <div className="text-center mb-4">
            <div className={`alert ${getAlertClass()}`}>
                {message}
            </div>
        </div>
    );
};

export default GameFeedback; 