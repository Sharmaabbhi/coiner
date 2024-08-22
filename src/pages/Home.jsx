import React from "react";
import Header from "../components/Header";
import homeStore from "../stores/homeStore";
export default function Home() {
  const store = homeStore();

  const TableRow = ({ data }) => {
    const handleRowClick = () => {
      window.location.href = `/${data.id}`;
    };

    return (
      <tr onClick={handleRowClick}>
        <td>
          <div>
            <img src={data.image} className="logo" />
            <span>
              <span>{data.name}</span>
              {store.searched ? (
                <span className="symbol">({data.symbol})</span>
              ) : (
                ""
              )}
            </span>
          </div>
        </td>

        {store.searched ? (
          <></>
        ) : (
          <>
            <td>
              <span>${data.priceUsd}</span>
            </td>

            <td>
              {data.priceChange > 0 ? (
                <div className="up">
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
                  <span>{data.priceChange}%</span>
                </div>
              ) : (
                <div className="down">
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
                  <span>{Math.abs(data.priceChange)}%</span>
                </div>
              )}
            </td>

            <td>
              <span>{data.volume}</span>
            </td>

            <td>
              <span>{data.marketCap}</span>
            </td>

            <td>
              <span>
                <img src={data.trend} className="trendImg" />
              </span>
            </td>
          </>
        )}
      </tr>
    );
  };

  React.useEffect(() => {
    store.fetchCoins();
  }, []);
  return (
    <div className="flex">
      <Header />
      <div className="home-search">
        <h2>Search for a coin</h2>
        <input
          type="text"
          value={store.query}
          onChange={store.setQuery}
          spellCheck="false"
        />
        <div className="width"></div>
      </div>
      <table className="trending">
        <thead>
          <tr>
            {store.searched ? (
              <></>
            ) : (
              <>
                <th>
                  <span>Coin</span>
                </th>
                <th>
                  <span>Price</span>
                </th>
                <th>
                  <span>24h</span>
                </th>
                <th>
                  <span>Volume(24h)</span>
                </th>
                <th>
                  <span>Market Cap</span>
                </th>
                <th>
                  <span>Last 7 Days</span>
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {store.coins.map((coin) => {
            return <TableRow key={coin.id} data={coin} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
