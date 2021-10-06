import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getQuotes,
  getCreatedQuote,
  getUpdatedQuote,
  getDeletedQuote
} from "./app/api";

// Styles
import "./app.scss";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import CreateQuote from "./components/CreateQuote";
import UpdateQuote from "./components/UpdateQuote";
import DeleteQuote from "./components/DeleteQuote";
import Modal from "./components/Modal";
// import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import MySwal from "./index";

function App() {
  const dispatch = useDispatch();
  const quotes = useSelector(state => state.quotes);

  const [loading, setLoading] = useState(false);

  const [currentQuote, setCurrentQuote] = useState({
    id: null,
    author: null,
    quote: "",
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedQuotes, setSavedQuotes] = useState(quotes);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const quotesLastIndex = currentPage * pageSize;
  const quotesFirstIndex = quotesLastIndex - pageSize;

  console.log(quotes);
  const currentQuotes = quotes.slice(quotesFirstIndex, quotesLastIndex);

  // Setting up Modal
  const setModal = modal => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = page => {
    setCurrentPage(page);
  };

  // Search
  const search = term => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedQuotes.filter(quote =>
        Object.keys(quote).some(key =>
          quote[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_QUOTES", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_QUOTES", data: savedQuotes });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "author":
        const authorSort = [...savedQuotes].sort((a, b) => {
          return sorted
            ? a.author.localeCompare(b.author, "tr")
            : b.author.localeCompare(a.author, "tr");
        });
        dispatch({ type: "SET_QUOTES", data: authorSort });
        return;
      case "quote":
        const quoteSort = [...savedQuotes].sort((a, b) => {
          return sorted
            ? a.quote.localeCompare(b.quote, "tr")
            : b.quote.localeCompare(a.quote, "tr");
        });
        dispatch({ type: "SET_QUOTES", data: quoteSort });
        return;
      default:
        break;
    }
  };

  // Create Quote
  const createQuote = async quote => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedQuote(quote).then(res => {
        //const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Quote created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_QUOTE", data: quote });
          setSavedQuotes([...quotes, quote]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create quote."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update Quote
  const updateRow = quote => {
    setModal("Update Quote");

    setCurrentQuote({
      id: quote.id,
      author: quote.author,
      quote: quote.quote,
    });
  };

  const updateQuote = async (id, updatedQuote) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedQuote(id, updatedQuote).then(res => {
        //const result = res;
        //console.log(res);
        MySwal.fire({
          icon: "success",
          title: "Quote updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_QUOTES",
            data: quotes.map(quote =>
              quote.id === id ? Object.assign(quote, updatedQuote) : quote
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update quote."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Quote
  const deleteRow = quote => {
    setModal("Delete Quote");

    setCurrentQuote({
      id: quote.id,
      author: quote.author,
      quote: quote.quote,
    });
  };

  const deleteQuote = async id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedQuote(id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "Quote deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_QUOTES",
            data: quotes.filter(quote => quote.id !== id)
          });
          setSavedQuotes(savedQuotes.filter(quote => quote.id !== id));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete quote."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Quotes
  const fetchQuotes = async () => {
    setLoading(true);

    try {
      await getQuotes().then(({ data }) => {
        console.log("ttt", data);
        setSavedQuotes(data);
        dispatch({ type: "SET_QUOTES", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch quotes."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                {/* <Search search={search} resetSearch={search} /> */}
                <button
                  className="primary-btn"
                  onClick={() => setModal("Create Quote")}
                >
                  Create New Quote
                </button>
              </div>
              <DataTable
                quotes={currentQuotes}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={quotes.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create Quote" && (
            <CreateQuote
              createQuote={createQuote}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Quote" && (
            <UpdateQuote
              currentQuote={currentQuote}
              updateQuote={updateQuote}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Quote" && (
            <DeleteQuote
              currentQuote={currentQuote}
              deleteQuote={deleteQuote}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default App;
