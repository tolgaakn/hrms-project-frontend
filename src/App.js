import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import Navi from "./layouts/Navbar/Navi";
import Footer from "./layouts/Footer/Footer";
import Dashboard from "./layouts/Dashboard";

function App() {
  return (
    <div className="App">
      <Navi />

      <Dashboard />
      
      <Footer />
    </div>
  );
}

export default App;
