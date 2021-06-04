import React, { useState, useEffect } from "react";

import Datatable from "./components/datatable";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState([]);

  useEffect(() => {
    fetch("https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  // functions to search values in datatable
  const search = (rows) => {
    if (searchColumn.length > 0) {
      const rowsFilter = rows.filter((row) =>
        searchColumn.some(
          (column) =>
            row[column].toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
        )
      );
      return rowsFilter.length > 0 ? rowsFilter : data;
    } else {
      return data;
    }
  };

  const columns = data[0] && Object.keys(data[0]);

  const fillSearchColumn = (column) => {
    const checked = searchColumn && searchColumn.includes(column);
    if (!checked) {
      setSearchColumn((prev) => [...prev, column]);
    }
  };

  const clickFillTagSearch = (column) => {
    const searchColumn_dif = searchColumn.filter((item) => item !== column);
    setSearchColumn(searchColumn_dif);
  };

  const Styles = {
    inputListContainer: {
      display: "flex",
      alignItems: "flex-end",
      padding: "1rem",
      position: "relative",
      flexDirection: "row-reverse",
    },
    tagsContainer: {
      padding: "0 1rem",
      display: "flex",
      alignItems: "center",
    },
    tagItems: {
      color: "black",
      overflow: "hidden",
      display: "flex",
      justifyContent: "space-around",
      margin: "0 0.5rem",
    },
    tagName: {
      backgroundColor: "lightBlue",
      padding: "0 0.5rem",
      textAlign: "center",
      borderRadius: "15px 0 0 15px",
    },
    tagClose: {
      backgroundColor: "lightGray",
      padding: "0 0.5rem",
      textAlign: "center",
      borderRadius: "0 15px 15px 0",
    },
  };

  return (
    <div className="App">
      <div style={Styles.inputListContainer}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        {query && (
          <div
            style={{
              backgroundColor: "white",
              width: "11rem",
              position: "absolute",
              top: "2.3rem",
            }}
          >
            {columns &&
              columns.map((column) => (
                <p onClick={() => fillSearchColumn(column)}>{column}</p>
              ))}
          </div>
        )}
        <div style={Styles.tagsContainer}>
          {searchColumn &&
            searchColumn.map((column) => (
              <div style={Styles.tagItems}>
                <div style={Styles.tagName}>{column}</div>
                <div style={Styles.tagClose}>X</div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>
  );
};

export default App;
