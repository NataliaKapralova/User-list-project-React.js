import React from "react";
import * as styles from "../styles.css";
import axios from "axios";
import { useHistory } from "react-router";
import faker from "faker";

export default function EditUser(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

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
      <div className="form-container">
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Add user </button>
        </form>
      </div>
    </div>
  );
}
