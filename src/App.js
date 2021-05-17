import React, { useState, useEffect } from "react";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

import Datatable from "./components/datatable";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  // functions to search values in datatable
  const search = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      // (row) => row.firstName.toLowerCase().indexOf(query) > -1
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>
  );
};

export default App;
