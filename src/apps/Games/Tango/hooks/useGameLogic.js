// Custom hook for Tango game logic
import { useState, useCallback, useEffect } from 'react';
import { GAME_CONFIG, calculateScore, getRandomNumber, validateGuess } from '../config/gameConfig';

const createInitialState = () => ({
    targetNumber: getRandomNumber(),
    currentGuess: '',
    attempts: 0,
    maxAttempts: GAME_CONFIG.MAX_ATTEMPTS,
    gameStatus: 'playing', // 'playing', 'won', 'lost'
    feedback: GAME_CONFIG.MESSAGES.WELCOME,
    guessHistory: [],
    score: 0,
    totalScore: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    bestScore: 0,
    currentStreak: 0,
    bestStreak: 0,
    difficulty: 'MEDIUM',
    hintsEnabled: true,
    lastGuessTime: null
});

export const useGameLogic = () => {
    const [gameState, setGameState] = useState(createInitialState());

    // Initialize game
    const initializeGame = useCallback(() => {
        setGameState(prev => ({
            ...createInitialState(),
            totalScore: prev.totalScore,
            gamesPlayed: prev.gamesPlayed,
            gamesWon: prev.gamesWon,
            bestScore: prev.bestScore,
            currentStreak: prev.currentStreak,
            bestStreak: prev.bestStreak,
            difficulty: prev.difficulty,
            hintsEnabled: prev.hintsEnabled
        }));
    }, []);

    // Reset entire game (including stats)
    const resetGame = useCallback(() => {
        setGameState(createInitialState());
    }, []);

    // Update current guess
    const updateCurrentGuess = useCallback((value) => {
        if (gameState.gameStatus === 'playing') {
            setGameState(prev => ({
                ...prev,
                currentGuess: value
            }));
        }
    }, [gameState.gameStatus]);

    // Validate guess
    const isValidGuess = useCallback((guess) => {
        const validation = validateGuess(guess);
        if (!validation.valid) {
            setGameState(prev => ({
                ...prev,
                feedback: validation.message
            }));
            return false;
        }

        // Check for duplicate guess
        const isDuplicate = gameState.guessHistory.some(
            entry => entry.guess === validation.number
        );
        
        if (isDuplicate) {
            setGameState(prev => ({
                ...prev,
                feedback: GAME_CONFIG.MESSAGES.DUPLICATE_GUESS
            }));
            return false;
        }

        return true;
    }, [gameState.guessHistory]);

    // Make a guess
    const makeGuess = useCallback((guess) => {
        const validation = validateGuess(guess);
        if (!validation.valid) {
            return gameState;
        }

        const guessNumber = validation.number;
        const newAttempts = gameState.attempts + 1;
        const isCorrect = guessNumber === gameState.targetNumber;
        const isGameOver = isCorrect || newAttempts >= gameState.maxAttempts;

        // Create guess entry
        const guessEntry = {
            guess: guessNumber,
            attempt: newAttempts,
            timestamp: Date.now(),
            isCorrect
        };

        let newGameStatus = gameState.gameStatus;
        let feedback = '';
        let newScore = gameState.score;
        let newTotalScore = gameState.totalScore;
        let newGamesPlayed = gameState.gamesPlayed;
        let newGamesWon = gameState.gamesWon;
        let newBestScore = gameState.bestScore;
        let newCurrentStreak = gameState.currentStreak;
        let newBestStreak = gameState.bestStreak;

        if (isCorrect) {
            // Player won
            newGameStatus = 'won';
            newScore = calculateScore(newAttempts, gameState.maxAttempts);
            newTotalScore += newScore;
            newGamesPlayed += 1;
            newGamesWon += 1;
            newCurrentStreak += 1;
            newBestScore = Math.max(newBestScore, newScore);
            newBestStreak = Math.max(newBestStreak, newCurrentStreak);
            
            feedback = `${GAME_CONFIG.MESSAGES.WIN} Score: ${newScore} points!`;
        } else if (newAttempts >= gameState.maxAttempts) {
            // Player lost
            newGameStatus = 'lost';
            newGamesPlayed += 1;
            newCurrentStreak = 0;
            feedback = `${GAME_CONFIG.MESSAGES.LOSE} The number was ${gameState.targetNumber}.`;
        } else {
            // Game continues
            const hint = guessNumber < gameState.targetNumber 
                ? GAME_CONFIG.MESSAGES.TOO_LOW 
                : GAME_CONFIG.MESSAGES.TOO_HIGH;
            const attemptsLeft = gameState.maxAttempts - newAttempts;
            feedback = `${hint} ${GAME_CONFIG.MESSAGES.ATTEMPTS_LEFT(attemptsLeft)}.`;
        }

        const newState = {
            ...gameState,
            attempts: newAttempts,
            gameStatus: newGameStatus,
            feedback,
            guessHistory: [...gameState.guessHistory, guessEntry],
            currentGuess: '',
            score: newScore,
            totalScore: newTotalScore,
            gamesPlayed: newGamesPlayed,
            gamesWon: newGamesWon,
            bestScore: newBestScore,
            currentStreak: newCurrentStreak,
            bestStreak: newBestStreak,
            lastGuessTime: Date.now()
        };

        setGameState(newState);
        return newState;
    }, [gameState]);

    // Get hint for current game state
    const getHint = useCallback(() => {
        if (!gameState.hintsEnabled || gameState.gameStatus !== 'playing') {
            return null;
        }

        const { guessHistory, targetNumber } = gameState;
        if (guessHistory.length === 0) {
            return null;
        }

        const lastGuess = guessHistory[guessHistory.length - 1];
        const difference = Math.abs(lastGuess.guess - targetNumber);

        if (difference <= 5) {
            return { type: 'hot', message: '🔥 Very Hot! You\'re very close!' };
        } else if (difference <= 10) {
            return { type: 'warm', message: '🌡️ Warm! Getting closer!' };
        } else if (difference <= 20) {
            return { type: 'cool', message: '❄️ Cool. You\'re somewhat close.' };
        } else {
            return { type: 'cold', message: '🧊 Cold! You\'re far away.' };
        }
    }, [gameState.hintsEnabled, gameState.gameStatus, gameState.guessHistory, gameState.targetNumber]);

    // Change difficulty
    const changeDifficulty = useCallback((difficulty) => {
        const difficultyConfig = GAME_CONFIG.DIFFICULTY_LEVELS[difficulty];
        if (!difficultyConfig) return;

        setGameState(prev => ({
            ...prev,
            difficulty,
            maxAttempts: difficultyConfig.maxAttempts,
            hintsEnabled: difficultyConfig.hints
        }));
    }, []);

    // Toggle hints
    const toggleHints = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            hintsEnabled: !prev.hintsEnabled
        }));
    }, []);

    // Get game statistics
    const getGameStats = useCallback(() => {
        const winRate = gameState.gamesPlayed > 0 
            ? Math.round((gameState.gamesWon / gameState.gamesPlayed) * 100) 
            : 0;
        
        const averageScore = gameState.gamesWon > 0 
            ? Math.round(gameState.totalScore / gameState.gamesWon) 
            : 0;

        return {
            gamesPlayed: gameState.gamesPlayed,
            gamesWon: gameState.gamesWon,
            winRate,
            totalScore: gameState.totalScore,
            averageScore,
            bestScore: gameState.bestScore,
            currentStreak: gameState.currentStreak,
            bestStreak: gameState.bestStreak
        };
    }, [gameState]);

    // Auto-save game state to localStorage
    useEffect(() => {
        const saveData = {
            totalScore: gameState.totalScore,
            gamesPlayed: gameState.gamesPlayed,
            gamesWon: gameState.gamesWon,
            bestScore: gameState.bestScore,
            bestStreak: gameState.bestStreak,
            difficulty: gameState.difficulty,
            hintsEnabled: gameState.hintsEnabled
        };
        localStorage.setItem('tangoGameData', JSON.stringify(saveData));
    }, [gameState.totalScore, gameState.gamesPlayed, gameState.gamesWon, 
        gameState.bestScore, gameState.bestStreak, gameState.difficulty, gameState.hintsEnabled]);

    // Load saved data on mount
    useEffect(() => {
        const savedData = localStorage.getItem('tangoGameData');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setGameState(prev => ({
                    ...prev,
                    ...parsed
                }));
            } catch (error) {
                console.warn('Failed to load saved game data:', error);
            }
        }
    }, []);

    return {
        gameState,
        initializeGame,
        resetGame,
        makeGuess,
        updateCurrentGuess,
        isValidGuess,
        getHint,
        changeDifficulty,
        toggleHints,
        getGameStats
    };
}; 