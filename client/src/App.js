import "./App.css";
import Header from "./components/Header";
import {MainRoutes} from "./routes/MainRoutes";
function App() {
  return (
    <div className="App">
      <Header/>
      <MainRoutes />
    </div>
  );
}

export default App;
