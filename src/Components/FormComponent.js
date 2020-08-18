import React from "react";
import * as styles from "../styles.css";
import axios from "axios";
import { useHistory } from "react-router";
import faker from "faker";

export default function FormComponent(props) {
  const history = useHistory();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const addNewUser = async (newUser) => {
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

  // React.useEffect(() => {
  //   const {
  //     match: { params },
  //   } = props;
  //   axios.get(`http://localhost:3000/users/` + params.id).then((res) => {
  //     let details = res.data;
  //     setDetails(details);
  //     console.log("Get request with user info ", res.data);
  //   });
  // }, []);

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
    addNewUser(newUser);
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
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
