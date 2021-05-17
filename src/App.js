import React, { useState, useEffect } from "react";

import Datatable from "./components/datatable";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="App">
      <div>Filter goes here</div>
      <div>
        <Datatable data={data} />
      </div>
    </div>
  );
};

export default App;
