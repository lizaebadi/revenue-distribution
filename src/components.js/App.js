import '../styles.js/App.css';
import AdminPage from './Admin/AdminPage';
import {
  Routes,
  Route,
} from "react-router-dom";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
