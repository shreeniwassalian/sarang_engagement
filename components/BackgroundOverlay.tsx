import FloatingParticles from "./FloatingParticles";

export default function BackgroundOverlay() {
  return (
    <>
      <div className="experience-background" aria-hidden="true" />
      <div className="experience-overlay" aria-hidden="true" />
      <div className="experience-bloom" aria-hidden="true" />
      <FloatingParticles />
    </>
  );
}
