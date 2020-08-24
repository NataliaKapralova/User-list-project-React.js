import React from "react";
import * as styles from "../styles.css";
import axios from "axios";
import faker from "faker";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function EditUser(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [skill, setSkill] = React.useState("");
  const [optionalSkill, setOptionalSkill] = React.useState("");

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

  const handleProductChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSkillChange = (e) => {
    setSkill(skill);
    console.log("woorks ", skill);
  };

  const handleOptionalSkillChange = (e) => {
    setOptionalSkill(e.target.value);
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
      setTitle(res.data.product.title);
      setSkill(res.data.skill);
      setOptionalSkill(res.data.optionalSkill);
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
        props.history.push(`/users/` + params.id);
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
      skill: skill,
      optionalSkill: optionalSkill,
      product: {
        id: faker.random.uuid(),
        title: title,
      },
    };
    event.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    editUser(newUser);
  };

  // const {
  //   match: { params },
  // } = props;

  return (
    <div>
      {/* <Link to={`/users/edit/${params.id}`}> Click </Link> */}
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
            <input
              value={title}
              onChange={handleProductChange}
              type="text"
              name="product"
              placeholder="Product"
            />
            <Dropdown
              value={skill}
              setSkill={setSkill}
              handleSkillChange={handleSkillChange}
            />
            <input
              onChange={handleOptionalSkillChange}
              value={optionalSkill}
              name="Optional skill"
              placeholder="Other skill **optional"
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
