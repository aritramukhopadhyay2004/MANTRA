import { useState } from "react";
import { START_TOKENS } from "../constants/costs";

export const useTokens = () => {
  const [tokens, setTokens] = useState(START_TOKENS);

  const spend = (amount) => {
    setTokens((t) => Math.max(0, t - amount));
  };

  const recharge = (amount) => {
    setTokens((t) => t + amount);
  };

  const canAfford = (amount) => tokens >= amount;

  return { tokens, spend, recharge, canAfford };
};