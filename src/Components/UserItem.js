import React from "react";
import axios from "axios";
// import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function UserItem({ user }) {
  const onDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:3000/users/` + id).then((res) => {
        console.log(res);
        console.log("deleted request ", res.data);
      });
    }
  };
  return (
    <div>
      <ul className="List">
        <li className="listItems"> {user.firstName} </li>{" "}
        <li className="listItems"> {user.lastName} </li>{" "}
        <li className="listItems"> {user.email} </li>{" "}
        <div className="button-container">
          <button onClick={() => onDelete(user.id)}>delete</button>
          <Link to={`/users/${user.id}`}>
            {" "}
            <button> Edit user </button>{" "}
          </Link>
        </div>
      </ul>
    </div>
  );
}
