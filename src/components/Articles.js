import React, { useState, useEffect } from "react";

function Articles({ articles, sort }) {
  const deepCopy = (array) => JSON.parse(JSON.stringify(array));

  const [sortedArticles, setSortedArticles] = useState(articles);

  const compareDates = (a, b) => {
    if (new Date(b.date) < new Date(a.date)) {
      return -1;
    }
    if (new Date(b.date) > new Date(a.date)) {
      return 1;
    }
    return 0;
  };
  const compareNumbers = (a, b) => {
    return b.upvotes - a.upvotes;
  };

  const showMostRecentArticles = () => {
    const result = deepCopy(sortedArticles).sort(compareDates);
    setSortedArticles(result);
  };

  const showMostUpvotedArticles = () => {
    const result = deepCopy(sortedArticles).sort(compareNumbers);
    setSortedArticles(result);
  };

  useEffect(() => {
    if (sort === "mostUpvotedArticles") {
      showMostUpvotedArticles();
      return;
    }
    showMostRecentArticles();
  }, [sort]);

  return (
    <div className="card w-50 mx-auto">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedArticles.map((item, i) => (
            <tr data-testid="article" key={`article-index-${i}`}>
              <td data-testid="article-title">{item.title}</td>
              <td data-testid="article-upvotes">{item.upvotes}</td>
              <td data-testid="article-date">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
