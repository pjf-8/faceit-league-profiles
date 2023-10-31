import React, { useState } from "react";
import Searcher from "./searcher"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center selection:bg-green-900">
      <header className="flex min-h-screen flex-col items-center text-white mt-4 mb-4">
        <h1 className="text-4xl mb-4">Faceit profile search</h1>
      <Searcher></Searcher>
      </header>
    </div>
  );
}

export default App;
