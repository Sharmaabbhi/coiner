import React from "react";
import { useParams, Link } from "react-router-dom";
import showStore from "../stores/showStore";
import Header from "../components/Header";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Show() {
  const store = showStore();
  const params = useParams();

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }

  React.useEffect(() => {
    store.fetchData(params.id);
  }, []);

  if (!store.data) return <></>;

  return (
    <div>
      <Header back />
      <div className="container">
        <div className="flex">
          <img src={store.data.image.large} className="logo" />
          <h2>
            {store.data.name} ({store.data.symbol.toUpperCase()})
          </h2>
        </div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: store.data.description.en }}
        ></div>
        <ResponsiveContainer width="60%" height={400}>
          <AreaChart data={store.graphData}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="1%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#0d1117" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="Date" tickMargin={8} tickSize={10} />
            <YAxis tickMargin={8} tickSize={10} />
            <Tooltip
              contentStyle={{ backgroundColor: "#010409", border: "none" }}
            />
            <Area
              type="monotone"
              dataKey="Price"
              stroke="#8884d8"
              strokeWidth={2}
              fillOpacity={0.8}
              fill="url(#grad)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="details">
          <div>
            <span className="key">Market Cap Rank</span>
            <span className="value">#{store.data.market_cap_rank}</span>
          </div>
          <div>
            <span className="key">Current Price</span>
            <span className="value">
              ${store.data.market_data.current_price.usd.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="key">24h High</span>
            <span className="value">
              ${store.data.market_data.high_24h.usd.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="key">24h Low</span>
            <span className="value">
              ${store.data.market_data.low_24h.usd.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="key">24h Change</span>
            <span className="value">
              {store.data.market_data.price_change_percentage_24h > 0 ? (
                <span className="up">
                  <svg
                    height="8px"
                    viewBox="0 -960 423.99998 267.99999"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m 60,-732 q -9,0 -14.5,-6 -5.5,-6 -5.5,-14 0,-2 6,-14 l 144.99999,-145 q 5,-5 10,-7 5,-2 11,-2 6,0 11,2 5,2 10,7 l 145,145 q 3,3 4.5,6.5 1.5,3.5 1.5,7.5 0,8 -5.5,14 -5.5,6 -14.5,6 z"
                      id="path2"
                    />
                  </svg>
                  <span>
                    {store.data.market_data.price_change_percentage_24h.toFixed(
                      2,
                    )}
                    %
                  </span>
                </span>
              ) : (
                <span className="down">
                  <svg
                    height="8px"
                    viewBox="0 -960 423.99998 267.99999"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m 60,-920 q -9,0 -14.5,6 -5.5,6 -5.5,14 0,2 6,14 l 144.99999,145 q 5,5 10,7 5,2 11,2 6,0 11,-2 5,-2 10,-7 l 145,-145 q 3,-3 4.5,-6.5 1.5,-3.5 1.5,-7.5 0,-8 -5.5,-14 -5.5,-6 -14.5,-6 z"
                      id="path2"
                    />
                  </svg>
                  <span>
                    {Math.abs(
                      store.data.market_data.price_change_percentage_24h.toFixed(
                        2,
                      ),
                    )}
                    %
                  </span>
                </span>
              )}
            </span>
          </div>
          <div>
            <span className="key">1y Change</span>
            <span className="value">
              {store.data.market_data.price_change_percentage_1y > 0 ? (
                <span className="up">
                  <svg
                    height="8px"
                    viewBox="0 -960 423.99998 267.99999"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m 60,-732 q -9,0 -14.5,-6 -5.5,-6 -5.5,-14 0,-2 6,-14 l 144.99999,-145 q 5,-5 10,-7 5,-2 11,-2 6,0 11,2 5,2 10,7 l 145,145 q 3,3 4.5,6.5 1.5,3.5 1.5,7.5 0,8 -5.5,14 -5.5,6 -14.5,6 z"
                      id="path2"
                    />
                  </svg>
                  <span>
                    {store.data.market_data.price_change_percentage_1y.toFixed(
                      2,
                    )}
                    %
                  </span>
                </span>
              ) : (
                <span className="down">
                  <svg
                    height="8px"
                    viewBox="0 -960 423.99998 267.99999"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m 60,-920 q -9,0 -14.5,6 -5.5,6 -5.5,14 0,2 6,14 l 144.99999,145 q 5,5 10,7 5,2 11,2 6,0 11,-2 5,-2 10,-7 l 145,-145 q 3,-3 4.5,-6.5 1.5,-3.5 1.5,-7.5 0,-8 -5.5,-14 -5.5,-6 -14.5,-6 z"
                      id="path2"
                    />
                  </svg>
                  <span>
                    {Math.abs(
                      store.data.market_data.price_change_percentage_1y.toFixed(
                        2,
                      ),
                    )}
                    %
                  </span>
                </span>
              )}
            </span>
          </div>
          <div>
            <span className="key">ATH</span>
            <span className="value">
              ${store.data.market_data.ath.usd.toLocaleString()} (
              {formatDate(store.data.market_data.ath_date.usd)})
            </span>
          </div>
          <div>
            <span className="key">ATL</span>
            <span className="value">
              ${store.data.market_data.atl.usd.toLocaleString()} (
              {formatDate(store.data.market_data.atl_date.usd)})
            </span>
          </div>
          <div>
            <span className="key">Volume(24h)</span>
            <span className="value">
              ${store.data.market_data.total_volume.usd.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="key">Market Cap</span>
            <span className="value">
              ${store.data.market_data.market_cap.usd.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="key">Total Supply</span>
            <span className="value">
              {store.data.market_data.total_supply.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="key">Circulating Supply</span>
            <span className="value">
              {store.data.market_data.circulating_supply.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="key">Website</span>
            <Link to={store.data.links.homepage[0]} className="coinLink">
              {store.data.links.homepage[0]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
