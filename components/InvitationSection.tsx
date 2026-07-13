import type { ReactNode } from "react";
import AnimatedText from "./AnimatedText";

interface InvitationSectionProps {
  children: ReactNode;
  className?: string;
}

export default function InvitationSection({ children, className = "" }: InvitationSectionProps) {
  return (
    <section className={`invitation-section ${className}`}>
      <AnimatedText>{children}</AnimatedText>
    </section>
  );
}
