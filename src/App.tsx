import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  // https://jsonplaceholder.typicode.com/users
  //res.data is an array of object
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <div>
        {" "}
        <button className="btn btn-success my-2 mx-3">Create</button>
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={user.id}
            >
              {user.name}
              <div className="">
                <button className="btn btn-danger mx-2">Delete</button>
                <button className="btn btn-warning">Update</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
