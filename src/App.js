import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import Navi from "./layouts/Navbar/Navi";
import Footer from "./layouts/Footer/Footer";
import { Container } from "semantic-ui-react";
import Dashboard from "./layouts/Dashboard";

function App() {
  return (
    <div className="App">
      <Navi />

      <Container>

        <Dashboard />
        
      </Container>
      
      <Footer />
    </div>
  );
}

export default App;
