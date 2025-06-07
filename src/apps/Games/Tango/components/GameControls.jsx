import React from 'react';

const GameControls = ({ gameState, onGuess, onReset, onInputChange }) => {
    const { gameStatus, currentGuess } = gameState;

    // Quick number buttons for easy input
    const quickNumbers = [1, 25, 50, 75, 100];

    const handleQuickNumber = (number) => {
        onInputChange(number.toString());
    };

    if (gameStatus !== 'playing') {
        return null;
    }

    return (
        <div className="card border-0 bg-light">
            <div className="card-body p-3">
                <div className="row g-3">
                    {/* Quick Number Buttons */}
                    <div className="col-12">
                        <h6 className="text-muted mb-2">
                            <i className="fas fa-bolt me-2"></i>
                            Quick Numbers
                        </h6>
                        <div className="d-flex gap-2 flex-wrap">
                            {quickNumbers.map(number => (
                                <button
                                    key={number}
                                    className={`btn btn-sm ${
                                        currentGuess === number.toString() 
                                            ? 'btn-primary' 
                                            : 'btn-outline-primary'
                                    }`}
                                    onClick={() => handleQuickNumber(number)}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="col-12">
                        <div className="d-flex gap-2 justify-content-center">
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => onInputChange('')}
                                disabled={!currentGuess}
                            >
                                <i className="fas fa-eraser me-1"></i>
                                Clear
                            </button>
                            
                            <button
                                className="btn btn-outline-warning btn-sm"
                                onClick={onReset}
                                title="Start a new game"
                            >
                                <i className="fas fa-redo me-1"></i>
                                New Game
                            </button>
                        </div>
                    </div>
                </div>

                {/* Keyboard Shortcuts Info */}
                <div className="mt-3 text-center">
                    <small className="text-muted">
                        <i className="fas fa-keyboard me-1"></i>
                        Press <kbd>Enter</kbd> to guess • <kbd>Esc</kbd> for rules
                    </small>
                </div>
            </div>
        </div>
    );
};

export default GameControls; 