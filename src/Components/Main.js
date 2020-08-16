import React from "react";
import * as styles from "../styles.css";
import { Link } from "react-router-dom";
import FormComponent from "./FormComponent";
import axios from "axios";

export default function Main() {
  const [dataOfUsers, setDataOfUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/users`).then((res) => {
      let dataOfUsers = res.data;
      setDataOfUsers(dataOfUsers);
    });
  }, []);

  const onDelete = () => {
    // axios
    //   .delete(`http://localhost:3000/users/${dataOfUsers[8]}`)
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //   });
  };

  return (
    <div>
      <header> user list </header>
      <FormComponent
        setDataOfUsers={setDataOfUsers}
        dataOfUsers={dataOfUsers}
      />
      <div className="Nav">
        <div> Name </div>
        <div> Username </div>
        <div> Email </div>
        <Link to={"/FormComponent"}>
          {" "}
          <button> Add user </button>{" "}
        </Link>
      </div>
      <ul>
        {dataOfUsers.map((user) => (
          <li className="List" key={user.id}>
            <div className="listItems"> {user.firstName} </div>
            <div className="listItems"> {user.lastName} </div>
            <div className="listItems"> {user.email} </div>
            <div className="button-container">
              <button onClick={onDelete}>delete</button>
              <button> Edit </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
