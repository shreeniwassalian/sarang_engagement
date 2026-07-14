import Divider from "./Divider";

export default function Venue() {
  return (
    <>
      <p className="eyebrow">Venue</p>
      <h2 className="venue-name">Nakshatra Palace</h2>
      <p className="venue-location">Khed Shivapur</p>
      <Divider compact />
      <a
        className="map-widget-container"
        href="https://www.google.com/maps/search/?api=1&query=Nakshatra+Palace+Khed+Shivapur"
        target="_blank"
        rel="noreferrer"
        aria-label="View Nakshatra Palace on Google Maps"
      >
        <div className="map-widget-frame">
          <img
            src="/google-map-widget.png"
            alt="Google Maps Location Widget for Nakshatra Palace"
            className="map-widget-img"
          />
          <div className="map-widget-overlay">
            <span className="map-widget-btn">View on Google Maps</span>
          </div>
        </div>
      </a>
    </>
  );
}
