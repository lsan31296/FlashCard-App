import { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage";
import { readDeck, createCard } from "../utils/api";
import CardForm from "../CardForm";


//responsible for setting header and form portion of adding new card to existing deck
function AddCardForm({deck, deckId}) {
    const [currentDeck, setCurrentDeck] = useState({...deck});
    const initialFormState = { front: "", back: "", deckId: deck.id};
    const [formData, setFormData] = useState({...initialFormState});
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setCurrentDeck).catch(setError);
        return () => abortController.abort();
    }, [deckId]);

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createCard(deck.id, formData).then(setFormData({...initialFormState})).catch(setError);
    };

    if (error) {
        <ErrorMessage error={error} />
    }
    //console.log("CurrentDeck", currentDeck);

    return (
        <div className="container mb-2">
            <h3> {deck.name}: Add Card</h3>
            <CardForm handleSubmit={handleSubmit} handleChange={handleChange} deckId={deckId} formData={formData} />
        </div>
    );
}
export default AddCardForm;