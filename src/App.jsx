import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div className="container">
      <h1>Pokemon Search</h1>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);