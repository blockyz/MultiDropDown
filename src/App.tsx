import "./App.css";
import MultiSelectDropDown from "./Common/MultiSelectDropDown";
import { mockData } from "./Constants";

function App() {
  return <MultiSelectDropDown dataSource={mockData} />;
}

export default App;
