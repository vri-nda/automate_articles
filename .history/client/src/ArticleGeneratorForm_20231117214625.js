//working fine
import React, { useState } from "react";
import axios from "axios";

function ArticleGeneratorForm() {
  const [topic, setTopic] = useState("");
  const [generatedArticle, setGeneratedArticle] = useState("");

const generateArticle = () => {
    if (topic) {
      axios
        .post("/generate_article", { user_input: topic })
        .then((response) => {
            console.log(response);
          const articleText = response.data.article;
  
          // Format the article by replacing bullet points with new lines
          const formattedArticle = formatArticle(articleText);
  
          // Display the formatted article
          setGeneratedArticle(formattedArticle);
        })
        .catch((error) => {
          console.error("Error:", error);
          setGeneratedArticle("An error occurred while generating the article.");
        });
    } else {
      setGeneratedArticle("Please enter a topic before generating the article.");
    }
    setGeneratedArticle(`This is an article on the topic: ${topic}`);
  };

  

const formatArticle = (articleText) => {
    // Use a regular expression to detect bullet points, colons, or other symbols and place them on new lines
    const formattedText = articleText.replace(/(\d+\.)|([\*\-•:])\s/g, '<br/>$& ');
  
    // Split the formatted text into paragraphs based on a delimiter (e.g., double line break)
    const paragraphs = formattedText.split('<br/><br/>');
  
    // Create the complete formatted article with the heading and paragraphs
    const formattedArticle = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="font-size: 24px; text-align: center; margin-bottom: 20px;">Article on the topic: ${topic}</h1>
        ${paragraphs.map((paragraph) => `
          <p style="font-size: 16px; text-align: justify;">${paragraph}</p>
        `).join('')}
      </div>
    `;
  
    return formattedArticle;
  };
  
  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      generateArticle();
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">Article Generator</h2>
      <div className="mb-4">
        <label htmlFor="userInput" className="text-sm font-medium text-gray-600">
          Enter a topic for the article:
        </label>
        <input
          type="text"
          id="userInput"
          className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="mb-4">
        <button
          className="px-4 py-2 text-white bg-indigo-600 rounded hover-bg-indigo-700"
          onClick={generateArticle}
        >
           Generate Article
         </button>
       </div>
       <div className="mb-4">
         <h3 className="text-lg font-semibold">Generated Article:</h3>
         <div
          id="generatedArticle"
          className="p-4 bg-white border border-gray-300 rounded"
          dangerouslySetInnerHTML={{ __html: generatedArticle }}
        ></div>
      </div>
    </div>
  );
}

export default ArticleGeneratorForm;


        

































