import "./App.css";
import pizza from "./images/pizza.jpg";
import { useMemo, useReducer } from "react";

const initialState = {
  numOfPeople: 0,
  slicesPerPerson: 0,
  slicesPerPizza: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NUM_PEOPLE_CHANGED":
      return {
        ...state,
        numOfPeople: action.payload,
      };
    case "SLICES_PER_PEOPLE_CHANGED":
      return {
        ...state,
        slicesPerPerson: action.payload,
      };
    case "SLICES_PER_PIZZA_CHANGED":
      return {
        ...state,
        slicesPerPizza: action.payload,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const calcResult = useMemo(() => {
    const result = Math.ceil(
      (state.numOfPeople * state.slicesPerPerson) / state.slicesPerPizza
    );
    if (isNaN(result) || result === Infinity) {
      console.log("result is", result);
      return "";
    }
    return result;
  }, [state.numOfPeople, state.slicesPerPerson, state.slicesPerPizza]);

  return (
    <main>
      <div className="main-wrapper">
        <h1>Pizza Calculator</h1>
        <div className="container">
          <div className="img-container">
            <img className="pizza" src={pizza} alt="pizza" />
          </div>
          <div className="container-inputs">
            <h2>{calcResult} Pizza Need</h2>
            <label htmlFor="numPeople">Number Of People</label>
            <input
              type="number"
              min="1"
              max="50"
              name="numPeople"
              placeholder="Number Of People"
              value={state.numOfPeople}
              onChange={(e) =>
                dispatch({
                  type: "NUM_PEOPLE_CHANGED",
                  payload: +e.target.value,
                })
              }
            />
            <label htmlFor="slicesPeople">Slices per Person</label>
            <input
              type="number"
              min="1"
              max="50"
              name="slicesPeople"
              placeholder="Slices per Person"
              value={state.slicesPerPerson}
              onChange={(e) =>
                dispatch({
                  type: "SLICES_PER_PEOPLE_CHANGED",
                  payload: +e.target.value,
                })
              }
            />
            <label htmlFor="numTotal">Total Slices of Pizza</label>
            <input
              type="number"
              min="1"
              max="50"
              name="numTotal"
              placeholder="Total Slices of Pizza"
              value={state.slicesPerPizza}
              onChange={(e) =>
                dispatch({
                  type: "SLICES_PER_PIZZA_CHANGED",
                  payload: +e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
