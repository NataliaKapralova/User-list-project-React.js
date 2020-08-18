import React from "react";
import * as styles from "../styles.css";
import { Link } from "react-router-dom";
import FormComponent from "./FormComponent";
import axios from "axios";
import UserItem from "./UserItem";
import styled, { css } from "styled-components";

export default function Users() {
  const [dataOfUsers, setDataOfUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/users`).then((res) => {
      let dataOfUsers = res.data;
      setDataOfUsers(dataOfUsers);
    });
  }, []);

  return (
    <div>
      <header> User list </header>
      <div className="Nav">
        <li> Name </li>
        <li> Username </li>
        <li> Email </li>
        <Link to={"/FormComponent"}>
          {" "}
          <Button> Add user </Button>
        </Link>
      </div>
      <div>
        {dataOfUsers.map((user, i) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      <div className="fixed-action-btn">
        <Link to={"/FormComponent"} className="btn-floating btn-medium black">
          {" "}
          <i className="fa fa-plus"> </i>
        </Link>
      </div>
    </div>
  );
}

const Button = styled.button`
  /* margin-top: 8px;
  margin-right: 21px; */
`;
