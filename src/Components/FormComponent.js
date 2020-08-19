import React from "react";
import * as styles from "../styles.css";
import axios from "axios";
import faker from "faker";

export default function FormComponent(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [title, setTitle] = React.useState("");

  // handle input value
  const handleNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // post request for new user
  const addNewUser = async (newUser) => {
    const {
      match: { params },
    } = props;
    await axios
      .request({
        method: "post",
        url: `http://localhost:3000/users`,
        data: newUser,
      })
      .then((response) => {
        console.log("post request hoow", response);
        props.history.push("/");
      })
      .catch((err) => console.log(err));
    console.log(newUser);
  };
  //  create new user / add new user to array /
  const handleSubmit = async (event) => {
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      id: faker.random.uuid(),
      product: {
        id: faker.random.uuid(),
        title: title,
      },
    };
    event.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    addNewUser(newUser);
  };
  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1> Add user </h1>
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
              onChange={handleUserNameChange}
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
            <input
              value={title}
              onChange={handleTitleChange}
              type="text"
              name="title"
              placeholder="product"
            />
            <button className="btn" type="submit">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
