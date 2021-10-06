import React, { useState, useEffect } from "react";

const DeleteQuote = props => {
  const [quote, setQuote] = useState(props.currentQuote);

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
        props.deleteQuote(quote.id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete this?
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Delete</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DeleteQuote;
