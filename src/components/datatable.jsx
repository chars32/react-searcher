import React from "react";

const Datatable = ({ data }) => {
  // columns get all the headers value of a column
  const columns = data[0] && Object.keys(data[0]);

  return (
    <table cellPadding={0} cellSpacing={0}>
      <thead>
        <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
      </thead>

      <tbody>
        {/* fill all the values in a row */}
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Datatable;
