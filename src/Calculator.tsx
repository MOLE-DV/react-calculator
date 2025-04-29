import { ReactElement, useEffect, useRef, useState } from "react";

const keypadSymbols = [
  "/",
  "%",
  "+/-",
  "c",
  "*",
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
      console.log(e.key, keypadSymbols, keypadSymbols.includes(e.key));
      if (e.key == "Enter") {
        calculatorHandler("=");
      }
      if (keypadSymbols.includes(e.key)) {
        calculatorHandler(e.key);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
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
    if (preview.includes("/") && current == "0") return "Error";
    return eval(preview + current);
  };

  const updateDisplay = () => setDisplay(mathOperations.current);

  const calculatorHandler = (keyValue: string) => {
    const keyIsNumber = isNumeric(keyValue);
    let { current, preview } = mathOperations.current;

    if (
      ((current.length == 0 && !keyIsNumber) ||
        (typeof current == "string" &&
          (current.includes("Error") || current.includes("Infinity"))) ||
        (typeof preview == "string" &&
          (preview.includes("Error") || preview.includes("Infinity")))) &&
      keyValue != "c"
    ) {
      mathOperations.current = { preview: "", current: "Error" };
      updateDisplay();
      return;
    }

    if (keyIsNumber) {
      mathOperations.current = {
        ...mathOperations.current,
        current:
          current[0] == "0" && !current.includes(".")
            ? keyValue
            : current + keyValue,
      };
    }
    //handle special buttons
    switch (keyValue) {
      case "%":
        return;
      case "+/-":
        mathOperations.current = {
          preview,
          current: isNumeric(current) ? eval(current + "*-1") : current,
        };
        break;
      case "c":
        mathOperations.current = { preview: "", current: "" };
        current = "";
        preview = "";
        break;
      case "=":
        mathOperations.current = {
          preview: "",
          current: calculate(preview, current),
        };
        break;
      case "/":
      case "+":
      case "-":
      case "*":
        mathOperations.current = {
          preview: `${calculate(preview, current)} ${keyValue}`,
          current: "0",
        };
        break;
      case ".":
        console.log(keyValue, preview, current);
        mathOperations.current = {
          preview,
          current: !current.includes(".") ? current + keyValue : current,
        };
        break;
    }
    updateDisplay();
  };

  const handleKeyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClickParticleEffect(e);
    calculatorHandler(e.currentTarget.value);
  };
  return (
    <div className="calculator">
      <div className="display">
        <div className="preview">
          {display.preview.replace("/", "÷").replace("*", "x")}
        </div>
        <div className="current">{display.current}</div>
      </div>
      <div className="keypad">
        {keypadSymbols.map((symbol, i) => (
          <button
            className="key"
            key={i}
            onClick={handleKeyClick}
            value={symbol}
          >
            {(symbol != "+/-" ? symbol.replace("/", "÷") : symbol).replace(
              "*",
              "x"
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
