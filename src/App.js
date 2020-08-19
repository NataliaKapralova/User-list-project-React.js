// import * as React from "react";
// import * as api from "./api";

// function App() {
//   const [products, setProducts] = React.useState([]);
//   const [users, setUsers] = React.useState([]);

//   React.useEffect(() => {
//     async function fetch() {
//       const products = await api.getProducts();
//       console.log("all products", products);

//       const newProduct = await api.createProduct("Patat");
//       console.log("created product", newProduct);

//       let users = await api.getUsers();
//       console.log("all users", users);

//       const createdUser = await api.createUser({
//         firstName: "Erik",
//         lastName: "Verweij",
//         products: [products[0].id, products[1].id],
//       });
//       console.log("created user", createdUser);
//       users = await api.getUsers();
//       console.log("user count is now", users.length);

//       const updatedUser = await api.updateUser(createdUser.id, {
//         ...createdUser,
//         firstName: "Jan",
//         products: [
//           ...createdUser.products.map((product) => product.id),
//           newProduct.id,
//         ],
//       });
//       console.log("updated user", updatedUser);

//       await api.deleteUser(createdUser.id);
//       console.log("deleted user with id", createdUser.id);
//       users = await api.getUsers();
//       console.log("user count is now", users.length);

//       console.log("DONE!");
//     }
//     fetch();
//   }, []);

//   return <div></div>;
// }

// export default App;

import React from "react";
import Users from "./Components/Users";
import FormComponent from "./Components/FormComponent";
import UserDetails from "./Components/UserDetails";
import EditUser from "./Components/EditUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" exact component={Users} />
        <Route exact path="/Formcomponent/" component={FormComponent} />
        <Route exact path="/users/edit/:id" component={EditUser} />
        <Route exact path="/users/:id" component={UserDetails} />
      </Switch>
    </Router>
  );
}
