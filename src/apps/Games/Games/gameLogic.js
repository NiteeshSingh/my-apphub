// Game Logic Utilities
// This file contains reusable game logic functions

export const generateRandomNumber = (min = 1, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const calculateScore = (attempts, maxAttempts, baseScore = 100) => {
    return Math.max(0, baseScore - (attempts - 1) * 10);
};

export const validateGuess = (guess, min = 1, max = 100) => {
    const num = parseInt(guess);
    if (isNaN(num)) {
        return { valid: false, message: 'Please enter a valid number' };
    }
    if (num < min || num > max) {
        return { valid: false, message: `Please enter a number between ${min} and ${max}` };
    }
    return { valid: true, number: num };
};

export const getHint = (guess, target) => {
    if (guess < target) {
        return 'Too low! Try higher.';
    } else if (guess > target) {
        return 'Too high! Try lower.';
    }
    return 'Perfect!';
};

export const getGameStatus = (guess, target, attempts, maxAttempts) => {
    if (guess === target) {
        return 'won';
    } else if (attempts >= maxAttempts) {
        return 'lost';
    }
    return 'playing';
};

// Game state management
export const createInitialGameState = () => ({
    targetNumber: generateRandomNumber(),
    currentGuess: '',
    attempts: 0,
    maxAttempts: 7,
    gameStatus: 'playing',
    feedback: 'Guess a number between 1 and 100!',
    guessHistory: [],
    score: 0
});

export const updateGameState = (currentState, guess) => {
    const validation = validateGuess(guess);
    
    if (!validation.valid) {
        return {
            ...currentState,
            feedback: validation.message
        };
    }

    const newAttempts = currentState.attempts + 1;
    const newHistory = [...currentState.guessHistory, { 
        guess: validation.number, 
        attempt: newAttempts 
    }];

    const gameStatus = getGameStatus(
        validation.number, 
        currentState.targetNumber, 
        newAttempts, 
        currentState.maxAttempts
    );

    let feedback = '';
    let newScore = currentState.score;

    if (gameStatus === 'won') {
        feedback = `🎉 Congratulations! You guessed it in ${newAttempts} attempts!`;
        newScore += calculateScore(newAttempts, currentState.maxAttempts);
    } else if (gameStatus === 'lost') {
        feedback = `😞 Game Over! The number was ${currentState.targetNumber}`;
    } else {
        const hint = getHint(validation.number, currentState.targetNumber);
        const remaining = currentState.maxAttempts - newAttempts;
        feedback = `${hint} (${remaining} attempts left)`;
    }

    return {
        ...currentState,
        attempts: newAttempts,
        guessHistory: newHistory,
        gameStatus,
        feedback,
        score: newScore,
        currentGuess: ''
    };
}; 