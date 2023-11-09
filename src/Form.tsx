import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import firebaseApp from "./FirebaseConfig";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    coursesDone: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      coursesDone: checked
        ? [...formData.coursesDone, name]
        : formData.coursesDone.filter((course) => course !== name),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Submit data to Firebase
    const database = getDatabase(firebaseApp);
    const dataRef = ref(database, "formData");

    push(dataRef, formData)
      .then(() => {
        console.log("Data submitted successfully");
        setFormData({
          firstName: "",
          lastName: "",
          idNumber: "",
          coursesDone: [],
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Data Form</h1>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="idNumber"
        placeholder="ID Number"
        value={formData.idNumber}
        onChange={handleInputChange}
      />
      <div>
        <label>
          APT
          <input
            type="checkbox"
            name="APT"
            checked={formData.coursesDone.includes("APT")}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          IST
          <input
            type="checkbox"
            name="IST"
            checked={formData.coursesDone.includes("IST")}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          IR
          <input
            type="checkbox"
            name="IR"
            checked={formData.coursesDone.includes("IR")}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
