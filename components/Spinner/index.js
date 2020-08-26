import { Spinner } from "react-bootstrap";

export default function spinner() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Spinner animation="border" />
    </div>
  );
}
