import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import SignInPage from '../components/user/SignInPage';
import SignUpPage from '../components/user/SignUpPage';
import HomePage from './HomePage';
import MedPage from './med_record/Meds';
import MedInfoPage from './med_record/MedInfoPage';
import MedEditPage from './med_record/MedEditPage';
import LabPage from './lab_record/Lab';
import LabReferencePage from './lab_record/LabReferencePage';
import LabEditPage from './lab_record/LabEditPage';
import GlobalStyles from './GlobalStyles';



const App = () => {

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signIn" element={<SignInPage />} />
          <Route exact path="/signUp" element={<SignUpPage />} />
          <Route exact path="/my_meds" element={<MedPage />} />
          <Route exact path="/my_meds/info/:id" element={<MedInfoPage />} />
          <Route exact path="/my_meds/edit/:id" element={<MedEditPage />} />
          <Route exact path="/my_labs" element={<LabPage />} />
          <Route exact path="/my_labs/reference/:id" element={<LabReferencePage />} />
          <Route exact path="/my_labs/edit/:id" element={<LabEditPage />} />    
      </Routes>
    </BrowserRouter>
  );
};


export default App;
