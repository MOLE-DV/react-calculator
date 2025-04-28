import { useEffect, useRef, useState } from "react";

const keypadSymbols = [
  "÷",
  "%",
  "+/-",
  "c",
  "X",
  "9",
  "8",
  "7",
  "-",
  "6",
  "5",
  "4",
  "+",
  "3",
  "2",
  "1",
  "=",
  ".",
  "0",
] as string[];

export const Calculator = () => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const allowedKeys = keypadSymbols.map((key) =>
        key == "÷" ? "/" : key == "X" ? "*" : key
      );
      if (e.key == "Enter") {
        calculatorHandler("=");
      }
      if (allowedKeys.includes(e.key)) {
        calculatorHandler(e.key);
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    // return window.removeEventListener("keypress", handleKeyPress);
  }, []);

  const handleClickParticleEffect = (e: React.MouseEvent<HTMLElement>) => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${e.pageX}px`;
    particle.style.top = `${e.pageY}px`;

    e.currentTarget?.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, 2000);
  };
  const [display, setDisplay] = useState({
    preview: "",
    current: "",
  });

  const mathOperations = useRef({
    preview: "",
    current: "",
  });

  const isNumeric = (str: string) => !isNaN(parseInt(str));
  const calculate = (preview: string, current: string) => {
    if (preview.includes("÷") && current == "0") return "Error";
    return eval(preview.replace("x", "*").replace("÷", "/") + current);
  };
  const updateDisplay = () => setDisplay(mathOperations.current);

  const calculatorHandler = (keyValue: string) => {
    const keyIsNumber = isNumeric(keyValue);
    let { current, preview } = mathOperations.current;

    switch (keyValue) {
      case "%":
        return;
      case "+/-":
        mathOperations.current = {
          preview,
          current: isNumeric(current) ? eval(current + "*-1") : current,
        };
        updateDisplay();
        return;
      case "c":
        mathOperations.current = { preview: "", current: "" };
        current = "";
        preview = "";
        updateDisplay();
        return;
      case "=":
        mathOperations.current = {
          preview: "",
          current: calculate(preview, current),
        };
        updateDisplay();
        return;
    }

    if (
      (current.length == 0 && !keyIsNumber) ||
      (typeof current == "string" && current.includes("Error"))
    )
      return;

    if (!keyIsNumber && keyValue != ".") {
      mathOperations.current = {
        preview: `${calculate(preview, current)} ${keyValue}`,
        current: "0",
      };
    } else if (
      keyValue == "." &&
      current.length > 0 &&
      !current.includes(".")
    ) {
      console.log("test");
      mathOperations.current = {
        preview,
        current: current + keyValue,
      };
    } else if (keyValue != ".") {
      mathOperations.current = {
        ...mathOperations.current,
        current:
          current[0] == "0" && !current.includes(".")
            ? keyValue
            : current + keyValue,
      };
    }
    updateDisplay();
  };

  const handleKeyClick = (e: React.MouseEvent<HTMLElement>) => {
    handleClickParticleEffect(e);
    calculatorHandler(e.currentTarget.innerText);
  };
  return (
    <div className="calculator">
      <div className="display">
        <div className="preview">{display.preview}</div>
        <div className="current">{display.current}</div>
      </div>
      <div className="keypad">
        {keypadSymbols.map((symbol, i) => (
          <button className="key" key={i} onClick={handleKeyClick}>
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};
