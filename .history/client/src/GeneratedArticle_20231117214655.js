import React from "react";

function GeneratedArticle({ article }) {
  return (
    <div className="mt-3">
      {/* <h3>Generated Article:</h3> */}
      {/* <div id="generatedArticle">{article}</div> */}
      <div
        id="generatedArticle"
        dangerouslySetInnerHTML={{ __html: article }}
      ></div>
    </div>
  );
}

export default GeneratedArticle;
