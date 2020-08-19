import React from "react";
import * as styles from "../styles.css";
import axios from "axios";
import faker from "faker";
import { Link } from "react-router-dom";

export default function EditUser(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  //handle input value
  const handleNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  //fetch user ID

  React.useEffect(() => {
    const {
      match: { params },
    } = props;
    axios.get(`http://localhost:3000/users/` + params.id).then((res) => {
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      console.log("Get request with user info ", res.data);
    });
  }, []);

  // Edit user
  const editUser = async (newUser) => {
    const {
      match: { params },
    } = props;
    await axios
      .request({
        method: "put",
        url: `http://localhost:3000/users/` + params.id,
        data: newUser,
      })
      .then((response) => {
        console.log("post request hoow", response);
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  // add user to list and reset form

  const handleSubmit = async (event) => {
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      id: faker.random.uuid(),
    };
    event.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    editUser(newUser);
  };
  return (
    <div>
      <Link className="btn grey" to={"/"}>
        {" "}
        Back{" "}
      </Link>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1> Edit user </h1>
          <div className="input-field">
            <input
              value={firstName}
              onChange={handleNameChange}
              type="text"
              placeholder="Name"
              name="name"
            />
            <input
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              type="text"
              placeholder="lastname"
            />
            <input
              value={email}
              onChange={handleEmailChange}
              type="text"
              name="email"
              placeholder="Email"
            />
            <button className="btn" type="submit">
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
