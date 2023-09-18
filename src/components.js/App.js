import '../styles.js/App.css';
import AdminPage from './Admin/AdminPage';
import AddMovieForm from './Admin/AddMovieForm';
import AddShareholderForm from './Admin/AddShareholderForm';
import {
  Routes,
  Route,
} from "react-router-dom";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addMovie" element={<AddMovieForm />} />
        <Route path="/addShareholder" element={<AddShareholderForm />} />
      </Routes>
    </>
  );
}

export default App;
