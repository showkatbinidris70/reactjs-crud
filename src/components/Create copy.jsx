import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "semantic-ui-react";

export default function Create() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata",
        user
      );

      console.log("User created successfully:", response.data);
      setUser({
        user,
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            name="firstName"
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            name="lastName"
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
