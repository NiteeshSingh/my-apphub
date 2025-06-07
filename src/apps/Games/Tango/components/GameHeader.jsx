import React from 'react';

const GameHeader = ({ title, subtitle, onShowRules }) => {
    return (
        <div className="text-center mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="flex-grow-1">
                    <h1 className="display-4 text-primary mb-2" style={{ fontWeight: 'bold' }}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="lead text-muted mb-0">{subtitle}</p>
                    )}
                </div>
                <div>
                    <button
                        className="btn btn-outline-info btn-sm"
                        onClick={onShowRules}
                        title="Show game rules"
                    >
                        <i className="fas fa-question-circle me-1"></i>
                        Rules
                    </button>
                </div>
            </div>
            
            {/* Decorative divider */}
            <div className="d-flex justify-content-center mb-3">
                <div 
                    className="bg-primary" 
                    style={{ 
                        height: '3px', 
                        width: '100px', 
                        borderRadius: '2px' 
                    }}
                ></div>
            </div>
        </div>
    );
};

export default GameHeader; 