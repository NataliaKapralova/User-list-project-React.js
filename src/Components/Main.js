import React from "react";
import * as styles from "../styles.css";
import { Link } from "react-router-dom";
import FormComponent from "./FormComponent";
import axios from "axios";
import UserItem from "./UserItem";

export default function Main() {
  const [dataOfUsers, setDataOfUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/users`).then((res) => {
      let dataOfUsers = res.data;
      setDataOfUsers(dataOfUsers);
    });
  }, []);

  // const onDelete = (id) => {
  //   setDataOfUsers(
  //     dataOfUsers.filter(function (person) {
  //       return person.id !== id;
  //     })
  //   );
  //   if (window.confirm("Are you sure?")) {
  //     axios.delete(`http://localhost:3000/users/` + id).then((res) => {
  //       console.log(res);
  //       console.log("deleted request ", res.data);
  //     });
  //   } else {
  //     console.log("iets");
  //   }
  // };

  return (
    <div>
      <header> User list </header>
      <div className="Nav">
        <div> Name </div>
        <div> Username </div>
        <div> Email </div>
        <Link to={"/FormComponent"}>
          {" "}
          <button> Add user </button>{" "}
        </Link>
      </div>
      {dataOfUsers.map((user, i) => (
        // <li className="List" key={user.id}>
        //   <div className="listItems"> {user.firstName} </div>
        //   <div className="listItems"> {user.lastName} </div>
        //   <div className="listItems"> {user.email} </div>

        //   <div className="button-container">
        //     <button onClick={() => onDelete(user.id)}>delete</button>
        //     <button> Edit </button>
        //   </div>
        // </li>
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
