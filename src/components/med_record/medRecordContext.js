import { useState, createContext,useContext } from 'react';
import { UserContext } from '../user/userContext';
export const MedRecordContext = createContext(null);

export const MedRecordProvider = ({ children }) => {
  // all med records under current user
  const [medRecords, setMedRecords] = useState([]);
  //current user
  const { user } = useContext(UserContext);

// POST request : add a record
  const addForm = (form) => {
   
    fetch(`https://take-care.herokuapp.com/data/med-records/${user.token}`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
     
        if (data.status === 200) {
          setMedRecords([data.data, ...medRecords]);
        }
      })
      .catch((error) => console.log(error));
  };

// PATCH request : update a record
  const editForm = (update) => {

    fetch(`https://take-care.herokuapp.com/data/med-records/${user.token}/${update._id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // if successful, update FE state of medRecords
        if (data.status === 200) {
          const copy = [...medRecords];
          const updatedRecords = copy.map((record) => {
            if (record._id !== update._id) {
              return record;
            } else {
              return { ...update };
            }
          });
          setMedRecords(updatedRecords);
        }
      })
      .catch((error) => console.log(error));
  };
 
// DELETE request :delete a record
  const deleteForm = (id) => {
   
    fetch(`https://take-care.herokuapp.com/data/med-records/${user.token}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
         // if successful, update FE state of medRecords
        if (data.status === 200) {
          const copy = [...medRecords];
          const updated = copy.filter((record) => record._id !== id);
          setMedRecords(updated);
        }
      })
      .catch((error) => console.log(error));
  };


  return (
    <MedRecordContext.Provider
      value={{ medRecords, setMedRecords, addForm, deleteForm, editForm }}
    >
      {children}
    </MedRecordContext.Provider>
  );
};
