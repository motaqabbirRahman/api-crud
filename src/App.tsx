import { useState, useEffect } from "react";
import apiClient from "./services/api-client";
import userService, { User } from "./services/user-service";

function App() {
  // https://jsonplaceholder.typicode.com/users
  //res.data is an array of object

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err.message));

    return () => cancel();
  }, []);

  //delete
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    userService.deleteUser(user.id).catch((err) => {
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
    userService.createUser(newUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };
  //update
  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.name === user.name ? updatedUser : u)));

    userService.updateUser(updatedUser).catch((err) => {
      setUsers(originalUsers);
      setError(err.message);
    });
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
function getAllUser() {
  throw new Error("Function not implemented.");
}
