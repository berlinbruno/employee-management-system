import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeServices";
import { useNavigate, useParams } from "react-router-dom";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {

      const employee = { firstName, lastName, email };
      console.log(employee);
      
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is Required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is Required";
      valid = false;
    }

    if (email.trim() && email.includes("@")) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is Required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className=" text-center ">Update Employee</h2>;
    } else {
      return <h2 className=" text-center ">Add Employee</h2>;
    }
  }

  return (
    <div className=" container ">
      <br />
      <div className=" row ">
        <div className="card col-md-6 offset-md-3 offset-md-3  ">
          {pageTitle()}
          <div className=" card-body ">
            <form action="">
              <div className=" form-group mb-2 ">
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className=" invalid-feedback ">{errors.firstName}</div>
                )}
              </div>
              <div className=" form-group mb-2 ">
                <label>Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  value={lastName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className=" invalid-feedback ">{errors.lastName}</div>
                )}
              </div>
              <div className=" form-group mb-2 ">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email"
                  value={email}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className=" invalid-feedback ">{errors.email}</div>
                )}
              </div>
              <button
                type="button"
                className=" btn  btn-success "
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
