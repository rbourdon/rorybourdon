import { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";

function Layout({ children, className }) {
  const theme = useContext(ThemeContext);

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
