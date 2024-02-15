import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-[#00DC82] animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#00DC82] animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#00DC82] animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
};

export default Loader;
