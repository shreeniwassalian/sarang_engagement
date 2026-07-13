import Divider from "./Divider";

export default function Venue() {
  return (
    <>
      <p className="eyebrow">Venue</p>
      <h2 className="venue-name">Nakshatra Palace</h2>
      <p className="venue-location">Khed Shivapur</p>
      <Divider compact />
      <a
        className="maps-button"
        href="https://www.google.com/maps/search/?api=1&query=Nakshatra+Palace+Khed+Shivapur"
        target="_blank"
        rel="noreferrer"
      >
        View on Google Maps
      </a>
    </>
  );
}
