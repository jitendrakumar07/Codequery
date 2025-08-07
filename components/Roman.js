// components/Roman.js
import { useState } from "react";

export default function RomanConverter() {
  const [number, setNumber] = useState("");
  const [roman, setRoman] = useState("");

  const convertToRoman = (num) => {
    const romanMap = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";
    romanMap.forEach(({ value, numeral }) => {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    });
    return result;
  };

  const handleConvert = () => {
    const num = parseInt(number);
    if (!isNaN(num) && num > 0 && num < 4000) {
      setRoman(convertToRoman(num));
    } else {
      setRoman("Please enter a number between 1 and 3999");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Roman Numeral Converter</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number (1-3999)"
        className="border px-4 py-2 rounded w-full max-w-sm mb-4"
      />
      <button
        onClick={handleConvert}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Convert
      </button>
      {roman && (
        <p className="mt-4 text-xl">
          Result: <strong>{roman}</strong>
        </p>
      )}
    </div>
  );
}
