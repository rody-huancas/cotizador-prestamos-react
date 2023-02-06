import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import { formaterDinero } from "./helpers";

function App() {
  const [cantidad, setCantidad] = useState(10000);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleChange(e) {
    setCantidad(+e.target.value);
  }

  function hundleClickDecremento() {
    const valor = cantidad - STEP;
    if (valor < MIN) {
      alert("error");
      return;
    }
    setCantidad(valor);
  }

  function hundleClickIncremento() {
    const valor = cantidad + STEP;
    if (valor > MAX) {
      alert("error");
      return;
    }
    setCantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />

      <div className="flex justify-between my-6">
        <Button operador="-" fn={hundleClickDecremento} />
        <Button operador="+" fn={hundleClickIncremento} />
      </div>

      <input
        id="range"
        type="range"
        className="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />

      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
        {formaterDinero(cantidad)}
      </p>
    </div>
  );
}

export default App;
