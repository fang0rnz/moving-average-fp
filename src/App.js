import "./styles.css";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

const average = (numbers) =>
  numbers.reduce((acc, it) => acc + it, 0) / numbers.length;

const getAverageWindow = (before = 1, after = 1) => {
  return (it, index, array) => {
    const start = Math.max(0, index - before);
    const end = Math.min(array.length, index + after + 1);
    return array.slice(start, end);
  };
};

const getAverageWindowFp = (before = 1, after = 1) => (array) => {
  const getWindows = (_, index, array) => {
    const start = Math.max(0, index - before);
    const end = Math.min(array.length, index + after + 1);
    return array.slice(start, end);
  };
  return array.map(getWindows);
};

const movingAverage = (numbers) => {
  return flow(getAverageWindowFp(1, 1), map(average))(numbers);
  // return numbers.map(averageWindow()).map(average);
};

export default function App() {
  const arrayValues = [2, 3, 4, 5, 15, 11, 12];
  const result = movingAverage(arrayValues);
  console.log(result);

  return (
    <div className="App">
      <div>
        Moving average of array{" "}
        {arrayValues.reduce((acc, it) => `${acc} ${it},`, "")}
      </div>
      <div>
        is
        {result.reduce((acc, it) => `${acc} ${it.toFixed(2)},`, "")}
      </div>
    </div>
  );
}
