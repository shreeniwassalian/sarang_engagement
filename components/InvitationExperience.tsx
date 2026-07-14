"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import ScratchCard from "./ScratchCard";
import BackgroundOverlay from "./BackgroundOverlay";
import Countdown from "./Countdown";
import Divider from "./Divider";
import InvitationSection from "./InvitationSection";
import Venue from "./Venue";

export default function InvitationExperience() {
  return (
    <motion.main
      className="invitation-experience"
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.15, ease: "easeOut" }}
    >
      <BackgroundOverlay />
      <div className="experience-scroll">
        <div className="invitation-content">
          <InvitationSection className="family-section">
            <p className="eyebrow">Together with our families</p>
            <h1 className="invitation-title">Request the honour<br />of your presence</h1>
            <Divider />
            <div className="couple-intro">
              <div>
                <h2>Sarang</h2>
                <p>Son of</p>
                <strong>Mr. Dattatray Yadav</strong>
                <strong>&amp; Mrs. Suman Yadav</strong>
              </div>
              <p className="with-script">with</p>
              <div>
                <h2>Aishwarya</h2>
                <p>Daughter of</p>
                <strong>Mr. Ravindra Pisal</strong>
                <strong>&amp; Mrs. Surekha Pisal</strong>
              </div>
            </div>
          </InvitationSection>

          <ScratchCard>
            <InvitationSection style={{ minHeight: 'auto', padding: '40px 20px', background: 'transparent' }}>
              <p className="eyebrow">Save the date</p>
              <h2 className="date-title">16 August 2026</h2>
              <p className="time-title">5:00 PM onwards</p>
            </InvitationSection>
          </ScratchCard>
          <Divider />

          <InvitationSection className="message-section">
            <p>We eagerly await your gracious presence<br />to bless our special day and celebrate<br />the beginning of a beautiful journey together.</p>
          </InvitationSection>

          <InvitationSection>
            <p className="eyebrow">Counting down to our celebration</p>
            <Countdown />
          </InvitationSection>

          <InvitationSection>
            <Venue />
          </InvitationSection>

          <InvitationSection className="love-section">
            <p className="eyebrow">With love</p>
            <h2 className="love-names">Sarang <span>&amp;</span> Aishwarya</h2>
            <p className="love-date">16 August 2026</p>
            <Divider compact />
          </InvitationSection>
        </div>
      </div>
    </motion.main>
  );
}
