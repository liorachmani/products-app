import { useEffect, useState } from "react";
import "./App.css";
import { Product, ENDPOINTS } from "@src/models";
import axios from "axios";

function App() {
  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    axios.get(ENDPOINTS.PRODUCTS).then((res) => setData(res.data));
  }, []);
  return (
    <>
      {data?.map((product) => (
        <div>{product.name}</div>
      ))}
    </>
  );
}

export default App;
