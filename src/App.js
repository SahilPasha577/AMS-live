import './App.css';
import Routes from './Authen/Routes';
import { Footer } from './MyComp/Footer';

function App() {

  const USER_TYPES = {
    Admin: "Admin_User",
    Candidate: "Candidate_User",
  }

  const CURRENT_USER_TYPE = USER_TYPES.Admin;

  return (
    <>
      <Routes />
      <Footer />
    </>
  );
}

export default App;
