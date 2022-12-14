//this component solely responsible for displaying the deck with a deiscription and three buttons, view, study, delete

import { deleteDeck } from "../utils/api";
import { useHistory } from "react-router-dom";

function DeckView({ deck = { cards: [] } }) {
    const history = useHistory();

    const handleDelete = async (deckId) => {
        if (window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
            await deleteDeck(deck.id);
        }
        history.push("/");
    }; 

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <h6 className="card-subtitle text-muted">{deck.cards.length} cards</h6>
                <p className="card-text">{deck.description}</p>
                <a className="btn btn-secondary mx-1" href={`/decks/${deck.id}`}>View</a> 
                <a className="btn btn-primary mx-1" href={`/decks/${deck.id}/study`}>Study</a>
                <button className="btn btn-danger mx-1" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}
export default DeckView;
//hrefs need to be updated