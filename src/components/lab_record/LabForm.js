import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import ImageFileInput from '../util/ImageFileInput';
import { LabRecordContext } from './labRecordContext';
import { useNavigate } from 'react-router-dom';

const LabForm = ({ record, setRecord, submit }) => {
  //edit function from labRecordContext
  const { editForm, addForm } = useContext(LabRecordContext);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //validation check for the edit form
  const validationCheck = (form) => {
    if (!form.date || !form.testArea || !form.testResult) {
      setError(
        'please fill in the required area : date, test area, test result '
      );
      setTimeout(() => {
        setError(null);
        return;
      }, 3000);
    }
  };

  //update submit click
  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log('submit-how', ev.target.innerHTML);
    validationCheck(record);

    if (ev.target.innerHTML === 'Post') {
      //post request to labRecordContext
      addForm(record);
      setRecord({
        date: '',
        laboratoryName: '',
        prescriber: '',
        testArea: '',
        testResult: '',
        comment: '',
        fileName: '',
        fileURL: '',
      });
    } else if (ev.target.innerHTML === 'Edit') {
      // patch request to labRecordContext
      editForm(record);
      //redirect to the mylabs page
      navigate('/my_labs');
    }
  };

  // update each input field
  const onChange = (ev) => {
    if (ev.currentTarget == null) {
      return;
    }
    ev.preventDefault();
    setRecord({ ...record, [ev.currentTarget.name]: ev.currentTarget.value });
  };

  // update file input
  const onFileUpload = (file) => {
   
    setRecord((record) => {
      return { ...record, fileName: file.name, fileURL: file.url };
    });
  };

  return (
    <>
      <Form>
        <InputShort
          type="date"
          name="date"
          value={record.date}
          onChange={onChange}
        />
        <InputShort
          type="text"
          name="laboratoryName"
          value={record.laboratoryName}
          onChange={onChange}
          placeholder="laboratory"
        />
        <InputShort
          type="text"
          name="prescriber"
          value={record.prescriber}
          onChange={onChange}
          placeholder="prescriber"
        />
        <Select
          name="testArea"
          value={record.testArea}
          onChange={onChange}
          placeholder="test area"
        >
          <Option defaultValue="Choose test">Choose a test area</Option>
          <Option value="Insulin">Insulin (mmol/L)</Option>
          <Option value="Blood_pressure">Blood pressure (mmHg)</Option>
          <Option value="Cholesterol-HDL">HDL_cholesterol (mg/dL)</Option>
          <Option value="Cholesterol-LDL">LDL_cholesterol (mg/dL)</Option>
          <Option value="Hemoglobin_A1C">A1C_hemoglobin (%)</Option>
          <Option value="VitaminD">Vitamine D (ng/mL)</Option>
          <Option value="CBC">CBC (/mm3)</Option>
          <Option value="WBC">WBC (/mm3)</Option>
          <Option value="TSH">TSH_Thyroid stimulating hormones (mIU/L)</Option>
          <Option value="other">Other</Option>
        </Select>
        <InputShort
          type="text"
          name="testResult"
          value={record.testResult}
          onChange={onChange}
          placeholder="test result"
        />
        <TextArea
          name="comment"
          value={record.comment}
          onChange={onChange}
          placeholder="comment"
        />
        <FileDiv>
          <ImageFileInput fileUpload={onFileUpload} name={record.fileName} />
        </FileDiv>

        <SumbitBtn onClick={onSubmit}>{submit}</SumbitBtn>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};
const Form = styled.form`
  margin-top: 15px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  font-size: 0.8rem;
`;
const focusBorder = css`
  :focus {
    outline: none !important;
    border: 1px solid var(--color-bright-red);
  }
`;
const inputFont = css`
  padding: 0.5em;
  font-size: 0.8rem;
`;
const InputShort = styled.input`
  flex: 1 1 30%;
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
  font-size: 0.8rem;
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
  font-size: 0.8rem;
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
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-bright-red);
  opacity: 0.7;
  padding: 20px;
  z-index: 3;
  text-align: center;
`;
export default LabForm;
