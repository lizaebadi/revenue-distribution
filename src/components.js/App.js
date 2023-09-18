import '../styles.js/App.css';
import AdminPage from './Admin/AdminPage';
import AddMovieForm from './Admin/AddMovieForm';
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
      </Routes>
    </>
  );
}

export default App;
