import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Read() {
  const [APIData, setAPIData] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata"
      );
      const data = await response.json();
      setAPIData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const setData = (data) => {
    let { id, firstName, lastName } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
  };

  // delete operation
  const deleteUser = async (id) => {
    try {
      await fetch(
        `https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata/${id}`,
        {
          method: "DELETE",
        }
      );
      const updatedUsers = APIData.filter((user) => user.id !== id);
      setAPIData(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Link to="/update">
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => deleteUser(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
