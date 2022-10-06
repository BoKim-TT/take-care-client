import React, { useState, useEffect,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MedList from './MedList';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { UserContext } from '../user/userContext';

const MedInfoPage = () => {
  // med record id
  const id = useParams().id;
  //fetched single record object
  const [record, setRecord] = useState({});
  //current user
   const {user} = useContext(UserContext);
   //fetched info object by med record (by generic name or brand name)
  const [info, setInfo] = useState({ author: null, entry: null });
  //redirect to previous page
  const navigate = useNavigate();

// fetch a med record by record id & user
  useEffect(() => {
    fetch(`https://take-care.herokuapp.com/data/med-records/${user.token}/${id}`)
      .then((res) => res.json())
      .then((data) => {
     
        if (data.status === 200) {
          setRecord(data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

//fetch MEDLINE api data by med record (generic or brand name )
  useEffect(() => {
    if (record._id) {
      fetch(`https://take-care.herokuapp.com/api/med-info`, {
        method: 'POST',
        body: JSON.stringify({
          name: record.genericName || record.brandName,
          form: record.dosageForm,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
         
          if (data.status === 200) {
            if (data.data.feed.entry.length > 0) {
              setInfo({
                author: data.data.feed.author.name._value,
                entry: data.data.feed.entry,
              });
            } else {
              setInfo({
                author: '',
                entry: [],
              });
            }
          }
        })
        .catch((error) => console.log(error));
    }
  }, [record]);



  return (
    <Wrapper>
      <Previous onClick={() => navigate(-1)}>
        <Icon></Icon>
      </Previous>
      <MedList key={record._id} record={record} buttonIncluded="false" />
      {info.entry && info.entry.length === 0 && (
        <Container>No info found about the medication! </Container>
      )}
      {info.entry && info.entry.length > 0 && (
        <Container>
          <Source>
            <Span>Source: </Span>
            {info.author}
          </Source>

          <Info key={info.entry[0].title._value}>
            <TextDiv>
              <Heading>{info.entry[0].title._value}</Heading>
              <Content>{info.entry[0].summary._value}</Content>
              <URL>
                <a href={info.entry[0].link[0].href}>
                  {' '}
                  {info.entry[0].link[0].href}{' '}
                </a>
              </URL>
            </TextDiv>
          </Info>
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
  margin-top: 10px;
  width: 100%;
  background-color: var(--color-white);
  border: 1px solid var(--color-dark-blue);
  color: var(--color-dark-gray);
  font-size: 13px;
  padding: 2%;
  border-radius: 5px;
`;
const Info = styled.div`
`;
const Source = styled.h3`
  text-align: right;
  color: var(--color-dark-blue);
`;
const Heading = styled.h1`
  margin-bottom: 15px;
  font-size: 18px;
`;
const TextDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  color: #73777b;
`;
export default MedInfoPage;
