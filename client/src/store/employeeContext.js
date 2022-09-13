import { createContext, useState } from "react";

export const employeeCtx = createContext({
  tabEmployees: [],
  addNewEmployee: () => {},
  removeOneEmployee: () => {},
  getEmployeeById: () => {},
  updateEmployee: () => {},
  getAllEmployees: () => {},
  updateImageEmployee: () => {},
  
});

function AddNewEmployeeContextProvider(props) {

  const [tabEmployees, setTabEmployees] = useState([]);
  function addNewEmployee  (newEmployee) {
      fetch("/api/staff", {
        method: "POST",
        body: JSON.stringify(newEmployee),
        headers: { "Content-Type": "application/json"},
      })
        .then((res) => {
          
          console.log("l'employé est bien ajouté");
          console.log(res);
        })
        .catch((err) => {
          
          console.log("erreur inconnue");
          console.log(err);

        });
        setTabEmployees((prev) => {
        return [...prev, newEmployee];
      });
    }
  function removeOneEmployee(id) {
    fetch(`/api/staff/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("l'employé est bien supprimé");
        console.log(res);


      })
      .catch((err) => {
        console.log("erreur removeOneEmployee");
        console.log(err);
      });
 
        getAllEmployees()
  
    ;
  }
  function getEmployeeById(id) {
    fetch(`/api/staff/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "multipart/form-data" },
    })
    return tabEmployees.find((c) => c._id === id);
  }
  function getAllEmployees() {


    fetch("/api/staff", {
      method: "GET",
      headers: { "Content-Type": "multipart/form-data"},
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabEmployees(data));
  }

  function updateEmployee(id, updatedC) {
    fetch(`/api/staff/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
   /*    headers: {  "Content-Type": "multipart/form-data" }, */
    })
      .then((res) => {
        console.log("l'employé est modifié");
      })
      .catch((err) => {
        console.log("erreur inconnue");
      });

        getAllEmployees()
    }
  function updateImageEmployee(id, updatedC) {
    fetch(`/api/staff/${id}/image`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
   /*    headers: {  "Content-Type": "multipart/form-data" }, */
    })
      .then((res) => {
        console.log("l'employé est modifié");
      })
      .catch((err) => {
        console.log("erreur inconnue");
      });

        getAllEmployees()
    }

  const context = {
    tabEmployees: tabEmployees,
    addNewEmployee: addNewEmployee,
    removeOneEmployee: removeOneEmployee,
    getEmployeeById: getEmployeeById,
    updateEmployee: updateEmployee,
    getAllEmployees: getAllEmployees,
    updateImageEmployee: updateImageEmployee,
  };
  return (
   <employeeCtx.Provider value={context}>
      {props.children}

   </employeeCtx.Provider>
  );
}
export default AddNewEmployeeContextProvider;
