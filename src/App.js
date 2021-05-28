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

  const clickFillTagSearch = (e) => {
    const searchColumn_dif = searchColumn.filter(
      (item) => item !== e.target.innerText
    );
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
        <div>
          {searchColumn &&
            searchColumn.map((column) => (
              <p onClick={clickFillTagSearch}>{column}</p>
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
