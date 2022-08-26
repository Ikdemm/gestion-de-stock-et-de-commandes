import { createContext, useState } from "react";

export const employeeCtx = createContext({
  tabEmployees: [],
  addNewEmployee: () => {},
  removeOneEmployee: () => {},
  getEmployeeById: () => {},
  updateEmployee: () => {},
  getAllEmployees: () => {},
});

function AddNewEmployeeContextProvider(props) {

  const [tabEmployees, setTabEmployees] = useState([]);
  const addNewEmployee = async (newEmployee) => {
    const options = {
      method: 'POST',
      body: newEmployee,
      //body: JSON.stringify(newEmployee),
      headers: {
        "Content-Type": "multipart/form-data; boundary=AaB03x" +
        "--AaB03x" +
        "Content-Disposition: file" +
        "Content-Type: png" +
        "Content-Transfer-Encoding: binary" +
        "...data... " +
        "--AaB03x--",
        "Accept": "application/json",
        "type": "formData"
      },
    }
    setTabEmployees((prev) => {
      return [...prev, newEmployee];
    }) 
    try {
      const response = await fetch("/api/staff", options)
      const json = await response.json()
      if (response.status !== 201) {
        throw new Error(json.message)
      }
      return json
    } catch (err) {
      console.log('Error add new employee', err.message)
      return { error: err.message }
    }
    
  } 
 /* function addNewEmployee(newEmployee) {
    fetch("/api/staff", {
      method: "POST",
  
    body: JSON.stringify(newEmployee),
    //body: FormData,
     headers: { 
      "Content-Type": "multipart/form-data" }
   
    })
  })
      .then((res) => {

        alert("l'employé est bien ajouté");
        console.log(res);
      })
      .catch((err) => {
        alert("erreur avec addNewEmployee");
        console.log(err);
      });
    setTabEmployees((prev) => {
      return [...prev, newEmployee];
    });
  } */
  function removeOneEmployee(id) {
    fetch(`/api/staff/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        alert("l'employé est bien supprimé");
        console.log(res);


      })
      .catch((err) => {
        alert("erreur removeOneEmployee");
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
        alert("l'employé est modifié");
      })
      .catch((err) => {
        alert("erreur inconnue");
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
  };
  return (
   <employeeCtx.Provider value={context}>
      {props.children}

   </employeeCtx.Provider>
  );
}
export default AddNewEmployeeContextProvider;
