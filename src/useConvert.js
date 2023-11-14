import { useEffect } from "react";

import { frakfurterApi } from "./frankfurterApi";

export const useConvert = ({
  amount,
  fromCur,
  toCur,
  setConverted,
  setIsLoading,
}) => {
  useEffect(() => {
    async function convert() {
      if (amount === "" || amount <= "0" || fromCur === toCur) {
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch(
          `${frakfurterApi}/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );

        const data = await res.json();
        setConverted(data.rates[toCur]);
      } catch (error) {
        console.error("Error converting:", error);
      } finally {
        setIsLoading(false);
      }
    }
    const timer = setTimeout(() => {
      convert();
    }, 500);
    return () => clearTimeout(timer);
  }, [amount, fromCur, toCur, setConverted, setIsLoading]);
};
