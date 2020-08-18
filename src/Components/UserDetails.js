import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export default function UserDetails(props) {
  const [details, setDetails] = React.useState([]);

  // Get user details with ID
  React.useEffect(() => {
    const {
      match: { params },
    } = props;
    axios.get(`http://localhost:3000/users/` + params.id).then((res) => {
      let details = res.data;
      setDetails(details);
      console.log("Get request with user info ", res.data);
    });
  }, []);

  // Delete user request 
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

  return (
    <div>
      <DetailContainer>
        <h1> Details </h1>
        <ul className="collection">
          <li className="collection-item">ID : {details.id} </li>
          <li className="collection-item"> Firstname : {details.firstName} </li>
          <li className="collection-item"> Lastname : {details.lastName}</li>
          <li className="collection-item">Email: {details.email}</li>
        </ul>
        <Link className="btn" to={`/users/edit/${details.id}`}>
          {" "}
          Edit{" "}
        </Link>
        <Button className="btn red" onClick={() => onDelete(details.id)}>
          delete
        </Button>
      </DetailContainer>
    </div>
  );
}

const DetailContainer = styled.section`
  /* margin-top: 8px;
  margin-right: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  text-align: center;
`;

const Button = styled.button`
  /* margin-top: 8px;
  margin-right: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  margin: 10px;
`;
