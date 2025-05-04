type Article = {
    tags: string[];
    // other fields omitted for brevity
  };
  
  export function getUniqueTags(articles: Article[]): string[] {

    const tagSet = new Set<string>();
    for (const article of articles) {
      article.tags.forEach(tag => tagSet.add(tag));
    }
  
    return Array.from(tagSet);
  }

  