import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "./FirebaseConfig";

function Table() {
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    // Initialize Firebase and create a reference to the data
    const database = getDatabase(firebaseApp);
    const dataRef = ref(database, "formData");

    // Fetch data from Firebase when the component mounts
    onValue(dataRef, (snapshot) => {
      const dataVal = snapshot.val();
      if (dataVal) {
        const dataArray = Object.values(dataVal);
        setTableData(dataArray);
      }
    });
  }, []);

  return (
    <div>
      <h1>Student Info</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>ID Number</th>
            <th>Courses Done</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((entry: any, index) => (
            <tr key={index}>
              <td>{entry.firstName}</td>
              <td>{entry.lastName}</td>
              <td>{entry.idNumber}</td>
              <td>{entry.coursesDone.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
