// Search.jsx

import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    onSearch(keyword);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Search"
        value={searchKeyword}
        style={{
          padding: "8px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          width: "100%",
          marginBottom: "20px",
          fontSize: "16px"
        }}
      />
    </div>
  );
};

export default Search;
