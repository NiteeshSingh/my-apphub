// Custom hook for managing game state
import { useState, useCallback } from 'react';
import { createInitialGameState, updateGameState } from '../Games/gameLogic';

export const useGameState = (initialState = null) => {
    const [gameState, setGameState] = useState(
        initialState || createInitialGameState()
    );

    const initializeGame = useCallback(() => {
        setGameState(initialState || createInitialGameState());
    }, [initialState]);

    const makeGuess = useCallback((guess) => {
        const newState = updateGameState(gameState, guess);
        setGameState(newState);
        return newState;
    }, [gameState]);

    const updateInput = useCallback((value) => {
        setGameState(prevState => ({
            ...prevState,
            currentGuess: value
        }));
    }, []);

    const resetGame = useCallback(() => {
        initializeGame();
    }, [initializeGame]);

    return {
        gameState,
        initializeGame,
        makeGuess,
        updateInput,
        resetGame,
        // Computed values for convenience
        isPlaying: gameState.gameStatus === 'playing',
        isGameOver: gameState.gameStatus !== 'playing',
        hasWon: gameState.gameStatus === 'won',
        hasLost: gameState.gameStatus === 'lost'
    };
}; 