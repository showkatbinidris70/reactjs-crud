import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "semantic-ui-react";

export default function Create() {
  const [products, setProducts] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata", products)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("Data saved successfully");
      })
      .catch(function (error) {
        console.error(error);
        console.log("Did not save");
      });
    console.log(products);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProducts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
