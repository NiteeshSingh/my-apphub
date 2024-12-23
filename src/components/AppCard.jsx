import React from 'react';
import { Link } from 'react-router-dom';

const AppCard = ({ image, title, summary, link }) => {
    return (
        <div className="card h-100" style={styles.card}>
            <img
                src={image}
                className="card-img-top"
                alt={title}
                style={styles.cardImgTop}
            />
            <div className="card-body" style={styles.cardBody}>
                <h5 className="card-title" style={styles.cardTitle}>{title}</h5>
                <p className="card-text" style={styles.cardText}>{summary}</p>
                <Link to={link} className="btn btn-primary" style={styles.btn}>
                    View App
                </Link>
            </div>
        </div>
    );
};

const styles = {
    card: {
        width: '300px', /* You can adjust this size based on the layout */
        height: 'auto',
        margin: '10px',
        border: '1px solid #ddd', /* Border around the card */
        borderRadius: '8px',      /* Rounded corners */
        overflow: 'hidden',       /* Ensures image doesn't overflow card */
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardImgTop: {
        width: '100%',            /* Make image fill the width of the card */
        height: '150px',          /* Fixed height for the image */
        objectFit: 'cover',       /* Ensures the image covers the area without stretching */
    },
    cardBody: {
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: '14px',
        color: '#666',
    },
    btn: {
        alignSelf: 'flex-start',
        marginTop: '10px',
    },
};

export default AppCard;
