import React from "react";
import NewsCard from "./newsCard";
import Loader from "./loader";

const DataView = ({ newsData = [], loading }) => {
  return (
    <div className="overscroll-y-none overscroll-x-none min-h-screen w-full bg-slate-100 p-4  shadow-md">
      <div className="text-xl font-bold">
        <h1 className="mb-4">News Articles</h1>
      </div>

      {loading ? (
        <Loader />
      ) : newsData.length > 0 ? (
        <div className="overscroll-x-auto">
          {newsData.map((article, index) => {
            const { title, description, url, urlToImage } = article;
            return (
              <NewsCard
                key={index}
                title={title}
                description={description}
                url={url}
                urlToImage={urlToImage}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-gray-600 text-center mt-8">
          No news articles found.
        </div>
      )}
    </div>
  );
};

export default DataView;