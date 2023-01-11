import { useEffect, useState } from "react";
import "./styles/style.css";
import Card from "./components/Card";

function App() {
  //state storing the api response 
  const [data, setData] = useState();

  //counter that will keep track of the current array value
  const [counter, setCounter] = useState(0);

  //boolean that will show wether the response is fulfilled
  const [hasLoaded, setHasLoaded] = useState(false);

  //callback function that will iterate the counter to rerender the card component
  const nextPersonHandler = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    //function that will fetch for the data
    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const result = await response.json();
      if (result) {
        setData(result);
        setHasLoaded(true);
      }
    };
    getData();
  }, []);

  
  return (
    <div className="App">
      <div onDragEnd={nextPersonHandler} className="card-container">
        {hasLoaded ? <Card data={data[counter]} /> : "loading"}
      </div>
    </div>
    //if the api response is fulfilled, render a card with the data as a prop, else render the word loading.
    //whenever the counter state changes, the component will be rerendered
  );
}

export default App;
