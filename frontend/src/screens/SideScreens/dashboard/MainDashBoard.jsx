import { useState, useEffect } from "react";

const MainDashboard = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [loadingBitcoin, setLoadingBitcoin] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBitcoinPrice = () => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => response.json())
      .then((data) => {
        setBitcoinPrice(data.bpi.USD.rate);
        setLoadingBitcoin(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu Bitcoin:", error);
        setLoadingBitcoin(false);
      });
  };

  useEffect(() => {
    fetchBitcoinPrice();
    const interval = setInterval(() => {
      fetchBitcoinPrice();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Giá Bitcoin hiện tại</h1>
      {loadingBitcoin ? (
        <p>Đang tải giá Bitcoin...</p>
      ) : (
        <p>Giá Bitcoin (USD): {bitcoinPrice} USD</p>
      )}
    </div>
  );
};

export default MainDashboard;
