import React from 'react';

const GameStats = ({ gameState, gameHistory, config }) => {
    const {
        totalScore,
        gamesPlayed,
        gamesWon,
        bestScore,
        currentStreak,
        bestStreak,
        attempts,
        maxAttempts,
        gameStatus
    } = gameState;

    const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;
    const averageScore = gamesWon > 0 ? Math.round(totalScore / gamesWon) : 0;

    const getStreakColor = () => {
        if (currentStreak >= 5) return 'text-success';
        if (currentStreak >= 3) return 'text-warning';
        return 'text-muted';
    };

    const getAttemptsColor = () => {
        const percentage = (attempts / maxAttempts) * 100;
        if (percentage < 50) return 'text-success';
        if (percentage < 80) return 'text-warning';
        return 'text-danger';
    };

    return (
        <div className="sticky-top" style={{ top: '20px' }}>
            {/* Current Game Stats */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">
                        <i className="fas fa-gamepad me-2"></i>
                        Current Game
                    </h6>
                </div>
                <div className="card-body">
                    <div className="row g-3 text-center">
                        <div className="col-6">
                            <div className={`h4 mb-1 ${getAttemptsColor()}`}>
                                {attempts}
                            </div>
                            <small className="text-muted">Attempts</small>
                        </div>
                        <div className="col-6">
                            <div className="h4 mb-1 text-info">
                                {maxAttempts - attempts}
                            </div>
                            <small className="text-muted">Remaining</small>
                        </div>
                    </div>
                    
                    {gameStatus !== 'playing' && (
                        <div className="text-center mt-3">
                            <div className="badge bg-success fs-6 px-3 py-2">
                                {gameState.score} points
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Overall Statistics */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-info text-white">
                    <h6 className="mb-0">
                        <i className="fas fa-chart-bar me-2"></i>
                        Statistics
                    </h6>
                </div>
                <div className="card-body">
                    <div className="row g-3 text-center">
                        <div className="col-6">
                            <div className="h5 mb-1 text-primary">{gamesPlayed}</div>
                            <small className="text-muted">Games Played</small>
                        </div>
                        <div className="col-6">
                            <div className="h5 mb-1 text-success">{gamesWon}</div>
                            <small className="text-muted">Games Won</small>
                        </div>
                        <div className="col-6">
                            <div className="h5 mb-1 text-warning">{winRate}%</div>
                            <small className="text-muted">Win Rate</small>
                        </div>
                        <div className="col-6">
                            <div className="h5 mb-1 text-info">{averageScore}</div>
                            <small className="text-muted">Avg Score</small>
                        </div>
                    </div>

                    <hr className="my-3" />

                    <div className="row g-3 text-center">
                        <div className="col-6">
                            <div className="h6 mb-1 text-success">{bestScore}</div>
                            <small className="text-muted">Best Score</small>
                        </div>
                        <div className="col-6">
                            <div className="h6 mb-1 text-warning">{totalScore}</div>
                            <small className="text-muted">Total Score</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Streak Information */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-warning text-dark">
                    <h6 className="mb-0">
                        <i className="fas fa-fire me-2"></i>
                        Streaks
                    </h6>
                </div>
                <div className="card-body">
                    <div className="row g-3 text-center">
                        <div className="col-6">
                            <div className={`h5 mb-1 ${getStreakColor()}`}>
                                {currentStreak}
                            </div>
                            <small className="text-muted">Current</small>
                        </div>
                        <div className="col-6">
                            <div className="h5 mb-1 text-danger">{bestStreak}</div>
                            <small className="text-muted">Best</small>
                        </div>
                    </div>
                    
                    {currentStreak >= 3 && (
                        <div className="text-center mt-2">
                            <span className="badge bg-warning text-dark">
                                🔥 On Fire!
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Games History */}
            {gameHistory.length > 0 && (
                <div className="card shadow-sm">
                    <div className="card-header bg-secondary text-white">
                        <h6 className="mb-0">
                            <i className="fas fa-history me-2"></i>
                            Recent Games
                        </h6>
                    </div>
                    <div className="card-body p-2">
                        <div className="list-group list-group-flush">
                            {gameHistory.slice(-5).reverse().map((game, index) => (
                                <div 
                                    key={game.id} 
                                    className="list-group-item list-group-item-action p-2 border-0"
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <span className={`badge ${game.won ? 'bg-success' : 'bg-danger'} me-2`}>
                                                {game.won ? '✓' : '✗'}
                                            </span>
                                            <small className="text-muted">
                                                {game.attempts} attempts
                                            </small>
                                        </div>
                                        <div className="text-end">
                                            <div className="fw-bold text-primary">
                                                {game.score}
                                            </div>
                                            <small className="text-muted">
                                                {game.date}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Achievement Hints */}
            <div className="card shadow-sm mt-4">
                <div className="card-header bg-success text-white">
                    <h6 className="mb-0">
                        <i className="fas fa-trophy me-2"></i>
                        Next Goals
                    </h6>
                </div>
                <div className="card-body p-3">
                    <div className="small">
                        {gamesWon === 0 && (
                            <div className="mb-2">
                                🏆 Win your first game!
                            </div>
                        )}
                        {bestScore < 200 && (
                            <div className="mb-2">
                                ⭐ Score 200+ points in a game
                            </div>
                        )}
                        {currentStreak < 5 && (
                            <div className="mb-2">
                                🔥 Win 5 games in a row
                            </div>
                        )}
                        {gamesWon > 0 && bestScore >= 200 && currentStreak >= 5 && (
                            <div className="text-success">
                                🎉 You're a Tango Master!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameStats; 