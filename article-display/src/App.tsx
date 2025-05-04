import React, { use, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./index.css"; // or './styles.css' based on your setup
import "./App.css";
import Article from "./components/ArticleCard";
import { getUniqueTags } from "./utils/tagnames";
import { Author, getUniqueCategories, getUniqueAuthors } from "./utils/category";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";

// Define or import the Category type
type Category = {
  categoryId: string;
  categoryName: string;
  [key: string]: any; // Adjust based on the actual structure of your category object
};

function App() {
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);
  const [filteredTag, setFilteredTag] = useState<Array<string>>([]);
  const [filteredAuthor, setFilteredAuthor] = useState<Array<Author>>([]);
  const [articleData, setArticleData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [tagName, setTagName] = useState<string>("");
  const [articleId, setArticleId] = useState<string>("");
  const [showArticle, setShowArticle] = useState<any>(null);

  useEffect(() => {
    const data = fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticleData(data);
        setFilteredData(data);

        const uniqueCategories = getUniqueCategories(data);
        setFilteredCategory(uniqueCategories);

        const uniqueTags = getUniqueTags(data);
        setFilteredTag(uniqueTags);

        const uniquerAuthors = getUniqueAuthors(data);
        setFilteredAuthor(uniquerAuthors);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filterDataByCategory = (category: string) => {
    setArticleId("");
    if (category === "") {
      setFilteredData(articleData);
      return;
    }
    const filterData = articleData?.filter((article: any) => {
      return article.category.categoryName === category;
    });
    setFilteredData(filterData);
  };

  const filterDataByAuthor = (author: string) => {
    setArticleId("");
    if (author === "") {
      setFilteredData(articleData);
      return;
    }
    const filterData = articleData?.filter((article: any) => {
      return article.author.authorName === author;
    });
    setFilteredData(filterData);
  };

  const filterDataByTag = (tag: string) => {
    setArticleId("");
    setTagName(tag);
    if (tag === "") {
      setFilteredData(articleData);
      return;
    }

    const filteredData = articleData?.filter((article: any) => {
      return article.tags.includes(tag);
    });

    setFilteredData(filteredData);
  };

  const handleClick = (articleId: string) => {
    setArticleId(articleId);
    console.log(articleId);
    const articleData1 = articleData.filter((article: any) => {
      return (article.articleId === articleId);
    });
    setShowArticle(articleData1);
    // Perform any additional actions with the articleId
  };
  return (
    <div className="App">
      <Header
        tags={filteredTag}
        tagName={tagName}
        filterDataByTag={filterDataByTag}
        categories={filteredCategory}
        filterDataByCategory={filterDataByCategory}
        authors={filteredAuthor}
        filterDataByAuthor = {filterDataByAuthor}
        articleId={articleId}
      />

      {articleId && showArticle?.length &&
        showArticle?.map((articles: Article) => (
          <Article
            article={articles}
            key={articles.articleId}
            filterDataByTag={filterDataByTag}
          />
        ))}


          {!articleId && <ArticleList 
            articles={filteredData} 
            click={handleClick}
          
          />}
    </div>
  );
}

export default App;
