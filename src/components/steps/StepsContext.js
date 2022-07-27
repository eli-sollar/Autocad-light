import { createContext } from "react";

const StepsContext = createContext({
  stepsData: {all:{}},
  setstepsData: () => {}
});

export default StepsContext;
