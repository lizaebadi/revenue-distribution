import '../styles.js/App.css';
import AdminPage from './Admin/AdminPage';
import AddMovieForm from './Admin/AddMovieForm';
import AddShareholderForm from './Admin/AddShareholderForm';
import AddTransferForm from './Admin/AddTransferForm';
import {
  Routes,
  Route,
} from "react-router-dom";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addMovie" element={<AddMovieForm />} />
        <Route path="/addShareholder" element={<AddShareholderForm />} />
        <Route path="/addTransfer" element={<AddTransferForm />} />
      </Routes>
    </>
  );
}

export default App;
