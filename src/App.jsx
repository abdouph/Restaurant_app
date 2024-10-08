import "./App.css";
import NavBar from "./componenets/NavBar";
import Hero from "./componenets/Hero";
import HeadLineCards from "./componenets/HeadLineCards";
import Food from "./componenets/Food";
function App() {
  return (
    <div className="App overflow-hidden">
      <Hero />
      <HeadLineCards />
      <Food />
    </div>
  );
}

export default App;
