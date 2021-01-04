import React, { useEffect, useState } from "react";
import classNames from "classnames";
import _ from "lodash";

const formatNumber = (n: number) =>
  n.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

const shares = {
  aapl: 130,
  goog: 1000,
  tsla: 50,
  baba: 10000,
};

const useGetData = (ticker: string, attrs?: string[]) => {
  const [data, setData] = useState<{ change: number; changePercent: number }>({
    change: 0,
    changePercent: 0,
  });
  useEffect(() => {
    const token = process.env.REACT_APP_API_KEY;
    const url = `${process.env.REACT_APP_API_URL_BASE}/stock/${ticker}/quote?token=${token}&displayPercent=true`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [ticker]);
  return attrs ? (_.pick(data, attrs) as any) : (data as any);
};

const Card = ({ ticker }: { ticker: string }) => {
  const { change, changePercent } = useGetData(ticker, [
    "change",
    "changePercent",
  ]);
  return (
    <div className="bg-white rounded-md h-16 font-bold p-2 px-4">
      <div className="change">
        <span className="uppercase">{ticker} </span>
        <span
          className={classNames({
            "text-green-500": change >= 0,
            "text-red-500": change < 0,
          })}
        >
          {change >= 0 ? "+" : "-"}${formatNumber(Math.abs(change))} (
          {changePercent}%)
        </span>
      </div>
      <div className="total">
        {_.get(shares, [ticker])} shares:{" "}
        <span
          className={classNames({
            "text-green-500": change >= 0,
            "text-red-500": change < 0,
          })}
        >
          {change >= 0 ? "+" : "-"}$
          {formatNumber(change * _.get(shares, [ticker]))}
        </span>
      </div>
    </div>
  );
};

export default Card;
