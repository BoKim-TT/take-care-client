import React, { useState } from 'react';
import { useContext } from 'react';
import styled, { css } from 'styled-components';
import ImageFileInput from '../util/ImageFileInput';
import { MedRecordContext } from './medRecordContext';
import { useNavigate } from 'react-router-dom';

const MedForm = ({ record, setRecord, submit }) => {
  const [error, setError] = useState(null);

  // medRecordContext functions for fetch actions
  const { addForm, editForm } = useContext(MedRecordContext);
  //redirect to edit page
  const navigate = useNavigate();

  //validation check before submit form
  const validationCheck = (form) => {
    if (!form.date || (!form.brandName && !form.genericName)) {
      setError(
        'Please fill in the required area : date, either brand name or generic name'
      );
      setTimeout(() => {
        setError(null);
        return;
      }, 3500);
    }
  };

  //submit by clicking edit button
  const onSubmit = (ev) => {
    ev.preventDefault();
    validationCheck(record);

    if (ev.target.innerHTML === 'Post') {
      //post request
      addForm(record);
      setRecord({
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
    } else if (ev.target.innerHTML === 'Edit') {
      //update request in the MedRecordContext
      editForm(record);
      //redirect to the mymeds page
      navigate('/my_meds');
    }
  };

  // update input field state
  const onChange = (ev) => {
    if (ev.currentTarget == null) {
      return;
    }
    ev.preventDefault();
    setRecord({ ...record, [ev.currentTarget.name]: ev.currentTarget.value });
  };

  // update file state
  const onFileChange = (file) => {
    setRecord((record) => {
      return { ...record, fileName: file.name, fileURL: file.url };
    });
  };

  return (
    <Container>
      <Form>
        <InputShort
          type="date"
          name="date"
          value={record.date}
          onChange={onChange}
        />
        <InputShort
          type="text"
          name="brandName"
          value={record.brandName}
          onChange={onChange}
          placeholder="Brand name"
        />
        <InputShort
          type="text"
          name="genericName"
          value={record.genericName}
          onChange={onChange}
          placeholder="Ingredient name"
        />
        <Select
          name="dosageForm"
          value={record.dosageForm}
          onChange={onChange}
          placeholder="dosage form"
        >
          <Option defaultValue="Choose dosage form">Choose dosage form</Option>
          <Option value="oral">oral</Option>
          <Option value="topical">topical</Option>
          <Option value="inhalation">inhalation</Option>
          <Option value="ophthalmic">ophthalmic</Option>
          <Option value="injection">injection</Option>
          <Option value="oral">rectal</Option>
          <Option value="other">other</Option>
        </Select>
        <InputLong
          type="text"
          name="direction"
          value={record.direction}
          onChange={onChange}
          placeholder="Direction"
        />
        <InputShort
          type="text"
          name="prescriber"
          value={record.prescriber}
          onChange={onChange}
          placeholder="Prescriber"
        />
        <TextArea
          name="comment"
          value={record.comment}
          onChange={onChange}
          placeholder="Comment"
        />
        <FileDiv>
          <ImageFileInput fileUpload={onFileChange} name={record.fileName} />
        </FileDiv>

        <SumbitBtn onClick={onSubmit}>{submit}</SumbitBtn>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;
const Form = styled.form`
  margin-top: 15px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  font-size: 1rem;
`;
const focusBorder = css`
  :focus {
    outline: none !important;
    border: 1px solid var(--color-bright-red);
  }
`;
const inputFont = css`
  padding: 0.7em;
  font-size: 1rem;
`;

const InputShort = styled.input`
  flex: 1 1 20%;
  ${inputFont}
  ${focusBorder}
`;

const InputLong = styled.input`
  flex: 1 1 50%;
  ${inputFont}
  ${focusBorder}
`;
const Select = styled.select`
  flex: 1 1 30%;
  ${inputFont}
  ${focusBorder}
`;
const Option = styled.option``;
const FileDiv = styled.div`
  height: 40px;
  flex: 1 1 50%;
  font-size: 1rem;
  border-right: 1px solid var(--color-dark-blue);
`;
const TextArea = styled.textarea`
  flex-basis: 100%;
  height: 100px;
  ${inputFont}
  ${focusBorder}
`;
const SumbitBtn = styled.button`
  background-color: var(--color-cyan);
  flex: 1 1 50%;
  height: 40px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 300ms ease-in;
  :hover {
    background-color: var(--color-dark-blue);
    color: var(--color-white);
  }
`;
const ErrorMessage = styled.div`
  position: absolute;
  width: 70%;
  padding: 1%;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 400;
  background-color: #1c315e;
  opacity: 0.8;
  color: white;
  z-index: 3;
  text-align: center;
`;
export default MedForm;
