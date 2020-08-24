import React from "react";
import * as styles from "../styles.css";
import axios from "axios";
import faker from "faker";
import Dropdown from "./Dropdown";

export default function FormComponent(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [skill, setSkill] = React.useState("");
  const [optionalSkill, setOptionalSkill] = React.useState("");

  const [dataOfProducts, setDataOfProducts] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/products`).then((res) => {
      let dataOfProducts = res.data;
      setDataOfProducts(dataOfProducts);
      console.log("hoi", dataOfProducts);
    });
  }, []);

  // handle input value change
  const handleNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSkillChange = (e) => {
    setSkill(skill);
  };

  const handleOptionalSkillChange = (e) => {
    setOptionalSkill(e.target.value);
  };

  // const handleInputChange = (e) => {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   setValues({
  //     [name]: value,
  //   });
  // };

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
              placeholder="Name*"
              name="name"
              required
            />
            <input
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              type="text"
              placeholder="lastname*"
              required
            />
            <input
              value={email}
              onChange={handleEmailChange}
              type="text"
              name="email"
              placeholder="Email*"
              required
            />
            <input
              value={title}
              onChange={handleTitleChange}
              type="text"
              name="title"
              placeholder="product"
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
