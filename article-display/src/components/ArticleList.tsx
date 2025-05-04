import React from "react";

interface Article {
  articleId: string;
  hero: string;
  title: string;
  Subtitle: string;
}

type Props = {
  articles: Article[];
  click: (articleId: string) => void;
}


const ArticleList: React.FC<Props> = ({ articles, click }) => {
  return (
    <div className="space-y-4">
      {articles && articles?.map((article) => (
        <div key={article?.articleId} className="flex border border-green-600 p-5" onClick={() => click(article.articleId)}>
          <div className="w-48 h-48 flex-shrink-0 flex items-center justify-center">
            <img
              src={article.hero}
              alt="Hero"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-center flex-grow space-y-2 ml-4">
            <div className="p-2 text-xl font-semibold">
              {article.title}
            </div>
            <div className="p-2 text-gray-700">
              {article.Subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
