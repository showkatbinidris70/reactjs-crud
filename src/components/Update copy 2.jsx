import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Update() {
  const [users, setUsers] = useState({ id: null, firstName: "", lastName: "" });

  const { id } = useParams();

  useEffect(() => {
    findById();
  }, []);

  const findById = () => {
    axios
      .get(`https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata` + id)
      .then((response) => {
        setUsers({
          ...response.data,
        });
      })
      .catch((error) => console.log(error));
  };

  // Update an existing user

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata/` + id, users)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("Data updated successfully");
      })
      .catch(function (error) {
        console.error(error);
        console.log("Did not update");
      });
    console.log(users);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsers((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const updateUser = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata/{id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(id),
  //       }
  //     );
  //     const updatedUser = await response.json();
  //     const updatedUsers = users.map((user) =>
  //       user.id === updatedUser.id ? updatedUser : user
  //     );
  //     setUsers(updatedUsers);
  //     setSelectedUser(null);
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };

  return (
    <div>
      <Form onSubmit={handleUpdate} className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            type="text"
            value={users.firstName}
            className="form-control"
            name="firstName"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            type="text"
            value={users.lastName}
            className="form-control"
            name="lastName"
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit" value="update">
          update
        </Button>
      </Form>
    </div>
  );
}
