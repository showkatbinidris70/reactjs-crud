import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";

export default function Update() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();

  const [id, setID] = useState(null);

  const updateAPIData = () => {
    axios.put(`https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata/${id}`, {
      firstName,
      lastName,
    });
  };
  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setAge(localStorage.getItem("Age"));
  }, []);

  // Update an existing user
  const updateUser = async (id) => {
    try {
      const response = await fetch(
        `https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        }
      );
      const updatedUser = await response.json();
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata/:id"
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Button type="submit" onClick={updateUser}>
          Update
        </Button>
      </Form>
    </div>
  );
}
