import React from "react";

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const DataTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() => {
                props.onSortChange("author");
              }}
            >
              <span className="column-sort">
                Author
                <img src={SortIcon} alt="Author" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("quote");
              }}
            >
              <span className="column-sort">
                Quote
                <img src={SortIcon} alt="Quote" />
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.quotes.length ? (
            props.quotes.map(quote => (
              <tr key={quote.id}>
                <td>{quote.author}</td>
                <td>{quote.quote}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(quote);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(quote)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
