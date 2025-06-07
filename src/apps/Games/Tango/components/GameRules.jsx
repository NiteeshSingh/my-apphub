import React from 'react';

const GameRules = ({ onClose, config }) => {
    return (
        <div 
            className="modal d-block" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
        >
            <div 
                className="modal-dialog modal-lg modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                            <i className="fas fa-book me-2"></i>
                            🎯 Tango Game Rules
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={onClose}
                        ></button>
                    </div>
                    
                    <div className="modal-body">
                        {/* Objective */}
                        <div className="mb-4">
                            <h6 className="text-primary">
                                <i className="fas fa-bullseye me-2"></i>
                                Objective
                            </h6>
                            <p className="mb-0">
                                Guess the secret number between <strong>{config.MIN_NUMBER}</strong> and <strong>{config.MAX_NUMBER}</strong> 
                                in as few attempts as possible to maximize your score!
                            </p>
                        </div>

                        {/* How to Play */}
                        <div className="mb-4">
                            <h6 className="text-primary">
                                <i className="fas fa-play me-2"></i>
                                How to Play
                            </h6>
                            <ol className="mb-0">
                                <li>Enter a number between {config.MIN_NUMBER} and {config.MAX_NUMBER}</li>
                                <li>Click "Guess!" or press Enter to submit your guess</li>
                                <li>Get feedback: "Too high" or "Too low"</li>
                                <li>Use the hints to narrow down your next guess</li>
                                <li>Find the number before running out of attempts!</li>
                            </ol>
                        </div>

                        {/* Scoring System */}
                        <div className="mb-4">
                            <h6 className="text-primary">
                                <i className="fas fa-star me-2"></i>
                                Scoring System
                            </h6>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-unstyled">
                                        <li><strong>Base Score:</strong> {config.BASE_SCORE} points</li>
                                        <li><strong>Penalty:</strong> -{config.SCORE_PENALTY_PER_ATTEMPT} per extra attempt</li>
                                        <li><strong>Bonus Multipliers:</strong></li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <div className="small">
                                        {Object.entries(config.BONUS_MULTIPLIERS).map(([attempts, multiplier]) => (
                                            <div key={attempts} className="d-flex justify-content-between">
                                                <span>{attempts} attempt{attempts > 1 ? 's' : ''}:</span>
                                                <span className="fw-bold">×{multiplier}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Game Features */}
                        <div className="mb-4">
                            <h6 className="text-primary">
                                <i className="fas fa-magic me-2"></i>
                                Game Features
                            </h6>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-unstyled">
                                        <li>🔥 <strong>Heat Hints:</strong> Get "hot/cold" feedback</li>
                                        <li>📊 <strong>Visual Range:</strong> See your guesses on a number line</li>
                                        <li>📈 <strong>Statistics:</strong> Track your progress over time</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-unstyled">
                                        <li>🏆 <strong>Achievements:</strong> Unlock goals and milestones</li>
                                        <li>🔥 <strong>Streaks:</strong> Win consecutive games</li>
                                        <li>💾 <strong>Auto-Save:</strong> Your progress is saved automatically</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Keyboard Shortcuts */}
                        <div className="mb-4">
                            <h6 className="text-primary">
                                <i className="fas fa-keyboard me-2"></i>
                                Keyboard Shortcuts
                            </h6>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span><kbd>Enter</kbd></span>
                                        <span>Submit guess</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span><kbd>Esc</kbd></span>
                                        <span>Close rules</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span><kbd>1-9</kbd></span>
                                        <span>Number input</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span><kbd>Backspace</kbd></span>
                                        <span>Clear input</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tips & Strategy */}
                        <div className="mb-4">
                            <h6 className="text-primary">
                                <i className="fas fa-lightbulb me-2"></i>
                                Tips & Strategy
                            </h6>
                            <div className="alert alert-info">
                                <ul className="mb-0">
                                    <li><strong>Binary Search:</strong> Start with 50, then eliminate half the range each time</li>
                                    <li><strong>Use Heat Hints:</strong> Pay attention to "hot/cold" feedback for fine-tuning</li>
                                    <li><strong>Quick Numbers:</strong> Use the quick number buttons for common starting points</li>
                                    <li><strong>Visual Range:</strong> Watch the number line to see your guess patterns</li>
                                    <li><strong>Perfect Score:</strong> Guess correctly in 1 attempt for maximum points!</li>
                                </ul>
                            </div>
                        </div>

                        {/* Difficulty Levels */}
                        <div className="mb-0">
                            <h6 className="text-primary">
                                <i className="fas fa-layer-group me-2"></i>
                                Difficulty Levels
                            </h6>
                            <div className="row">
                                {Object.entries(config.DIFFICULTY_LEVELS).map(([key, level]) => (
                                    <div key={key} className="col-md-4 mb-3">
                                        <div className={`card border-${level.color}`}>
                                            <div className="card-body p-3">
                                                <h6 className={`card-title text-${level.color} mb-2`}>
                                                    {level.name}
                                                </h6>
                                                <div className="small">
                                                    <div>Range: {level.range.min}-{level.range.max}</div>
                                                    <div>Attempts: {level.maxAttempts}</div>
                                                    <div>Hints: {level.hints ? 'Yes' : 'No'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={onClose}
                        >
                            <i className="fas fa-play me-2"></i>
                            Let's Play!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameRules; 