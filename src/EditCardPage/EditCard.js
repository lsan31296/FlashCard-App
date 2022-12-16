import { useState, useEffect } from 'react';
//import EditCardForm from './EditCardForm';
import EditCardNav from './EditCardNav';
import { readCard, readDeck, updateCard } from '../utils/api';
import ErrorMessage from '../ErrorMessage';
import { useHistory, useParams } from "react-router-dom";
import CardForm from '../CardForm';

//responsible for rendering the Edit Card Page
function EditCard() {
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState(null);
    const [error, setError] = useState(undefined);
    const { deckId, cardId } = useParams();
    const [formData, setFormData] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
        readCard(cardId, abortController.signal).then(setCard).catch(setError);
        return () => abortController.abort();
    }, [deckId, cardId]);

    useEffect(() => {
        setFormData(card);
    }, [card]);

    console.log(formData);
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        updateCard(formData).then(setCard).catch(setError).then(history.push(`/decks/${deckId}`));
    };

    if (error) {
        <ErrorMessage error={error} />
    }
    if(!deck || !card || !formData) {
        return <h2>Loading...</h2>
    } else {
        return (
            <div>
                <EditCardNav card={card} deck={deck} deckId={deckId} />
                <div className='container mb-2'>
                    <h1>Edit Card</h1>
                    <CardForm handleSubmit={handleSubmit} handleChange={handleChange} deckId={deckId} formData={formData}/>
                </div>
            </div>
        );
    }
}
export default EditCard;