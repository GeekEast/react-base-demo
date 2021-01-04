import React, { useEffect, useState } from "react";
import "./styles/App.css";
import styled from "styled-components";
import classNames from "classnames";
import Card from "./components/Card";

const tickers = ["aapl", "goog", "tsla"];

const StyledBoard = styled.div.attrs((props) => ({
  className: classNames("grid grid-cols-24 gap-x-6", props.className),
}))`
  height: 1000px;
`;

const StyledBlock = styled.div.attrs((props) => ({
  className: classNames("bg-gray rounded-md", props.className),
}))`
  height: 600px;
`;

const StyledButton = styled.button.attrs((props) => ({
  className: classNames(
    "bg-blue rounded-md text-white uppercase font-semibold w-full focus:outline-none",
    props.className
  ),
}))`
  height: 55px;
`;

const App = () => {
  return (
    <StyledBoard className="pt-48">
      <StyledBlock className="portfolio col-start-4 col-span-6 h-96 divide-y">
        <div className="top text-center h-40 space-y-3 pt-5">
          <div className="name text-gray-200 uppercase text-sm font-semibold">
            current portfolio
          </div>
          <div className="number text-5xl">$451,234</div>
          <div className="change">
            <span className="text-green-500">+7.1%</span> today
          </div>
        </div>
        <div className="bottom pt-8">
          <div className="w-9/12 mx-auto">
            <StyledButton>add stock</StyledButton>
            <div className="uppercase text-gray-200 text-xs font-bold my-5">
              today's changes
            </div>
            <div className="cards space-y-7">
              {tickers.map((ticker) => (
                <Card ticker={ticker} />
              ))}
            </div>
          </div>
        </div>
      </StyledBlock>
      <StyledBlock className="dashboard col-span-12 h-96"></StyledBlock>
    </StyledBoard>
  );
};

export default App;
