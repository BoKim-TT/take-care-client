import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MedList = ({ record, handleDelete, handleEdit, buttonIncluded }) => {
  return (
    <List>
      <Heading>{record.date}</Heading>
      <Container>
        <TextDiv>
          <Content>
            <Span>Brand name: </Span>
            {record.brandName}
          </Content>
          <Content>
            <Span>Generic name: </Span>
            {record.genericName}
          </Content>
          <Content>
            <Span>Direction: </Span>
            {record.direction}
          </Content>
          <Content>
            <Span>Prescriber: </Span>
            {record.prescriber}
          </Content>
          <Content>
            <Span>Dosage form: </Span>
            {record.dosageForm}
          </Content>
          <Content>
            <Span>Comment: </Span>
            <br></br>
            <Comment>{record.comment}</Comment>
          </Content>
          {buttonIncluded === 'true' && (
            <BtnBox>
              <Info to={`/my_meds/info/${record._id}`}>Info</Info>
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
  font-size: 12px;
  padding: 2.5%;
  /* border-radius: 5px; */
  background-color: var(--color-dark-beige);
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Heading = styled.div`
  width: 100%;
  font-weight: 600;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid white;
`;
const TextDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Content = styled.p`
  margin-bottom: 6px;
`;
const Span = styled.span`
  font-size: 13px;
  font-style: italic;

`;
const Comment = styled.p`
line-height: 18px;
`
const ImageDiv = styled.div`
  height: 230px;
`;
const PopUp = styled.div`
  height: 100%;
  cursor: zoom-in;
  transition: all 600ms ease-in-out;
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
  width: 200px;
  display: flex;
  justify-content: space-between;
  padding: 1% 0;
`;
const Update = styled.button`
  width: 30%;
  height: 30px;
  font-size: 12px;
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
const Info = styled(Link)`
  width: 30%;
  height: 30px;
  font-size: 12px;
  color: var(--color-white);
  background-color: var(--color-dark-blue);
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  padding-top: 6px;
  transition: all 300ms ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

export default MedList;
