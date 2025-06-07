import React from 'react';
import { GAME_CONFIG } from '../config/gameConfig';

const GameBoard = ({ gameState, onGuess, onInputChange, onReset, hint }) => {
    const { 
        currentGuess, 
        attempts, 
        maxAttempts, 
        gameStatus, 
        feedback, 
        guessHistory, 
        score 
    } = gameState;

    const handleInputChange = (e) => {
        onInputChange(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && gameStatus === 'playing') {
            onGuess();
        }
    };

    const getFeedbackClass = () => {
        switch (gameStatus) {
            case 'won':
                return 'alert-success';
            case 'lost':
                return 'alert-danger';
            default:
                return 'alert-info';
        }
    };

    const getProgressPercentage = () => {
        return (attempts / maxAttempts) * 100;
    };

    const getProgressColor = () => {
        const percentage = getProgressPercentage();
        if (percentage < 50) return 'bg-success';
        if (percentage < 80) return 'bg-warning';
        return 'bg-danger';
    };

    return (
        <div>
            {/* Current Score Display */}
            {gameStatus !== 'playing' && score > 0 && (
                <div className="text-center mb-4">
                    <div className="badge bg-success fs-4 px-4 py-2">
                        🏆 Score: {score} points
                    </div>
                </div>
            )}

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Attempts</span>
                    <span className="badge bg-secondary">
                        {attempts} / {maxAttempts}
                    </span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                    <div 
                        className={`progress-bar ${getProgressColor()}`}
                        style={{ width: `${getProgressPercentage()}%` }}
                        role="progressbar"
                    ></div>
                </div>
            </div>

            {/* Feedback Message */}
            <div className={`alert ${getFeedbackClass()} text-center mb-4`}>
                <strong>{feedback}</strong>
            </div>

            {/* Hint Display */}
            {hint && gameStatus === 'playing' && (
                <div className={`alert alert-${hint.type === 'hot' ? 'warning' : 'info'} text-center mb-4`}>
                    <small>{hint.message}</small>
                </div>
            )}

            {/* Input Section */}
            {gameStatus === 'playing' && (
                <div className="row g-3 mb-4">
                    <div className="col-8">
                        <input
                            type="number"
                            className="form-control form-control-lg text-center"
                            placeholder={`Enter number (${GAME_CONFIG.MIN_NUMBER}-${GAME_CONFIG.MAX_NUMBER})`}
                            value={currentGuess}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            min={GAME_CONFIG.MIN_NUMBER}
                            max={GAME_CONFIG.MAX_NUMBER}
                            autoFocus
                            style={{ fontSize: '1.5rem' }}
                        />
                    </div>
                    <div className="col-4">
                        <button
                            className="btn btn-primary btn-lg w-100"
                            onClick={onGuess}
                            disabled={!currentGuess || currentGuess.trim() === ''}
                            style={{ fontSize: '1.2rem' }}
                        >
                            🎯 Guess!
                        </button>
                    </div>
                </div>
            )}

            {/* Game Over Actions */}
            {gameStatus !== 'playing' && (
                <div className="text-center mb-4">
                    <button
                        className="btn btn-success btn-lg me-3"
                        onClick={onReset}
                    >
                        🎮 Play Again
                    </button>
                    <button
                        className="btn btn-outline-secondary btn-lg"
                        onClick={() => window.history.back()}
                    >
                        🏠 Back to Games
                    </button>
                </div>
            )}

            {/* Guess History */}
            {guessHistory.length > 0 && (
                <div className="mt-4">
                    <h6 className="text-muted mb-3">
                        <i className="fas fa-history me-2"></i>
                        Guess History
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                        {guessHistory.map((entry, index) => {
                            let badgeClass = 'bg-secondary';
                            if (entry.isCorrect) {
                                badgeClass = 'bg-success';
                            } else if (Math.abs(entry.guess - gameState.targetNumber) <= 10) {
                                badgeClass = 'bg-warning';
                            } else {
                                badgeClass = 'bg-info';
                            }

                            return (
                                <span
                                    key={index}
                                    className={`badge ${badgeClass} fs-6 px-3 py-2`}
                                    title={`Attempt ${entry.attempt}: ${entry.guess}`}
                                >
                                    #{entry.attempt}: {entry.guess}
                                    {entry.isCorrect && ' ✓'}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Number Range Visualization */}
            {gameStatus === 'playing' && guessHistory.length > 0 && (
                <div className="mt-4">
                    <h6 className="text-muted mb-3">
                        <i className="fas fa-chart-line me-2"></i>
                        Range Visualization
                    </h6>
                    <div className="position-relative">
                        <div 
                            className="bg-light border rounded p-3"
                            style={{ height: '60px', position: 'relative' }}
                        >
                            {/* Range markers */}
                            <div className="d-flex justify-content-between text-muted small">
                                <span>{GAME_CONFIG.MIN_NUMBER}</span>
                                <span>{GAME_CONFIG.MAX_NUMBER}</span>
                            </div>
                            
                            {/* Guess markers */}
                            {guessHistory.slice(-5).map((entry, index) => {
                                const position = ((entry.guess - GAME_CONFIG.MIN_NUMBER) / 
                                    (GAME_CONFIG.MAX_NUMBER - GAME_CONFIG.MIN_NUMBER)) * 100;
                                
                                return (
                                    <div
                                        key={index}
                                        className={`position-absolute ${entry.isCorrect ? 'bg-success' : 'bg-primary'}`}
                                        style={{
                                            left: `${position}%`,
                                            top: '20px',
                                            width: '8px',
                                            height: '20px',
                                            borderRadius: '4px',
                                            transform: 'translateX(-50%)'
                                        }}
                                        title={`Guess: ${entry.guess}`}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameBoard; 