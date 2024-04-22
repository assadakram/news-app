import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Create a separate function for filter logic
const applyFilter = (router, newsData, keyword, category, source, startDate, endDate, setDisplayableData, setError) => {
  const queryParams = {
    category,
    source,
    startDate,
    endDate,
  };
  router.push({
    pathname: router.pathname,
    query: queryParams,
  });

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    setError("End date should be after start date.");
    return;
  }

  const filteredData = newsData.filter((article) => {
    const keywordMatch = article.title.toLowerCase().includes(keyword.toLowerCase());
    const categoryMatch = !category || article.category === category;
    const sourceMatch = !source || article.source === source;
    const startDateMatch = !startDate || new Date(article.date) >= new Date(startDate);
    const endDateMatch = !endDate || new Date(article.date) <= new Date(endDate);

    return keywordMatch && categoryMatch && sourceMatch && startDateMatch && endDateMatch;
  });

  setDisplayableData(filteredData);
  setError("");
};

const SearchFilter = ({
  categories,
  setDisplayableData,
  newsData,
  sources,
  keyword,
  setKeyword,
}) => {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const { query } = router;
    setCategory(query.category || "");
    setSource(query.source || "");
    setStartDate(query.startDate || "");
    setEndDate(query.endDate || "");
  }, [router.query]);

  useEffect(() => {
    if (newsData && newsData.length > 0) {
      applyFilter(router, newsData, keyword, category, source, startDate, endDate, setDisplayableData, setError);
    }
  }, [router, newsData, keyword, category, source, startDate, endDate, setDisplayableData, setError]);

  const handleClearFilter = () => {
    setKeyword("");
    setCategory("");
    setSource("");
    setStartDate("");
    setEndDate("");
    router.push({
      pathname: router.pathname,
      query: {},
    });
  };

  return (
    <div className="bg-slate-100 p-4 h-screen">
      <div className="flex flex-col justify-end">
        <div className="mb-12">
          <h1 className="font-bold text-2xl">News Aggregator</h1>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="font-bold">Select Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-2 p-4 border border-gray-300 rounded-md bg-transparent text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Select Source</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="mb-2 p-4 border border-gray-300 rounded-md bg-transparent text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
          >
            <option value="">Select Source</option>
            {sources?.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div className="flex mb-2 flex-col gap-2">
          <label className="font-bold">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mb-2 p-4 border border-gray-300 rounded-md bg-transparent text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
          />
        </div>
        <div className="flex mb-2 flex-col gap-2">
          <label className="font-bold">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mb-2 p-4 border border-gray-300 rounded-md bg-transparent text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
          />
        </div>
        {/* <button
          onClick={() => applyFilter(router, newsData, keyword, category, source, startDate, endDate, setDisplayableData, setError)}
          className="mb-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-2"
        >
          Apply Filters
        </button> */}
        <button
          onClick={handleClearFilter}
          className="mb-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
