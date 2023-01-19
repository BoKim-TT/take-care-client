import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHandHoldingMedical } from 'react-icons/fa';
import { UserContext } from '../components/user/userContext';

const Header = () => {
  // current user state
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(null);

  // sign out button click
  const handleSignOut = () => {
    //set user token null
    setUser({ token: null });

    //remove user info from session storage
    window.sessionStorage.removeItem('take_care_user');
    navigate('/');
  };

  return (
    <Wrapper>
      <IconBox to="/">
        <Icon />
      </IconBox>
      <Nav>
        <MyLink to="/my_meds">My Meds</MyLink>
        <MyLink to="/my_labs">My Labs</MyLink>
      </Nav>
      <Sign>
        {!user.token && <SignIn to="/signIn">Sign In</SignIn>}
        {user.token && <SignOut onClick={handleSignOut}>Sign Out</SignOut>}
      </Sign>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 60px;
  font-family: var(--font-heading);
  display: flex;
  padding: 3px 40px;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
`;
const IconBox = styled(Link)`
  color: var(--color-cyan);
  padding: 4px;
  background-color: var(--color-dark-blue);
  border-radius: 10px;
`;
const Icon = styled(FaHandHoldingMedical)`
  width: 30px;
  height: 30px;
  transition: all 300ms ease;
  &:hover {
    transform: scale(1.1);
  }
`;
const Nav = styled.div`
  width: 30%;
  font-size: 17px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
`;
const MyLink = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  color: #0e5e6f;
  transition: all 300ms ease;
  :hover {
    color: var(--color-bright-red);
    transform: scale(1.1);
  }
  &.active {
    color: red;
  }
`;
const Sign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SignOut = styled.button`
  width: 70px;
  height: 30px;
  margin: 5px;
  background-color: var(--color-cyan);
  /* border-radius: 3px; */
  font-size: 14px;
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
    border: 1px solid var(--color-cyan);
    background-color: var(--color-white);
    transform: scale(1.1);
  }
`;
const SignIn = styled(Link)`
  text-decoration: none;
  padding: 8px;
  background-color: var(--color-cyan);
  color: var(--color-dark-gray);
  /* border-radius: 5px; */
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  :hover {
    border: 1px solid var(--color-cyan);
    background-color: var(--color-white);
    transform: scale(1.05);
  }
`;

export default Header;
