import React, {  useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import LabList from './LabList';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { UserContext } from '../user/userContext';
import LabForm from './LabForm';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const LabEditPage = () => {
  const { user } = useContext(UserContext);

  // id from params
  const id = useParams().id;

  //error state for alert message
  const [error, setError] = useState(null);

  //single record state for update
  const [record, setRecord] = useState({
  });

  const navigate = useNavigate();

// when labEdit page opens with id param, fetch a single lab record from backend
  useEffect(() => {
    fetch(`${API_ENDPOINT}/data/lab-records/${user.token}/${id}`)
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
      <LabList key={record._id} record={record} buttonIncluded="false" />
      <LabForm record={record} setRecord={setRecord} submit="Edit"/>
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
  position: relative;
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

const ErrorMessage = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-bright-red);
  opacity: 0.7;
  padding: 20px;
  z-index: 3;
  text-align: center;
`;
export default LabEditPage;
