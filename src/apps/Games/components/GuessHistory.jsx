import React from 'react';

const GuessHistory = ({ history, targetNumber }) => {
    if (!history || history.length === 0) {
        return null;
    }

    const getBadgeClass = (guess) => {
        if (guess === targetNumber) return 'bg-success';
        if (guess < targetNumber) return 'bg-warning';
        return 'bg-info';
    };

    return (
        <div className="mt-4">
            <h5>Guess History:</h5>
            <div className="d-flex flex-wrap gap-2">
                {history.map((entry, index) => (
                    <span
                        key={index}
                        className={`badge ${getBadgeClass(entry.guess)} fs-6`}
                    >
                        #{entry.attempt}: {entry.guess}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default GuessHistory; 