import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LabList = ({ record, handleDelete, handleEdit, buttonIncluded }) => {
  return (
    <List>
      <Heading>{record.date}</Heading>
      <Container>
        <TextDiv>
          <Content>
            <Span>Test : </Span>
            {record.testArea}
          </Content>
          <Content>
            <Span>Test result : </Span>
            {record.testResult}
          </Content>
          <Content>
            <Span>Laboratory : </Span>
            {record.laboratoryName}
          </Content>
          <Content>
            <Span>Prescriber : </Span>
            {record.prescriber}
          </Content>
          <Content>
            <Span>Comment : </Span>
            {record.comment}
          </Content>
          {buttonIncluded === 'true' && (
            <BtnBox>
              <Reference to={`/my_labs/reference/${record._id}`}>
                Reference
              </Reference>
              <Update onClick={handleEdit}>Update</Update>
              <Delete onClick={handleDelete}>Delete</Delete>
            </BtnBox>
          )}
        </TextDiv>

        <ImageDiv>
          <PopUp>
            <Image src={record.fileURL} />
          </PopUp>
        </ImageDiv>
      </Container>
    </List>
  );
};
const List = styled.li`
  width: 100%;
  margin-bottom: 10px;
  color: black;
  font-size: 1rem;
  padding: 2.5%;
  background-color: var(--color-purple-gray);
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Heading = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px dotted var(--color-beige);
`;
const TextDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Content = styled.p`
  margin-bottom: 6px;
  font-size: 1rem;
`;
const Span = styled.span`
  font-size: 1rem;
  font-style: italic;
`;

const ImageDiv = styled.div`
  height: 230px;
`;
const PopUp = styled.div`
  height: 100%;
  cursor: zoom-in;
  transition: all 400ms ease-in-out;
  :active {
    transform: scale(1.5);
    opacity: 0.7;
  }
`;
const Image = styled.img`
  max-height: 100%;
  object-fit: contain;
`;
const BtnBox = styled.div`
  width: 220px;
  display: flex;
  justify-content: space-between;
  padding: 1% 0;
`;
const Update = styled.button`
  width: 30%;
  height: 30px;
  font-size: 0.9rem;
  background-color: var(--color-white);
  border-radius: 5px;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;
const Delete = styled(Update)`
  background-color: var(--color-cyan);
  :hover {
    transform: scale(1.1);
    background-color: var(--color-bright-red);
  }
`;
const Reference = styled(Link)`
  width: 32%;
  height: 30px;
  font-size: 0.9rem;
  color: var(--color-white);
  background-color: var(--color-dark-blue);
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  padding-top: 7px;
  transition: all 300ms ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

export default LabList;
