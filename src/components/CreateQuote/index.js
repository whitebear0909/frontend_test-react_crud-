import React, { useState } from "react";

const CreateQuote = props => {
  const initialData = { id: null, author: "", quote: "" };
  const [quote, setQuote] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setQuote({ ...quote, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!quote.author || !quote.quote) return;
        props.createQuote(quote);
      }}
    >
      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={quote.quthor}
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
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateQuote;
