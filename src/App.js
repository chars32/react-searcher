import React, { useState, useEffect } from "react";

import Datatable from "./components/datatable";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState(["firstName", "lastName"]);

  useEffect(() => {
    fetch("https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  // functions to search values in datatable
  const search = (rows) => {
    if (searchColumn.length > 0) {
      return rows.filter((row) =>
        searchColumn.some(
          (column) =>
            row[column].toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
        )
      );
    } else {
      return data;
    }
  };

  const columns = data[0] && Object.keys(data[0]);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type="checkbox"
                checked={searchColumn.includes(column)}
                onChange={(e) => {
                  const checked = searchColumn.includes(column);
                  setSearchColumn((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>
  );
};

export default App;
