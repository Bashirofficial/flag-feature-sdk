import { createContext } from "react";
import { FeatureFlagClient } from "../index";

export const FeatureFlagContext = createContext<FeatureFlagClient | null>(null);
