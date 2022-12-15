import { deleteDeck } from "../utils/api/index";
import CardView from "./CardView";
import { useRouteMatch } from "react-router-dom";

//responsible for rendering the deck and all the abilities to edit, study, add or delete cards/deck
function DeckPageView({deck}) {
    const { url } = useRouteMatch();
    //console.log("url: ", url);

    const handleDelete = async (deckId) => {
        if(window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
            await deleteDeck(deck.id);
        }
        window.location.reload();
    };
    const cardList = (deck.cards).map((card) => <CardView key={card.id} card={card} url={url}/>);


    return (
        <div className="container mb-2">
            <div className="card mb-1">
                <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-subtitle">{deck.description}</p>
                    <a className="btn btn-secondary mr-1" href={`${url}/edit`}>Edit</a>
                    <a className="btn btn-primary mx-1" href={`${url}/study`}>Study</a>
                    <a className="btn btn-primary mx-1" href={`${url}/cards/new`}>+ Add Cards</a>
                    <button className="btn btn-danger mx-1" onClick={handleDelete}>Delete</button>
                </div>
            </div>  
            <h3>Cards</h3>
            {cardList}
        </div>
       
    );
}
export default DeckPageView;