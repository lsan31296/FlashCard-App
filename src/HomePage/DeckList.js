//this componenent should solely be responsible for showing the list of decks

import { listDecks } from "../utils/api";
import { useState, useEffect } from "react";
import DeckView from "./DeckView";
import ErrorMessage from "../ErrorMessage";

function DeckList() {
    const [decks, setDecks] = useState(null);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setDecks).catch(setError);
        return () => abortController.abort();
    }, []);

    if (error) {
        return <ErrorMessage error={error}/>
    }
    if(!decks) {
        return <h2>Loading...</h2>;
    } else {
        const list = decks.map((deck) => <DeckView key={deck.id} deck={deck} />)

        return (
            <div className="container mb-2">
                <a className="btn btn-secondary my-1" href="/decks/new">+ Create Deck</a>
                <div> {list} </div>
            </div>
        );    
    }
    
}
export default DeckList;