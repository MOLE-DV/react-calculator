import { useRef, useState } from "react";

const keypadSymbols = [
  "÷",
  "%",
  "+/-",
  "C",
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

enum actions {
  none,
  clear,
  change_symbol,
  percent,
  divide,
  multiply,
  minus,
  sum,
  equals,
  dot,
}

export const Calculator = () => {
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
  const [displayData, setDisplayData] = useState({
    preview: "",
    current: "",
  });
  const mathOperations = useRef({
    prewiev: "",
    current: "",
  });

  const action = actions.none;

  let replaceLast = false;
  const handleKeyClick = (e: React.MouseEvent<HTMLElement>) => {
    handleClickParticleEffect(e);
    const keyIsNumber = !isNaN(parseInt(e.currentTarget.innerText));
    const keyValue = e.currentTarget.innerText;

    if (!keyIsNumber && mathOperations.current.current.length > 0) {
      setMathOperations((prev) => {
        console.log(prev);
        return {
          preview: `${prev.current} ${keyValue}`,
          current: "0",
        };
      });
      replaceLast = true;
    } else {
      setMathOperations((prev) => {
        console.log(replaceLast);
        return {
          ...prev,
          current:
            prev.preview.length > 0 && replaceLast
              ? keyValue
              : prev.current + keyValue,
        };
      });
      replaceLast = false;
    }
  };
  return (
    <div className="calculator">
      <div className="display">
        <div className="preview">{mathOperation.preview}</div>
        <div className="current">{mathOperation.current}</div>
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
