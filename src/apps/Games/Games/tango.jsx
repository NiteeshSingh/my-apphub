// Tango Game - A simple number guessing game (Refactored with modular components)
import React, { useState, useEffect } from 'react';
import GameHeader from '../components/GameHeader';
import GameFeedback from '../components/GameFeedback';
import GuessHistory from '../components/GuessHistory';
import { createInitialGameState, updateGameState } from './gameLogic';

const TangoGame = () => {
    const [gameState, setGameState] = useState(createInitialGameState());

    const initializeGame = () => {
        setGameState(createInitialGameState());
    };

    const handleGuess = () => {
        const newState = updateGameState(gameState, gameState.currentGuess);
        setGameState(newState);
    };

    const handleInputChange = (e) => {
        setGameState({
            ...gameState,
            currentGuess: e.target.value
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && gameState.gameStatus === 'playing') {
            handleGuess();
        }
    };

    // Initialize game on component mount
    useEffect(() => {
        initializeGame();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* Game Header */}
                    <GameHeader
                        title="Tango"
                        subtitle="The Number Guessing Game"
                        icon="🎯"
                        score={gameState.score}
                        attempts={gameState.attempts}
                        maxAttempts={gameState.maxAttempts}
                    />

                    {/* Game Area */}
                    <div className="card shadow-lg">
                        <div className="card-body p-4">
                            {/* Feedback */}
                            <GameFeedback 
                                message={gameState.feedback} 
                                gameStatus={gameState.gameStatus} 
                            />

                            {/* Input Area */}
                            {gameState.gameStatus === 'playing' && (
                                <div className="row mb-4">
                                    <div className="col-md-8">
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your guess (1-100)"
                                            value={gameState.currentGuess}
                                            onChange={handleInputChange}
                                            onKeyPress={handleKeyPress}
                                            min="1"
                                            max="100"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <button
                                            className="btn btn-primary btn-lg w-100"
                                            onClick={handleGuess}
                                            disabled={!gameState.currentGuess}
                                        >
                                            Guess!
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Game Over Actions */}
                            {gameState.gameStatus !== 'playing' && (
                                <div className="text-center mb-4">
                                    <button
                                        className="btn btn-success btn-lg"
                                        onClick={initializeGame}
                                    >
                                        🎮 Play Again
                                    </button>
                                </div>
                            )}

                            {/* Guess History */}
                            <GuessHistory 
                                history={gameState.guessHistory} 
                                targetNumber={gameState.targetNumber}
                            />
                        </div>
                    </div>

                    {/* Game Rules */}
                    <div className="card mt-4">
                        <div className="card-header">
                            <h5 className="mb-0">🎯 How to Play</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled mb-0">
                                <li>• Guess the secret number between 1 and 100</li>
                                <li>• You have {gameState.maxAttempts} attempts to find it</li>
                                <li>• Get hints after each guess (too high/too low)</li>
                                <li>• Score points based on how quickly you guess</li>
                                <li>• Press Enter or click Guess to submit</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TangoGame;
