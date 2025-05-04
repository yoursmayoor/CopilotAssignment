export type Category = {
    categoryId: string;
    categoryName: string;
  };
  export type Author = {
    authorId: string;
    authorImage: string;
    authorName: string;
  };
  
  type Article = {
    category: Category;
    author: Author;
  };
  
  export function getUniqueCategories(articles: Article[]): Category[] {
    const categoryMap = new Map<string, Category>();
    if (!Array.isArray(articles)) return [];
  
    for (const article of articles) {
      const { categoryId, categoryName } = article.category;
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, { categoryId, categoryName });
      }
    }
  
    return Array.from(categoryMap.values());
  }
  
  export function getUniqueAuthors(articles: Article[]): Author[] {
    const seen = new Set<string>();
    const uniqueAuthors: Author[] = [];
  
    for (const article of articles) {
      const { author } = article;
      if (!seen.has(author.authorId)) {
        seen.add(author.authorId);
        uniqueAuthors.push(author);
      }
    }
  
    return uniqueAuthors;
  }