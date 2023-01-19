import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const SignUpPage = () => {
  const { setUser } = useContext(UserContext);
  //error message 
  const [message, setMessage] = useState(null);

 //redirect to homepage after successful sign up
 const navigate = useNavigate(null);

  // input field values for sign up form 
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
 
// sign up form submission
  const handlesignUp = (ev) => {
    ev.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  
  //password hash 
    bcrypt.hash(password, 10, function (err, hash) {

      // fetch post request into user data
      fetch(`${API_ENDPOINT}/data/user/signUp`, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          token: hash,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
        
          if (data.status === 200) {
            // if user data successfully added, set curretUser
            setUser({ token: data.data.token });
            //store user info into session storage

            window.sessionStorage.setItem(
              'take_care_user',
              JSON.stringify({
                token: data.data.token,
              })
            );
            // and redirect to homepage
            navigate('/');
          } else {
            //if not successfully added, show error message
            setMessage(data.message);

            // reset sign up form 
            formRef.current.reset();
            setTimeout(() => {
              setMessage(null);
            }, 2000);
          }
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <Wrapper>
      <Container>
        <Heading>Sign up</Heading>
        <Form ref={formRef}>
          <Div>
            <Label>email : </Label>
            <Input type="email" name="email" ref={emailRef} />
          </Div>
          <Div>
            <Label>password : </Label>
            <Input type="password" name="password" ref={passwordRef} />
          </Div>
          <Confirm onClick={handlesignUp}>Submit</Confirm>
        </Form>
      </Container>
      {message && <Message>{message}</Message>}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: var(--color-dark-gray);
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 30%;
  border: 1px solid var(--color-cyan);
  background-color: var(--color-white);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
const Heading = styled.h2`
  margin-bottom: 15px;
`;
const Form = styled.form`
  text-align: center;
`;
const Div = styled.div`
  text-align: right;
  padding: 10px;
  font-size: 13px;
`;
const Label = styled.label``;
const Input = styled.input``;
const Confirm = styled.button`
  width: 100%;
  margin: 10px auto;
  background-color: var(--color-cyan);
  padding: 7px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
    transform: scale(1.05);
  }
`;
const Message = styled.div`
  width:50%;
  background-color: var(--color-white);
  border: 1px solid var(--color-dark-blue);
  margin: 30px;
  color: var(--color-bright-red);
  font-size: 13px;
  text-align: center;
  padding: 1%;
  border-radius: 5px;
  z-index: 3;
`;

export default SignUpPage;
