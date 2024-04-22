import React from "react";
import NewsCard from "./newsCard";
import Loader from "./loader";

const DataView = ({ newsData = [], loading }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 p-4 shadow-md overflow-hidden">
      <div className="text-xl font-bold mb-4">
        <h1>News Articles</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : newsData.length > 0 ? (
            <div>
              {newsData.map((article, index) => (
              <NewsCard
                key={index}
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  urlToImage={article.urlToImage}
              />
              ))}
          </div>
        ) : (
          <div className="text-gray-600 text-center mt-8">
            No news articles found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataView;