// Provide state management
import { useDataContext } from "../../context/dataContext";

import "./style.css";

export default function Main() {
  const data = useDataContext();
  return (
    <>
      <h1>这里是主要内容</h1>
      <h2>{data?.main}</h2>
      
    </>
  );
}
