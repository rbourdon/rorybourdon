import {
  animate,
  type MotionValue,
  motion,
  transform,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import { type FormEvent, useState } from "react";
import styled, { useTheme } from "styled-components";
import Button from "@/components/Nav/Button";
import { themedScrollbar } from "@/components/utils/styles";

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
  font-weight: 200;
  resize: none;
  ${themedScrollbar}

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
  font-weight: 200;
  line-height: 1;
  font-size: 1.15rem;
  padding: 0 0 2px 0;
  z-index: 1;
`;

const Thanks = styled(motion.span)`
  font-weight: 200;
  font-size: 1.2rem;
  line-height: 1;
  margin-left: 0.5rem;
`;

const inputV: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};

const thanksV: Variants = {
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
  const theme = useTheme();
  const hover = useMotionValue(0);
  const [sent, setSent] = useState(false);

  const color = useTransform(
    [
      theme.primary_slightlydark,
      theme.primary_mediumdark,
      hover,
    ] as MotionValue<string | number>[],
    ([latestColor1, latestColor2, latestHover]: (string | number)[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [latestColor1 as string, latestColor2 as string],
      ),
  );

  const border = useTransform(
    color,
    (latestColor1: string) => "thin solid " + latestColor1,
  );

  const border2 = useTransform(
    theme.primary_slightlydark,
    (latestColor1: string) => "1px solid " + latestColor1,
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement & {
      message: HTMLTextAreaElement;
    };
    const msg = { message: form.message.value };
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
