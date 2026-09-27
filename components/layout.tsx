import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useTheme } from "styled-components";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className }: LayoutProps) {
  const theme = useTheme();

  return (
    <motion.div
      style={{
        backgroundColor: theme.primary_light,
        overflow: "scroll",
        width: "100%",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Layout;
