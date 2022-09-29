import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { MedRecordProvider } from './components/med_record/medRecordContext';
import { LabRecordProvider } from './components/lab_record/labRecordContext';
import { UserProvider } from '../src/components/user/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <MedRecordProvider>
        <LabRecordProvider>
          <App />
        </LabRecordProvider>
      </MedRecordProvider>
    </UserProvider>
  </React.StrictMode>
);
