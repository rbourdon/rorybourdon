import { motion } from "framer-motion";

import { useTheme } from "styled-components";

function Layout({ children, className }) {
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
