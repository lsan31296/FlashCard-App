//responsible for creating form for cards
function CardForm({ handleSubmit, deckId, formData, handleChange }) {
    return ( 
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea className="form-control" name="front" value={formData.front} onChange={handleChange} rows={2}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea className="form-control" name="back" value={formData.back} onChange={handleChange} rows={3}></textarea>
            </div>
            <a href={`/decks/${deckId}`} className="btn btn-secondary mr-2">Cancel</a>
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    );
}
export default CardForm;