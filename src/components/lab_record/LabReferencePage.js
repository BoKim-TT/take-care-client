import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LabForm from './LabForm';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { useContext } from 'react';
import { UserContext } from '../user/userContext';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const LabReferencePage = () => {
  // record id
  const id = useParams().id;
  // current user
  const { user } = useContext(UserContext);
  // fetched lab record object
  const [record, setRecord] = useState({});
  // error message 
  const [error, setError] = useState(null);
  // fetched reference info ( author & entry part)
  const [reference, setReference] = useState({ author: null, entry: null });
  const navigate = useNavigate();
  const summaryRef = useRef(null);

// fetch a lab record by user & record Id
  useEffect(() => {
    fetch(`${API_ENDPOINT}/data/lab-records/${user.token}/${id}`)
    .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setRecord(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

   // fetch api lab info from medline plus by lab record (test area)
  useEffect(() => {
    if (record._id) {
      fetch(`${API_ENDPOINT}/api/lab-info`, {
        method: 'POST',
        body: JSON.stringify({
          test: record.testArea,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
        
          if (data.status === 200) {
            const result = data.data.feed;
            if (result.entry.length > 0) {
              setReference({
                author: result.author.name._value,
                entry: result.entry,
              });
            } else {
              setReference({
                author: '',
                entry: [],
              });
            }
          }
        })
        .catch((error) => console.log(error));
    }
  }, [record]);


// change html data from api to js
  useEffect(() => {
    if (reference.entry && reference.entry.length > 0) {
      summaryRef.current.innerHTML = reference.entry[0].summary._value;
    }
  }, [reference]);

  return (
    <Wrapper>
      <Previous onClick={() => navigate(-1)}>
        <Icon></Icon>
      </Previous>
      <LabForm record={record} setRecord={setRecord} submit="Edit"/>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {reference.entry && reference.entry.length === 0 && (
        <Container>No info found about the test result! </Container>
      )}
      {reference.entry && reference.entry.length > 0 && (
        <Container>
          <Heading>{reference.entry[0].title._value}</Heading>
          <Source>
            <Span>Source : </Span>
            {reference.author}
          </Source>
          <URL>
            <a href={reference.entry[0].link[0].href}>
              <Span>Source link : </Span>
              {reference.entry[0].link[0].href}{' '}
            </a>
          </URL>

          <Content ref={summaryRef}></Content>
        </Container>
      )}
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
const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  background-color: var(--color-white);
  border: 1px solid var(--color-dark-blue);
  color: var(--color-dark-gray);
  font-size: 13px;
  padding: 2%;
  border-radius: 5px;
`;
const Source = styled.h3`
  color: var(--color-dark-blue);
`;
const Heading = styled.h1`
  margin-bottom: 15px;
  font-size: 18px;
`;

const URL = styled.div`
  margin: 15px 0;
  color: var(--color-cyan);
`;
const Content = styled.p`
  margin-bottom: 6px;
  line-height: 1.5em;
`;
const Span = styled.span`
  font-weight: 600;
 
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
export default LabReferencePage;
