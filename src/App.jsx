import { useState, useEffect } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import { formaterDinero, calcularPagar } from "./helpers";

function App() {
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  useEffect(() => {
    const resultadoTotalPagar = calcularPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);

  useEffect(() => {
    // calcular el pago mensual
    setPago(total / meses);
  }, [total]);

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

      <h2 className="text-2-xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-indigo-600">Plazo</span> a pagar
      </h2>

      <select
        className="mt-5 w-full p-2 bg-white  border border-gray-300 rounded-lg text-center text-lg font-bold text-gray-500"
        value={meses}
        onChange={(e) => setMeses(e.target.value)}
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2-xl font-extrabold text-gray-500 text-center">
          Resumen de <span className="text-indigo-600">pagos</span>
        </h2>

        <p className="text-xl text-gray-500 text-center font-bold">
          {meses} Meses
        </p>
        <p className="text-xl text-gray-500 text-center font-bold">
          {formaterDinero(total)} Total a pagar
        </p>
        <p className="text-xl text-gray-500 text-center font-bold">
          {formaterDinero(pago)} Mensuales
        </p>
      </div>
    </div>
  );
}

export default App;
