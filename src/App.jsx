import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [UserData, setUserData] = useState(null);
  const [fetchUserData, setFetchUserData] = useState(false);

  // fetching data from github api
  async function fetchUserDatafromAPI() {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    setUserData(data);

    setUser("");
  }

  useEffect(() => {
    if (fetchUserData) {
      fetchUserDatafromAPI();
    }
  }, [fetchUserData]);

  // sending fetch-data msg
  const sendFetchDataMsg = () => {
    if (user == "") {
      alert("Enter Username");
    } else {
      setFetchUserData(true);
    }
  };

  return (
    <div className="text-white">
      <h1 className="mb-5 ">Github User</h1>

      {/* enter usernme input */}
      <div className="my-6">
        <input
          type="text"
          className="bg-white py-2 px-4 rounded-md text-black"
          placeholder="Enter user name"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />

        {/* fetch data button  */}
        <button className=" bg-red-400" onClick={sendFetchDataMsg}>
          Fetch Data
        </button>
      </div>

      {/* display User data */}
      <div className="text-left   text-lg ">
        {UserData ? (
          <ul>
            <li>Name: {UserData.name}</li>
            <li>Bio: {UserData.bio}</li>
            <li>
              followers: {UserData.followers} following: {UserData.following}
            </li>
            <li>Github ID: {UserData.login}</li>
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default App;
