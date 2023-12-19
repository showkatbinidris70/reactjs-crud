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
  const handleDelete = (id) => {
    axios.delete(`https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata/` + id);
    // instant delete start
    const updatedUsers = APIData.filter((user) => user.id !== id);
    setAPIData(updatedUsers)
      // instant delete end
      .then((response) => {
        console.log(response.data);
        alert("Data Deleted successfully");
        getAllProducts();
      })
      .catch(function (error) {
        console.error(error);
        console.log("Did not delete");
      });
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
                <Table.Cell>
                  <Link
                    to={"/update/" + data.id}
                    onClick={() => setData(data)}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
