import { useEffect, useState } from "react";
import "./App.css";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState("1");
  const [toCur, setToCur] = useState("EUR");
  const [fromCur, setFromCurr] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      if (amount === 0) {
        return;
      }
      if (fromCur === toCur) {
        return setConverted(amount);
      }
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();
      setConverted(data.rates[toCur]);
    }
    convert();
    setIsLoading(false);
  }, [amount, fromCur, toCur]);

  return (
    <div className="centered">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
        placeholder="Enter Amount"
      />
      <div className="selects">
        <select value={fromCur} onChange={(e) => setFromCurr(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CNY">CNY</option>
          <option value="GBP">GBP</option>
          <option value="ILS">ILS</option>
          <option value="JPY">JPY</option>
          
        </select>
        <p>👉</p>
        <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CNY">CNY</option>
          <option value="GBP">GBP</option>
          <option value="ILS">ILS</option>
          <option value="JPY">JPY</option>

        </select>
      </div>
      {!isLoading && (
        <p className="converted-value">
          {converted} <span>{toCur}</span>
        </p>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
