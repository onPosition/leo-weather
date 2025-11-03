import { CurrentLocation } from "@/app/lib/types";
import Image from "next/image";
import { useState } from "react";

interface WeatherValues {
  temperature: number;
  temperatureApparent: number;
  precipitationProbability: number;
  rainIntensity: number;
  windSpeed: number;
  uvIndex: number;
  [key: string]: any;
}

interface AITipButtonProps {
  currentWeather: WeatherValues;
  currentLocation: CurrentLocation;
}

const Spinner = () => (
  <svg
    className="h-6 w-6 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const AITipButton: React.FC<AITipButtonProps> = ({
  currentWeather,
  currentLocation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const handleGetTip = async () => {
    if (isLoading) {
      return;
    }

    if (isGenerated) {
      setShowTooltip(true);
      return;
    }

    navigator.vibrate([50, 50, 50]);
    setShowTooltip(true);
    setIsLoading(true);
    setError(null);
    setAiTip(null);

    try {
      const response = await fetch("/api/weather-tip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weatherData: currentWeather, currentLocation }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI tip. Please try again later.");
      }

      const data = await response.json();
      setAiTip(data.tip);
      setIsGenerated(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center mx-4 bg-linear-to-r from-purple-200 to-blue-200 rounded-4xl">
      <button
        onClick={handleGetTip}
        disabled={isLoading}
        className={`
          relative flex h-8 min-w-8 items-center justify-center rounded-full 
          text-white shadow-lg transition-all duration-300
          bg-card-transparent 
          hover:shadow-xl hover:shadow-blue-500/50
          focus:outline-none focus:ring-4 focus:ring-blue-400/50
          disabled:cursor-not-allowed disabled:opacity-70 m-4
          ${isLoading ? "animate-pulse" : ""}
        `}
        aria-label="Get AI weather tip"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Image src="/ai.svg" alt="AI" width={24} height={24} />
        )}
      </button>
      {!showTooltip && <p>Click to get AI weather tip</p>}
      {showTooltip && (
        <>
          {isLoading && <p className="animate-pulse">Generating tip...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {aiTip && (
            <>
              <p className="text-gray-700 p-4 transition-transform">{aiTip}</p>
              {/* <button
                className="mt-2 m-auto w-fit bg-card-transparent py-1 px-4 rounded-xl"
                onClick={() => setShowTooltip(false)}
              >
                Got it
              </button> */}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default AITipButton;
