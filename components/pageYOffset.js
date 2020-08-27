import React from "react";

export default function windowOffsetY() {
  const [offsetY, setOffsetY] = React.useState(0);

  const onScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return offsetY;
}
