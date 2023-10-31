import React, { useState } from "react";

function Searcher() {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = () => {
    faceitQuery(searchText);
  };

  const faceitQuery = (text) => {
    const token = import.meta.env.VITE_API_KEY;

    fetch(`https://open.faceit.com/data/v4/players?nickname=${text}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        className="p-2 rounded-lg mr-8 text-sky-400"
        placeholder="Enter text"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Searcher;
