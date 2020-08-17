import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserDetails({ user }) {
  const [details, setDetails] = React.useState([]);
  React.useEffect((id) => {
    axios.get(`http://localhost:3000/users` + id).then((res) => {
      console.log(res);
      console.log("dataa ", res.data);
    });
  }, []);

  return (
    <div>
      <Link to={"/"}> Back </Link>
      <h1> Details </h1>
    </div>
  );
}
