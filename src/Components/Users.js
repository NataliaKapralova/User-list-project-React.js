import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserItem from "./UserItem";
import styled, { css } from "styled-components";

export default function Users() {
  const [loading, setLoading] = React.useState(false);
  const [dataOfUsers, setDataOfUsers] = React.useState([]);
  const [dataOfProducts, setDataOfProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/users`).then((res) => {
      let dataOfUsers = res.data;
      setDataOfUsers(dataOfUsers);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/products`).then((res) => {
      let dataOfProducts = res.data;
      setDataOfProducts(dataOfProducts);
      console.log("heyyy", dataOfProducts);
    });
  }, []);

  React.useEffect(() => {
    setFilteredUsers(
      dataOfUsers.filter((user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, dataOfUsers]);

  const userList = filteredUsers.map((user) => (
    <UserItem key={user.id} user={user} />
  ));

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <header>
        {" "}
        <h4> User list project </h4>
      </header>
      <div>
        <div class="input-field inline">
          <input
            className="input-field input[type=text]:focus + label"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            id="search"
          />
          <label for="search">search</label>
        </div>
      </div>
      <div className="Nav">
        <li> Name </li>
        <li> Username </li>
        <li> Email </li>
        <li> Skill</li>
        <Link className="btn-small blue" to={"/AddUser"}>
          add user
        </Link>
      </div>
      {userList}
      <div className="fixed-action-btn">
        <Link to={"/AddUser"} className="btn-floating btn-medium black">
          {" "}
          <i className="fa fa-plus"> </i>
        </Link>
      </div>
    </div>
  );
}