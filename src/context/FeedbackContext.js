import {createContext, useState, useEffect} from 'react';

const FeedbackContext = createContext();

// const isDevelopment = process.env.NODE_ENV === 'development';
//
// let API_URL = '';
//
// if (isDevelopment) {
//     API_URL = 'http://localhost:5000';
// } else {
//     API_URL = 'https://react-feedback-app.onrender.com';
// }

const API_URL = 'http://localhost:5000';

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    //Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`${API_URL}/feedback?_sort=id&_order=desc`);
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
    };

    //Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch(`${API_URL}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        });

        const data = await response.json();
        setFeedback([data, ...feedback]);
    };

    //Delete feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            await fetch(`${API_URL}/feedback/${id}`, {method: 'DELETE'});
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    //Update feedback item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`${API_URL}/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        });
        const data = await response.json();
        setFeedback(feedback.map((item) => (item.id === id ? {...item, ...data} : item))
        );
    };

    //Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        });
    };

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>;
};

export default FeedbackContext;