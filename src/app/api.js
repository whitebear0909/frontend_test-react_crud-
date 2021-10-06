import axios from "axios";

const apiURL = process.env.REACT_APP_REQRES_API;

function getQuotes() {
  const response = axios.get(`${apiURL}/quotes`);
  return response;
}

function getCreatedQuote({ author, quote }) {
  const response = axios.post(`${apiURL}/quotes`, {
    author,
    quote,
  });

  return response;
}

function getUpdatedQuote(id, quote) {
  const response = axios.patch(`${apiURL}/quotes/${id}`, {
    author: quote.author,
    id: id,
    quote: quote.quote,
  });

  return response;
}

function getDeletedQuote(id) {
  const response = axios.delete(`${apiURL}/quotes/${id}`);

  return response;
}

export { getQuotes, getCreatedQuote, getUpdatedQuote, getDeletedQuote };
