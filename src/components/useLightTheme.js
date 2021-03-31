import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

export const UseLightTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  useEffect(() => {
    if (isDark) {
      toggleColorMode();
    }
  }, [isDark]);
  return null;
};
