// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React from "react";
import "./App.css";
import ArticleGeneratorForm from "./ArticleGeneratorForm";
import GeneratedArticle from "./GeneratedArticle";

function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <ArticleGeneratorForm />
            <GeneratedArticle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

