import faker from "faker";

const API_WAIT_TIME_MS = 750;

let apiProducts = Array(20).fill(null).map(generateProduct);
let apiUsers = Array(20).fill(null).map(generateUser);

function pickRandomProducts() {
  const result = [];

  Array(Math.floor((Math.random() / 2) * 10))
    .fill(null)
    .forEach(() => {
      while (true) {
        const product = faker.random.arrayElement(apiProducts);

        if (!result.includes(product)) {
          result.push(product);
          return;
        }
      }
    });

  return result;
}

function generateUser() {
  return {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    products: pickRandomProducts(),
  };
}

function generateProduct() {
  return {
    id: faker.random.uuid(),
    title: faker.commerce.product(),
  };
}

function wait() {
  return new Promise((resolve) => setTimeout(resolve, API_WAIT_TIME_MS));
}

function throwError(msg) {
  throw new Error(msg);
}

function throwMissingProperty(entity, property) {
  throwError(
    `Please provide the propery "${property}" in the type of "${entity}"`
  );
}

/**
 * Endpoints
 */

export async function getUsers() {
  await wait();

  return apiUsers.map((user) => ({ ...user }));
}

export async function createUser({ firstName, lastName, products }) {
  await wait();

  const newUser = {
    id: faker.random.uuid(),
    firstName,
    lastName,
    products: [],
  };

  // check if all the required properties are provided...
  if (!firstName) {
    throwMissingProperty("User", "firstName");
  }
  if (!lastName) {
    throwMissingProperty("User", "lastName");
  }
  if (!products) {
    throwMissingProperty("User", "products");
  }

  // check if the productIds are valid
  for (const productId of products) {
    if (!productId || typeof productId !== "string") {
      throw new Error(
        "Make sure that each item in the product array is of type string"
      );
    }

    if (!Boolean(apiProducts.find((product) => product.id === productId))) {
      throw new Error(`Could not find product with id "${productId}"`);
    }

    newUser.products.push({
      ...apiProducts.find((product) => product.id === productId),
    });

    apiUsers.push({ ...newUser });

    return newUser;
  }
}

export async function updateUser(id, { firstName, lastName, products }) {
  await wait();

  let index = apiUsers.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new Error(`could not find user with id "${id}"`);
  }

  // check if all the required properties are provided...
  if (!firstName) {
    throwMissingProperty("User", "firstName");
  }
  if (!lastName) {
    throwMissingProperty("User", "lastName");
  }
  if (!products) {
    throwMissingProperty("User", "products");
  }

  const currentUser = {
    id,
    firstName,
    lastName,
    products: [],
  };

  // check if the productIds are valid
  for (const productId of products) {
    if (!productId || typeof productId !== "string") {
      throw new Error(
        "Make sure that each item in the product array is of type string"
      );
    }

    if (!Boolean(apiProducts.find((product) => product.id === productId))) {
      throw new Error(`Could not find product with id "${productId}"`);
    }

    currentUser.products.push({
      ...apiProducts.find((product) => product.id === productId),
    });

    apiUsers.splice(index, 1, { ...currentUser });

    return currentUser;
  }
}

export async function deleteUser(id) {
  await wait();

  let index = apiUsers.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new Error(`could not find user with id "${id}"`);
  }

  apiUsers.splice(index, 1);
}

export async function getProducts() {
  await wait();

  return [...apiProducts.map((product) => ({ ...product }))];
}

export async function createProduct(title) {
  await wait();

  if (!title) {
    throwMissingProperty("Product", "title");
  }

  const newProduct = {
    id: faker.random.uuid(),
    title,
  };

  apiProducts.push({ ...newProduct });

  return newProduct;
}
