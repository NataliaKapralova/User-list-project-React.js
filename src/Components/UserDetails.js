import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export default function UserDetails(props) {
  const [details, setDetails] = React.useState([]);
  const [title, setTitle] = React.useState("");

  // Get user details with ID
  React.useEffect(() => {
    const {
      match: { params },
    } = props;
    axios.get(`http://localhost:3000/users/` + params.id).then((res) => {
      let details = res.data;
      let title = details.product.title;
      setTitle(title);
      setDetails(details);
      console.log("Get request with user info ", details);
    });
  }, []);

  // Delete user with ID request
  const onDelete = (id) => {
    const {
      match: { params },
    } = props;

    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:3000/users/` + id).then((res) => {
        console.log(res);
        console.log("deleted request ", res.data);
        props.history.push("/");
      });
    }
  };

  const iets = () => {
    if (details.optionalSkill === "") {
      return (
        <li className="collection-item">
          <p> Optional skill:</p> none{" "}
        </li>
      );
    } else {
      return (
        <li className="collection-item">
          {" "}
          <p> Optional-skill: </p> {details.optionalSkill}{" "}
        </li>
      );
    }
  };

  return (
    <div>
      <DetailContainer>
        <h1> Details </h1>
        <ul className="collection">
          <li className="collection-item">
            <p> ID : </p>
            {details.id}
          </li>
          <li className="collection-item">
            <p> Firstname: </p> {details.firstName}
          </li>
          <li className="collection-item">
            <p> Lastname: </p>
            {details.lastName}
          </li>
          <li className="collection-item">
            {" "}
            <p> Email: </p>
            {details.email}
          </li>
          <li className="collection-item">
            {" "}
            <p> Product: </p>
            {title}
          </li>
          <li className="collection-item">
            {" "}
            <p> Skill: </p> {details.skill}
          </li>
          <li className="collection-item">{iets()}</li>
        </ul>
        <Link className="btn" to={`/users/edit/${details.id}`}>
          {" "}
          Edit{" "}
        </Link>
        <Button className="btn red" onClick={() => onDelete(details.id)}>
          delete
        </Button>
        <Link className="btn grey" to={"/"}>
          Back
        </Link>
      </DetailContainer>
    </div>
  );
}

const DetailContainer = styled.section`
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
`;
