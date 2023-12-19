import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Update() {
  const [products, setProducts] = useState({
    id: null,
    firstName: "",
    lastName: "",
  });

  const { id } = useParams();

  useEffect(() => {
    findById();
  }, []);

  const findById = () => {
    axios
      .get(`https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata/` + id)
      .then((response) => {
        setProducts({
          ...response.data,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(
        `https://64a66922096b3f0fcc7fb7e6.mockapi.io/userdata/` + id,
        products
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("Data updated successfully");
      })
      .catch(function (error) {
        console.error(error);
        console.log("Did not update");
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
      <form className="m-5" onSubmit={handleUpdate}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-6">
            <input
              type="text"
              value={products.firstName}
              className="form-control"
              name="firstName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-6">
            <input
              type="text"
              value={products.lastName}
              className="form-control"
              name="lastName"
              onChange={handleChange}
            />
          </div>
        </div>
        <input type="submit" value="Update" className="btn btn-success" />
      </form>
    </div>
  );
}
