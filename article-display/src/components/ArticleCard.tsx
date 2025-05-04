import React from 'react';

type Author = {
  authorId: string;
  authorImage: string;
  authorName: string;
};

type Category = {
  categoryId: string;
  categoryName: string;
};

type Article = {
  articleId: string;
  published: string;
  author: Author;
  category: Category;
  tags: string[];
  title: string;
  Subtitle: string;
  hero: string;
  description: string;
};

type Props = {
  article: Article;
  filterDataByTag: (tag: string) => void;
};

const Article: React.FC<Props> = ({ article, filterDataByTag }) => {
  const {
    title,
    Subtitle,
    hero,
    published,
    author,
    category,
    tags,
    description
  } = article;
  return (
    <div className="max-w-3xl mx-auto mb-5 p-6 border rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <img
        src={hero}
        alt={title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />

      <div className="flex items-center gap-3 mb-4">
        <img
          src={author?.authorImage}
          alt={author?.authorName}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">{author?.authorName}</p>
          <p className="text-xs text-gray-500">
            {new Date(published).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="text-gray-600 italic mb-4">{Subtitle}</p>


      <div className="mb-2 text-sm text-blue-600 font-medium">
        Category: {category?.categoryName}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-200 text-sm text-gray-800 rounded-full mr-2 cursor-pointer hover:bg-gray-300 transition"
            onClick={() => filterDataByTag(tag)}
          >
            #{tag}
          </span>
        ))}
      </div>

      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default Article;
