import React from "react";

const Filter = ({handleChange, newSearch}) => {
  return (
    <div>
      <label>
        filter shown with:{" "}
        <input onChange={handleChange} value={newSearch} type="text" />
      </label>
    </div>
  );
};

export default Filter;
