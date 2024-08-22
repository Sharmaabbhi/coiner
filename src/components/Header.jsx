import React from "react";
import { Link } from "react-router-dom";

export default function Header({ back }) {
  return (
    <header className="header">
      <div className="width">
        {back && (
          <Link to="/">
            <svg
              height="24px"
              viewBox="0 -960 800 800"
              width="24px"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m 302,-560 294,294 q 15,15 14.5,35 -0.5,20 -15.5,35 -15,15 -35,15 -20,0 -35,-15 L 217,-503 q -12,-12 -18,-27 -6,-15 -6,-30 0,-15 6,-30 6,-15 18,-27 l 308,-308 q 15,-15 35.5,-14.5 20.5,0.5 35.5,15.5 15,15 15,35 0,20 -15,35 z"
                id="path2"
              />
            </svg>
          </Link>
        )}
        <h1>
          <Link to="/">Coiner!</Link>
        </h1>
      </div>
    </header>
  );
}
