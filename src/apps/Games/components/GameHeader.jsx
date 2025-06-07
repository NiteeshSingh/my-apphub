import React from 'react';

const GameHeader = ({ 
    title, 
    subtitle, 
    score = 0, 
    attempts = 0, 
    maxAttempts = 0,
    icon = '🎮'
}) => {
    return (
        <div className="text-center mb-4">
            <h1 className="display-4 text-primary">{icon} {title}</h1>
            {subtitle && <p className="lead">{subtitle}</p>}
            <div className="d-flex justify-content-center gap-4">
                <div className="badge bg-info fs-6">Score: {score}</div>
                {maxAttempts > 0 && (
                    <div className="badge bg-secondary fs-6">
                        Attempts: {attempts}/{maxAttempts}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameHeader; 