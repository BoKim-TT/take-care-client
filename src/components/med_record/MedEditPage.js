import React, { useState, useEffect, useContext } from 'react';
import styled  from 'styled-components';
import ImageFileInput from '../util/ImageFileInput';
import { useParams, useNavigate } from 'react-router-dom';
import MedList from './MedList';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { MedRecordContext } from './medRecordContext';
import { UserContext } from '../user/userContext';
import MedForm from './MedForm';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const MedEditPage = () => {
  

  //current user
  const { user } = useContext(UserContext);

  //single med record id
  const id = useParams().id;

  // single med record state from fetch result
  const [record, setRecord] = useState({});

  //redirect to meds page
  const navigate = useNavigate();

  // get a single med record by record id and user
  useEffect(() => {
    fetch(`${API_ENDPOINT}/data/med-records/${user.token}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setRecord(data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Wrapper>
      <Previous onClick={() => navigate(-1)}>
        <Icon></Icon>
      </Previous>
      <MedList key={record._id} record={record} buttonIncluded="false" />
      <MedForm  record={record} setRecord={setRecord} submit="Edit"/>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 1% 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Previous = styled.button`
  margin: 20px;
  background-color: transparent;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  :hover {
    color: var(--color-bright-red);
    transform: scale(1.3);
  }
`;
const Icon = styled(MdOutlineArrowBackIos)`
  font-size: 20px;
`;

export default MedEditPage;
