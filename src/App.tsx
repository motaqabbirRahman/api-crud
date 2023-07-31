import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  // https://jsonplaceholder.typicode.com/users
  //res.data is an array of object
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  //delete
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
    //optimistic approach
  };
  //add
  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 12, name: "Motaqabbir" };
    setUsers([newUser, ...users]);
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
    console.log(newUser);
  };
  //update
  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.name === user.name ? updatedUser : u)));
    axios.patch(
      "https://jsonplaceholder.typicode.com/users/" + user.id,
      updatedUser
    );
  };

  return (
    <>
      <div>
        {" "}
        {error && <p className="text text-danger">{error}</p>}
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={user.id}
            >
              {user.name}
              <div className="">
                <button
                  onClick={() => deleteUser(user)}
                  className="btn btn-danger mx-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => updateUser(user)}
                  className="btn btn-warning"
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={addUser} className="btn btn-success my-2 mx-3">
          Create
        </button>
      </div>
    </>
  );
}

export default App;
