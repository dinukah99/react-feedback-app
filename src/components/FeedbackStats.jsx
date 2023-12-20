import {useContext} from 'react';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackStats = () => {
    const {feedback} = useContext(FeedbackContext);

    //Calculate ratings average
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating;
    }, 0) / feedback.length;

    average = average.toFixed(1).replace(/[.,]0$/, '');
    const reviewText = feedback.length === 1 ? 'Review' : 'Reviews';
    return (
        <div className="feedback-stats">
            <h4>{feedback.length} {reviewText}</h4>
            <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    );
};

export default FeedbackStats;