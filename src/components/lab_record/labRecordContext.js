import { useState, createContext,useContext, useEffect } from 'react';
import { UserContext } from '../user/userContext';

export const LabRecordContext = createContext(null);

export const LabRecordProvider = ({ children }) => {
  //all the labRecords under user
  const [labRecords, setLabRecords] = useState([]);
  //message state for alert message
  const [message, setMessage] = useState(null);
  //current user
  const {user} =useContext(UserContext)


//get labRecords request by user change
  useEffect(() => {
    if (user.token) {
      fetch(`https://take-care.herokuapp.com/data/lab-records/${user.token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const sorted = data.data.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            setLabRecords(sorted);
          } else {
             setLabRecords([])
            setMessage(data.message);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

 //post a new lab record
  const addForm = (form) => {
   
    fetch(`https://take-care.herokuapp.com/data/lab-records/${user.token}`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
    
        if (data.status === 200) {
          setLabRecords([data.data, ...labRecords]);
        }
      })
      .catch((error) => console.log(error));
  };

 // update a lab record
  const editForm = (update) => { 

    fetch(`https://take-care.herokuapp.com/data/lab-records/${user.token}/${update._id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
       
       //update the FE labrecords state
        if (data.status === 200) {
          const copy = [...labRecords];
          const updatedRecords = copy.map((record) => {
            if (record._id !== update._id) {
              return record;
            } else {
              return { ...update };
            }
          });
          setLabRecords(updatedRecords);
        }
      })
      .catch((error) => console.log(error));
  };


//delete a lab record of user
  const deleteForm = (id) => {
   
    fetch(`https://take-care.herokuapp.com/data/lab-records/${user.token}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
       
       //update the FE labRecords state
        if (data.status === 200) {
          const copy = [...labRecords];
          const updated = copy.filter((record) => record._id !== id);
          setLabRecords(updated);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <LabRecordContext.Provider
      value={{ labRecords, setLabRecords, addForm, deleteForm, editForm , message}}
    >
      {children}
    </LabRecordContext.Provider>
  );
};
