import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

const SearchBar = ({ keyword, setKeyword, handleSearch }) => {
  useEffect(() => {
    handleSearch();
  }, [keyword]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="bg-slate-100 p-4 w-full relative">
      <div className="relative mb-2">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Enter keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-full pl-10 pr-3 py-2 border border-gray-300 bg-transparent"
        />
        {keyword && ( // Only render the icon if keyword is not empty
          <button
            onClick={handleSearch}
            className="absolute top-3 right-3 text-gray-400 focus:outline-none"
          >
            <AiOutlineSend />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
