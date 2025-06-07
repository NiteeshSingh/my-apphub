// Tango Game - A Number Guessing Game
import React, { useState, useEffect } from 'react';
import GameHeader from './components/GameHeader';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import GameStats from './components/GameStats';
import GameRules from './components/GameRules';
import { useGameLogic } from './hooks/useGameLogic';
import { GAME_CONFIG } from './config/gameConfig';

const TangoGame = () => {
    const {
        gameState,
        makeGuess,
        resetGame,
        updateCurrentGuess,
        getHint,
        isValidGuess
    } = useGameLogic();

    const [showRules, setShowRules] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);

    // Handle guess submission
    const handleGuess = () => {
        if (!isValidGuess(gameState.currentGuess)) {
            return;
        }

        const result = makeGuess(gameState.currentGuess);
        
        // Add to game history if game ended
        if (result.gameStatus !== 'playing') {
            setGameHistory(prev => [...prev, {
                id: Date.now(),
                attempts: result.attempts,
                won: result.gameStatus === 'won',
                score: result.score,
                date: new Date().toLocaleDateString()
            }]);
        }
    };

    // Handle keyboard input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && gameState.gameStatus === 'playing') {
            handleGuess();
        } else if (e.key === 'Escape') {
            setShowRules(false);
        }
    };

    // Add keyboard event listener
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [gameState.gameStatus, gameState.currentGuess]);

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8">
                    {/* Game Header */}
                    <GameHeader 
                        title="🎯 Tango"
                        subtitle="The Ultimate Number Guessing Challenge"
                        onShowRules={() => setShowRules(true)}
                    />

                    <div className="row g-4">
                        {/* Main Game Area */}
                        <div className="col-md-8">
                            <div className="card shadow-lg border-0">
                                <div className="card-body p-4">
                                    <GameBoard 
                                        gameState={gameState}
                                        onGuess={handleGuess}
                                        onInputChange={updateCurrentGuess}
                                        onReset={resetGame}
                                        hint={getHint()}
                                    />
                                </div>
                            </div>

                            {/* Game Controls */}
                            <div className="mt-4">
                                <GameControls 
                                    gameState={gameState}
                                    onGuess={handleGuess}
                                    onReset={resetGame}
                                    onInputChange={updateCurrentGuess}
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-md-4">
                            <GameStats 
                                gameState={gameState}
                                gameHistory={gameHistory}
                                config={GAME_CONFIG}
                            />
                        </div>
                    </div>

                    {/* Rules Modal */}
                    {showRules && (
                        <GameRules 
                            onClose={() => setShowRules(false)}
                            config={GAME_CONFIG}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TangoGame; 