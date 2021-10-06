import React, { useState, useEffect } from "react";

const UpdateQuote = props => {
  const [quote, setQuote] = useState(props.currentQuote);

  const onInputChange = event => {
    const { name, value } = event.target;

    setQuote({ ...quote, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setQuote(props.currentQuote);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.updateQuote(quote.id, quote);
      }}
    >
      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={quote.author}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Quote</label>
        <input
          type="text"
          name="quote"
          value={quote.quote}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Update</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateQuote;
