import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import ImageFileInput from '../util/ImageFileInput';


const MedForm = ({ addForm }) => {
  const formRef = useRef();
  const dateRef = useRef();
  const brandNameRef = useRef();
  const genericNameRef = useRef();
  const directionRef = useRef();
  const prescriberRef = useRef();
  const dosageFormRef = useRef();
  const commentRef = useRef();
  const [file, setFile] = useState({});
  const [error, setError] = useState(null);

  const fileUpload = (file) => {
    console.log('uploadFile', file);
    setFile({
      fileName: file.name,
      fileURL: file.url,
      fileId: file.id,
    });
  };

  const validationCheck = (form) => {
    if (!form.date || (!form.brandName && !form.genericName)) {
      setError(
        'please fill in the required area : date, either brand name or generic name'
      );
      setTimeout(() => {
        setError(null);
        return;
      }, 3000);
    }
  };
  const onSubmit = (ev) => {
    ev.preventDefault();

    const form = {
      date: dateRef.current.value || '',
      brandName: brandNameRef.current.value || '',
      genericName: genericNameRef.current.value || '',
      direction: directionRef.current.value || '',
      prescriber: prescriberRef.current.value || '',
      dosageForm: dosageFormRef.current.value || '',
      comment: commentRef.current.value || '',
      fileName: file.fileName || '',
      fileURL: file.fileURL || '',
    };
    validationCheck(form);
    addForm(form);
    formRef.current.reset();
    setFile({});
  };
  return (
    <Container>
      <Form ref={formRef}>
        <InputShort ref={dateRef} type="date" name="date" placeholder="Date" />
        <InputShort
          ref={brandNameRef}
          type="text"
          name="brandName"
          placeholder="Brand name"
        />
        <InputShort
          ref={genericNameRef}
          type="text"
          name="genericName"
          placeholder="Generic name"
        />
        <Select ref={dosageFormRef} name="dosageForm" placeholder="Dosage form">
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
          ref={directionRef}
          type="text"
          name="direction"
          placeholder="Direction"
        />
        <InputShort
          ref={prescriberRef}
          type="text"
          name="prescriber"
          placeholder="Prescriber"
        />
        <TextArea ref={commentRef} name="comment" placeholder="Comment" />
        <FileDiv>
          <ImageFileInput fileUpload={fileUpload} name={file.fileName} />
        </FileDiv>

        <SumbitBtn onClick={onSubmit}>Post</SumbitBtn>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;
const Form = styled.form`
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
  flex: 1 1 20%;
  ${inputFont}
  ${focusBorder}
`;
// const Date = styled(InputShort)`
//   border: ${(props) => (props.border === true ? '1px solid blue' : 'none')};
// `;
// const BrandName = styled(InputShort)`
//   border: ${(props) => (props.border === true ? '1px solid blue' : 'none')};
// `;
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
export default MedForm;
