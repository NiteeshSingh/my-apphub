// Game Configuration for Tango
export const GAME_CONFIG = {
    // Game Rules
    MIN_NUMBER: 1,
    MAX_NUMBER: 100,
    MAX_ATTEMPTS: 7,
    
    // Scoring System
    BASE_SCORE: 100,
    SCORE_PENALTY_PER_ATTEMPT: 10,
    BONUS_MULTIPLIERS: {
        1: 3.0,  // Perfect guess
        2: 2.5,  // Excellent
        3: 2.0,  // Great
        4: 1.5,  // Good
        5: 1.2,  // Okay
        6: 1.0,  // Close
        7: 0.8   // Last chance
    },
    
    // Difficulty Levels
    DIFFICULTY_LEVELS: {
        EASY: {
            name: 'Easy',
            maxAttempts: 10,
            range: { min: 1, max: 50 },
            hints: true,
            color: 'success'
        },
        MEDIUM: {
            name: 'Medium',
            maxAttempts: 7,
            range: { min: 1, max: 100 },
            hints: true,
            color: 'warning'
        },
        HARD: {
            name: 'Hard',
            maxAttempts: 5,
            range: { min: 1, max: 100 },
            hints: false,
            color: 'danger'
        }
    },
    
    // Game Messages
    MESSAGES: {
        WELCOME: 'Guess a number between 1 and 100!',
        TOO_HIGH: 'Too high! Try a lower number.',
        TOO_LOW: 'Too low! Try a higher number.',
        INVALID_INPUT: 'Please enter a valid number between 1 and 100.',
        DUPLICATE_GUESS: 'You already guessed that number!',
        WIN: '🎉 Congratulations! You found the number!',
        LOSE: '😞 Game Over! Better luck next time!',
        ATTEMPTS_LEFT: (count) => `${count} attempt${count !== 1 ? 's' : ''} remaining`
    },
    
    // UI Settings
    COLORS: {
        PRIMARY: '#007bff',
        SUCCESS: '#28a745',
        WARNING: '#ffc107',
        DANGER: '#dc3545',
        INFO: '#17a2b8',
        LIGHT: '#f8f9fa',
        DARK: '#343a40'
    },
    
    // Animation Settings
    ANIMATIONS: {
        GUESS_FEEDBACK_DURATION: 1000,
        SCORE_ANIMATION_DURATION: 2000,
        CONFETTI_DURATION: 3000
    },
    
    // Sound Settings (for future implementation)
    SOUNDS: {
        CORRECT_GUESS: '/sounds/success.mp3',
        WRONG_GUESS: '/sounds/error.mp3',
        GAME_WIN: '/sounds/victory.mp3',
        GAME_LOSE: '/sounds/defeat.mp3'
    },
    
    // Achievement System
    ACHIEVEMENTS: {
        FIRST_WIN: {
            id: 'first_win',
            name: 'First Victory',
            description: 'Win your first game',
            icon: '🏆'
        },
        PERFECT_GUESS: {
            id: 'perfect_guess',
            name: 'Mind Reader',
            description: 'Guess the number on first try',
            icon: '🧠'
        },
        STREAK_5: {
            id: 'streak_5',
            name: 'Hot Streak',
            description: 'Win 5 games in a row',
            icon: '🔥'
        },
        HIGH_SCORER: {
            id: 'high_scorer',
            name: 'High Scorer',
            description: 'Score over 200 points in a single game',
            icon: '⭐'
        }
    }
};

// Helper functions
export const calculateScore = (attempts, maxAttempts = GAME_CONFIG.MAX_ATTEMPTS) => {
    const baseScore = GAME_CONFIG.BASE_SCORE;
    const penalty = (attempts - 1) * GAME_CONFIG.SCORE_PENALTY_PER_ATTEMPT;
    const multiplier = GAME_CONFIG.BONUS_MULTIPLIERS[attempts] || 0.5;
    
    return Math.max(0, Math.floor((baseScore - penalty) * multiplier));
};

export const getRandomNumber = (min = GAME_CONFIG.MIN_NUMBER, max = GAME_CONFIG.MAX_NUMBER) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const validateGuess = (guess, min = GAME_CONFIG.MIN_NUMBER, max = GAME_CONFIG.MAX_NUMBER) => {
    const num = parseInt(guess);
    
    if (isNaN(num)) {
        return { valid: false, message: 'Please enter a valid number' };
    }
    
    if (num < min || num > max) {
        return { valid: false, message: `Number must be between ${min} and ${max}` };
    }
    
    return { valid: true, number: num };
}; 