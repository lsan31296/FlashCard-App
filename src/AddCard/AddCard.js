import AddCardNav from "./AddCardNav";
import { createCard, readDeck } from '../utils/api/index';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import CardForm from "../CardForm";
//Solely responsible for adding a new card to an already existing deck
//Routes to '/decks/:deckId/cards/new'
function AddCard() {
    const [deck, setDeck] = useState(null);
    const { deckId } = useParams();
    const [error, setError] = useState(undefined);
    const initialFormState = { front: "", back: "" };
    const [formData, setFormData] = useState({...initialFormState});
    
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
        return () => abortController.abort();
    }, [deckId]);

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        createCard(deckId, formData).then(setFormData({...initialFormState})).catch(setError);
    };

    if(error) {
        <ErrorMessage error={error} />
    }

    if(!deck) {
        return <h2>Loading...</h2>;
    } else {
        return (
            <div>
                <AddCardNav deck={deck} />
                <div className="container mb-2">
                    <h3>{deck.name}: Add Card</h3>
                    <CardForm handleChange={handleChange} handleSubmit={handleSubmit} deckId={deckId} formData={formData} />
                </div>
            </div>
        );
    }
    
}
export default AddCard;