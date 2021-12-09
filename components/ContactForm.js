import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext, useState } from "react";
import Button from "@/components/Nav/Button";

const Form = styled.form`
  width: 100%;
  max-width: 555px;
  height: 30vh;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2vh;
  z-index: 1;
`;

const Input = styled(motion.textarea)`
  width: 100%;
  height: 17vh;
  max-height: 200px;
  padding: 20px;
  font-size: 1rem;
  font-weight: 100;
  resize: none;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary_mediumdark) var(--color-primary);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-primary);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-primary_mediumdark);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-primary_dark);
  }

  outline: none;
`;

const ConfirmationContainer = styled(motion.div)`
  width: 100%;
  max-width: 555px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Confirmation = styled(motion.div)`
  width: 420px;
  max-width: 90vw;
  height: 100px;
  border-radius: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 100;
  line-height: 1;
  font-size: 1.15rem;
  padding: 0 0 2px 0;
  z-index: 1;
`;

const Thanks = styled(motion.span)`
  font-weight: 100;
  font-size: 1.2rem;
  line-height: 1;
  margin-left: 0.5rem;
`;

const inputV = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};

const thanksV = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};

export default function ContactForm() {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);
  const [sent, setSent] = useState(false);

  const color = useTransform(
    [theme.primary_slightlydark, theme.primary_mediumdark, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const border = useTransform(
    color,
    (latestColor1) => "thin solid " + latestColor1
  );

  const border2 = useTransform(
    theme.primary_slightlydark,
    (latestColor1) => "1px solid " + latestColor1
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = { message: e.target.message.value };
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(msg),
      });
      setSent(true);
    } catch (error) {
      ("Error communicating with API route!");
    }
  };

  const handleHoverStart = () => {
    animate(hover, 1, { duration: 0.3 });
  };

  const handleHoverEnd = () => {
    animate(hover, 0, { duration: 0.3 });
  };

  return !sent ? (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="message"
        variants={inputV}
        placeholder="Send me a message &#10084;"
        style={{
          borderRadius: "20px",
          border,
          backgroundColor: theme.primary_verylight,
          color: theme.primary_verydark,
        }}
        onFocus={handleHoverStart}
        onBlur={handleHoverEnd}
      />

      <Button
        width={190}
        height={50}
        color1={theme.green}
        type="submit"
        id="contactForm"
        animationDelay={0}
      >
        <motion.span
          layoutId="contactButtonText"
          style={{ textAlign: "center" }}
        >
          Send
        </motion.span>
      </Button>
    </Form>
  ) : (
    <ConfirmationContainer layout>
      <Confirmation
        style={{
          border: border2,
          backgroundColor: theme.primary_light,
          color: theme.primary_superdark,
          borderRadius: "30px",
        }}
        onClick={() => setSent(true)}
        layoutId={"contactFormButtonContent"}
      >
        <motion.span layoutId="contactButtonText">Sent</motion.span>
        <Thanks
          initial="hidden"
          animate="visible"
          variants={thanksV}
          style={{ color: theme.primary_dark }}
          layout
        >
          - Thanks for reaching out!
        </Thanks>
      </Confirmation>
    </ConfirmationContainer>
  );
}
