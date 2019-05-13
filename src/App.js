import React from 'react';
import { connect } from 'react-redux';

import './App.css';

export const Thumbnail = ({ card: { title, id } }) => <img src={`https://picsum.photos/150/150?grayscale&${id}`} alt={title} />;

export const Card = ({ card, displayImageId, displayImage }) => {
    const isDisplayImage = displayImageId === card.id;
    return (
        <div className={`card${isDisplayImage ? ' displayed' : ''}`} onClick={() => displayImage(card)}>
            <div className="title">{card.title}</div>
            {isDisplayImage ? <img src={card.url} alt={card.title} /> : <Thumbnail card={card} />}
        </div>
    );
};

export const App = ({ cards, displayImageId, loading, fetchImages, displayImage }) => {
    return (
        <>
            <div className="App">
                {cards.map(card => {
                    return (
                        <Card key={card.id} card={card} displayImage={displayImage} displayImageId={displayImageId} />
                    );
                })}
            </div>
            {loading && <h1>Loading.......</h1>}
        </>
    );
};

const mapStateToProps = ({ cards, displayImageId, loading, fetchImages, displayImage }) => ({
    cards,
    displayImageId,
    loading,
    fetchImages,
    displayImage,
});

const mapDispatchToProps = dispatch => ({
    fetchImages: () => dispatch({ type: 'FETCH_IMAGES' }),
    displayImage: ({ id }) => dispatch({ type: 'DISPLAY_IMAGE', id }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
