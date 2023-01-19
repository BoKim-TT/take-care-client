import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LabRecordContext } from './labRecordContext';
import LabList from './LabList';
import LabForm from './LabForm';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../user/userContext';

const Lab = () => {
  //labRecords states and functions from labRecords context
  const { labRecords, setLabRecords, deleteForm, addForm, message } =
    useContext(LabRecordContext);

  //current user
  const { user } = useContext(UserContext);

  //redirect to edit page
  const navigate = useNavigate();

  //initial state for lab record post form
  const [record, setRecord] = useState({
    date: '',
    laboratoryName: '',
    prescriber: '',
    testArea: '',
    testResult: '',
    comment: '',
    fileName: '',
    fileURL: '',
  });

  //simply redirect to lab edit page by clicking the update button
  const handleEdit = (id) => {
    navigate(`/my_labs/edit/${id}`);
  };

  return (
    <Wrapper>
      {!user.token && <Message>Please sign in to post a record</Message>}

      {user.token && (
        <>
          <LabForm submit="Post" record={record} setRecord={setRecord} />
          <History>
            {labRecords.length > 0 &&
              labRecords.map((record) => (
                <LabList
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
export default Lab;
