import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { UserContext } from './userContext';
import jwt_decode from 'jwt-decode';
// import env from 'react-dotenv';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const { setUser } = useContext(UserContext);
  // when sign in with email button clicked, this state turns to true
  // and sign in with email modal pops up
  const [emailSignIn, setEmailSignIn] = useState(false);

  //redirect to homepage when signed in
  const navigate = useNavigate(null);

  //for error message
  const [message, setMessage] = useState(null);

  //sign in input values (email & password)
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  // GOOGLE auth client_id
  const client_id = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

  // GOOGLE auth call back function
  const handleCallbackResponse = (response) => {
    // decode google auth credential response using  jwt_decode
    const userObject = jwt_decode(response.credential, { header: true });

    if (userObject.kid) {
      // set current user on UserContext
      setUser({
        token: userObject.kid,
      });
      // save user into session storage
      window.sessionStorage.setItem(
        'take_care_user',
        JSON.stringify({
          token: userObject.kid,
        })
      );
    }
    //redirect to home
    navigate('/');
  };

  // activate GOOGLE auth button
  useEffect(() => {
    setMessage(null);

    window.google.accounts.id.initialize({
      client_id: client_id,
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'dark', size: 'medium' }
    );
  }, [client_id]);

  //sign up with email button clicked
  const handleEmailSignUp = () => {
    //direct to sign up form page
    navigate('/signUp');
  };

  //sign in with email button clicked
  const handleEmailSignIn = () => {
    //show sign in with email form
    setEmailSignIn(true);
  };

  // email sign in form submitted
  const submitEmailSignIn = (ev) => {
    ev.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    fetch(`https://take-care.herokuapp.com/data/user/signIn`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          //if bcrypt compare was successful, set current user
          setUser({ token: data.data.token });

          // store user into session storage
          window.sessionStorage.setItem(
            'take_care_user',
            JSON.stringify({
              token: data.data.token,
            })
          );

          // direct to homepage
          navigate('/');
        } else {
          // if there was a problem signing in, show error message
          setMessage(data.message);
          formRef.current.reset();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <Container>
        {!emailSignIn ? (
          <>
            {' '}
            <SignInGoogle id="signInDiv"></SignInGoogle>
            <SignInEmail onClick={handleEmailSignIn}>
              Sign in with email
            </SignInEmail>
            <Span>or </Span>
            <SignUp onClick={handleEmailSignUp}>Sign up with email</SignUp>
          </>
        ) : (
          <>
            <Form ref={formRef}>
              <Div>
                <Label>email : </Label>
                <Input type="email" name="email" ref={emailRef} />
              </Div>
              <Div>
                <Label>password : </Label>
                <Input type="password" name="password" ref={passwordRef} />
              </Div>
              <Confirm onClick={submitEmailSignIn}>Sign in</Confirm>
            </Form>
          </>
        )}
      </Container>
      {message && emailSignIn && <Message>{message}</Message>}
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
`;
const SignInGoogle = styled.button`
  background-color: transparent;
  margin: 15px;
`;
const SignInEmail = styled.button`
  width: 170px;
  font-size: 14px;
  padding: 6px;
  background-color: var(--color-white);
  border: 1px solid var(--color-cyan);
  border-radius: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
   transform: scale(1.05);
  }
  }
`;
const Span = styled.span`
  border-top: 2px dotted var(--color-dark-blue);
  padding: 10px;
`;
const SignUp = styled(SignInEmail)`
  background-color: var(--color-cyan);
  transition: all 300ms ease;
  :hover {
    background-color: var(--color-cyan);
    transform: scale(1.05);
  }
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
  width: 50%;
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

export default SignInPage;
