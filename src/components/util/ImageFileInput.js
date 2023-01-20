import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const cloudinaryName =
  process.env.NODE_ENV !== 'development'
    ? process.env.CLOUDINARY_CLOUD_NAME
    : process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

//cloudinary api
const imageUploader = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'u0wbbyvl');
  const result = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
    {
      method: 'POST',
      body: data,
    }
  );
  return await result.json();
};

const ImageFileInput = ({ fileUpload, name }) => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  // file button clicked
  const handleFileChange = async (ev) => {
    setLoading(true);
    // fetch image file to cloudinary api
    const uploaded = await imageUploader(ev.target.files[0]);
    setLoading(false);

    // send cloudinary image data to other components
    fileUpload({
      id: uploaded.asset_id,
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };

  // clickling button makes input field targeted
  const onButtonClick = (ev) => {
    ev.preventDefault();
    inputRef.current.click();
  };

  return (
    <Wrapper>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        name="file"
        onChange={handleFileChange}
      />
      <Div>
        {!loading && (
          <Button onClick={onButtonClick}>{name || 'File upload'}</Button>
        )}
        {loading && <Loading></Loading>}
      </Div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Input = styled.input`
  display: none;
`;
const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  background-color: var(--color-cyan);
  width: 100%;
  height: 100%;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 300ms ease-in;
  :hover {
    background-color: var(--color-dark-blue);
    color: var(--color-white);
  }
`;

const spin = keyframes`
 0% {
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

const Loading = styled.div`
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  border: 3px solid var(--color-cyan);
  border-top: 3px solid var(--color-bright-red);
  animation: ${spin} 2s linear infinite;
`;

export default ImageFileInput;
