import React, { useState } from "react";

function Searcher() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [teamData, setTeamData] = useState(null);


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
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlayerData(data); // Store the fetched data in state
        console.log("API Response:", data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const renderPlayerInfo = () => {
    if (playerData) {
      return (
        <div className="mt-4">
          <div>
            <img src={playerData.avatar} alt={playerData.nickname} />
            <p>Username: {playerData.nickname}</p>
            <p>Created: {playerData.activated_at}</p>
          </div>
        </div>
      );
    } else {
      return <p>Player missing</p>;
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        className="mr-8 rounded-lg p-2 text-sky-400"
        placeholder="Enter text"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>{renderPlayerInfo()}</div>
    </div>
  );
}

export default Searcher;
