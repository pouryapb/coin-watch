import React, { useState } from "react";

export const ConnectionContext = React.createContext(null);

const ConnectionProvider = ({ children }) => {
  const [coinId, setCoinId] = useState("bitcoin");

  return (
    <ConnectionContext.Provider
      value={{
        coinId,
        setCoinId,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;
