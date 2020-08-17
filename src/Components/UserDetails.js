import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserDetails(props) {
  const [details, setDetails] = React.useState([]);
  React.useEffect((id) => {
    const {
      match: { params },
    } = props;
    axios.get(`http://localhost:3000/users/` + params.id).then((res) => {
      let details = res.data;
      setDetails(details);
      console.log("Get request with user info ", res.data);
    });
  }, []);
  console.log(details);
  return (
    <div>
      <Link to={"/"}> Back </Link>
      <h1> {details.firstName} </h1>
      <p>{details.email}</p>
    </div>
  );
}
