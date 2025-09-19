import React from "react";

const Spinner = () => (
  <div className="relative h-16 w-16">
    <div className="absolute h-full w-full rounded-full border-4 border-gray-200"></div>
    <div
      className="absolute h-full w-full animate-spin rounded-full border-4 border-transparent 
                 border-t-blue-500"
    ></div>
  </div>
);

interface LoadingScreenProps {
  appName?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  appName = "Leo Weather",
}) => {
  return (
    <div
      className="
        flex h-screen w-screen flex-col items-center 
        justify-center text-white
      "
    >
      <div className="flex flex-col items-center gap-6">
        <Spinner />
        <h2
          className="
            text-3xl font-bold text-blue-500
          "
        >
          {appName}
        </h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
