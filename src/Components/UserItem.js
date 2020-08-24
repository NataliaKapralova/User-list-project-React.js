import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export default function UserItem({ user }) {
  return (
    <Container>
      <ul className="List">
        <li className="listItems"> {user.firstName} </li>{" "}
        <li className="listItems"> {user.lastName} </li>{" "}
        <li className="listItems"> {user.email} </li>{" "}
        <li className="listItems"> {user.skill} </li>{" "}
        <Link to={`/users/${user.id}`}>
          <i className="small icon-black material-icons">create</i>
        </Link>
      </ul>
    </Container>
  );
}

const Container = styled.section`

  width: 100%;
`;
