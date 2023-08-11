import { useState } from "react";
import { Default } from "../..";

const Welcome = () => {
  const [state, setState] = useState<number>(0);
  if (state === 0) {
    Default(`Welcome user ${window.localStorage.getItem("email")}`)
    setState(1);
  }
};

export default Welcome;
