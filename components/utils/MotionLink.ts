import { motion } from "framer-motion";
import Link from "next/link";

/**
 * next/link as a motion component, so a styled link can animate without the
 * deprecated `<Link legacyBehavior>` wrapper around a `motion.a`.
 */
const MotionLink = motion.create(Link);

export default MotionLink;
