import { useState } from "react";
import { useConvert } from "./useConvert";

import "./App.css";

export default function App() {
  const [amount, setAmount] = useState("");
  const [toCur, setToCur] = useState("EUR");
  const [fromCur, setFromCurr] = useState("USD");
  const [converted, setConverted] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  useConvert({ amount, fromCur, toCur, setConverted, setIsLoading });

  return (
    <div className="centered">
      <input
        min="0"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
      />

      <div className="selects">
        <select value={fromCur} onChange={(e) => setFromCurr(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="PLN">PLN</option>
          <option value="CNY">CNY</option>
          <option value="GBP">GBP</option>
          <option value="ILS">ILS</option>
          <option value="JPY">JPY</option>
        </select>
        <p>To</p>
        <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="PLN">PLN</option>
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
