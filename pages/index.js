import React, { useState, useEffect, useCallback } from "react";
import SearchFilter from "./searchFilter";
import DataView from "./dataView";
import SearchBar from "./topBar";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Home() {
  const [newsData, setNewsData] = useState([]);
  const [displayableData, setDisplayableData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sidebar, setSideBar] = useState(true);
  const [loading, setLoading] = useState(true);

  const uniqueSources = [...new Set(newsData.map(item => item.source))];

  const uniqueCategories = [...new Set(newsData.map(item => item.category))];

  const toggleSidebar = () => {
    setSideBar(!sidebar);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const apiKey = "15c43460cdf442df96f448d478ce6a4d"; // Replace with your API key
    const urls = [
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=entertainment&api-key=OOYjZ2YOgQwExKgrzcGQr01WjhMWjQcG`,
      `https://content.guardianapis.com/search?order-by=newest&q=cricket&api-key=test`,
    ];

    try {
      const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
      const data = responses.flatMap(response => {
        if (response.articles) {
          return response.articles.map(article => ({
            source: article.source.name,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            category: "",
            date: article.publishedAt,
          }));
        } else if (response.response?.docs) {
          return response.response.docs.map(doc => ({
            source: doc.source,
            title: doc.headline.main,
            description: doc.lead_paragraph,
            url: doc.web_url,
            urlToImage: doc.multimedia[0].url,
            category: "",
            date: doc.pub_date,
          }));
        } else if (response.response?.results) {
          return response.response.results.map(result => ({
            source: result.sectionName,
            title: result.webTitle,
            description: result.webUrl,
            category: result.pillarName,
            date: result.webPublicationDate,
            url: result.webUrl,
            urlToImage: "",
          }));
        }
        return [];
      });
      setNewsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = () => {
    const filteredData = newsData.filter(article =>
      article.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setDisplayableData(filteredData);
  };

  return (
    <div className="flex flex-col relative bg-slate-100">
      <main className="flex flex-col lg:flex-row overflow-y-auto h-screen">
        {/* Sidebar */}
        <div className={`w-full lg:w-3/12 ${!sidebar && "hidden"} sticky z-10 bg-white lg:bg-transparent lg:overflow-y-scroll lg:h-screen`}>
          <SearchFilter
            categories={uniqueCategories}
            sources={uniqueSources}
            setDisplayableData={setDisplayableData}
            newsData={newsData}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </div>
        {/* Content */}
        <div className="w-full h-screen lg:h-auto lg:overflow-y-scroll">
          {/* Top Bar */}
          <div className="sticky top-0 z-50 bg-slate-100 lg:bg-transparent flex w-full">
            {/* Hamburger Menu Button */}
            <button className="bg-slate-100 pl-4" onClick={toggleSidebar}>
              <GiHamburgerMenu />
            </button>
            {/* Search Bar */}
            <SearchBar
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
          </div>
          {/* Main Content */}
          <DataView loading={loading} newsData={displayableData} />
        </div>
      </main>
    </div>
  );
}
