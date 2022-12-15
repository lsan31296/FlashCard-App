import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { updateCard } from "../utils/api";
import { useHistory } from "react-router-dom";
import CardForm from "../CardForm";

//responsible for rendering Edit Card Form
function EditCardForm({ card, setCard, deckId }) {
    const [error, setError] = useState(undefined);
    const [formData, setFormData] = useState({...card});
    const history = useHistory();

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        updateCard(formData).then(setCard).catch(setError).then(history.push(`/decks/${deckId}`));
    };
    
    if(error) {
        <ErrorMessage error={error} />
    }

    return (
        <div className="container mb-2">
            <h1>Edit Card</h1>
            <CardForm handleSubmit={handleSubmit} handleChange={handleChange} deckId={deckId} formData={formData} />
        </div>
    );
}
export default EditCardForm;