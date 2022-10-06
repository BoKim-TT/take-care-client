import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import MedForm from './MedForm';
import MedList from './MedList';
import { useNavigate } from 'react-router-dom';
import { MedRecordContext } from './medRecordContext';
import { UserContext } from '../user/userContext';

const Meds = () => {
  //medRecords states and functions from medRecords context
  const { medRecords, setMedRecords, addForm, deleteForm } =
    useContext(MedRecordContext);

  //current user
  const { user } = useContext(UserContext);

  //redirect to edit page
  const navigate = useNavigate();

  //message state for alert message
  const [message, setMessage] = useState(null);

  const [record, setRecord] = useState({
    date: '',
    brandName: '',
    genericName: '',
    dosageForm: '',
    direction: '',
    prescriber: '',
    comment: '',
    fileName: '',
    fileURL: '',
  });

  //get medRecords request by user change
  useEffect(() => {
    if (user.token) {
      fetch(`https://take-care.herokuapp.com/data/med-records/${user.token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const sorted = data.data.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            setMedRecords(sorted);
          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  //simply redirect to lab edit page by clicking the update button
  const handleEdit = (id) => {
    navigate(`/my_meds/edit/${id}`);
  };

  return (
    <Wrapper>
      {!user.token && <Message>Please sign in to post a record</Message>}
      {user.token && (
        <>
          <MedForm record={record} setRecord={setRecord} submit="Post" />
          <History>
            {medRecords.length === 0 && <Message>{message}</Message>}
            {medRecords.length > 0 &&
              medRecords.map((record) => (
                <MedList
                  key={record._id}
                  record={record}
                  handleDelete={() => deleteForm(record._id)}
                  handleEdit={() => handleEdit(record._id)}
                  buttonIncluded="true"
                />
              ))}
          </History>
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 5%;
`;
const Message = styled.div`
  width: 100%;
  background-color: var(--color-white);
  border: 1px solid var(--color-dark-blue);
  margin-bottom: 10px;
  color: var(--color-bright-red);
  font-size: 13px;
  text-align: center;
  padding: 2%;
  border-radius: 5px;
`;
const History = styled.div`
  width: 100%;
  margin: 30px auto;
`;
export default Meds;
