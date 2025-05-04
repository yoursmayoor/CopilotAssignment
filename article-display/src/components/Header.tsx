import React from "react";
import { Author } from "../utils/category";

type Category = {
  categoryId: string;
  categoryName: string;
};

type HeaderProps = {
  categories: Category[];
  tags: string[];
  tagName: string;
  authors: Author[];
  filterDataByAuthor: (authorName: string) => void;
  filterDataByCategory: (categoryId: string) => void;
  filterDataByTag: (tag: string) => void;
  articleId: string;
};

const Header: React.FC<HeaderProps> = ({
  categories,
  tags,
  tagName,
  authors,
  filterDataByAuthor,
  filterDataByCategory,
  filterDataByTag,
  articleId
}) => {
  if (articleId) {
    return(
      <div 
      className="flex gap-4 mb-5 items-center p-4 bg-[rgb(206,219,243)] rounded-md shadow"
      
      >
        <span
        onClick={() => {
          filterDataByTag("");
        } } 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer shadow">
        Back to artile list
        </span>
      </div>
    )
  }
  return (
    <div className="flex gap-4 mb-5 items-center p-4 bg-[rgb(206,219,243)] rounded-md shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Category
        </label>
        <select
          onChange={(e) => filterDataByCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Tag
        </label>
        <select
          onChange={(e) => filterDataByTag(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
          value={tagName}
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Author:</label>
        <select
          id="author-select"
          onChange={(e) => filterDataByAuthor(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Authors</option>
          {authors.map((author :Author) => (
            <option key={author.authorId} value={author.authorName}>
              {author.authorName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
