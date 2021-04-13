/* global chrome */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { DEFAULT_POSITION_VALUE } from "./constants";
import "./content.css";

const isWindowTop = () => window.scrollY === 0;
const isWindowBottom = () =>
  window.scrollY + window.innerHeight >= document.body.scrollHeight;

const ScrollToTopIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.2 46.4L31.2 25.0667C31.6 24.5333 32.4 24.5333 32.8 25.0667L48.8 46.4C49.2944 47.0592 48.824 48 48 48H16C15.176 48 14.7056 47.0592 15.2 46.4Z"
      // fill="#F0F1F2"
      stroke="#323333"
      stroke-width="6"
    />
    <rect
      x="16.5"
      y="13.5"
      width="31"
      height="5"
      rx="2.5"
      fill="#323333"
      stroke="#323333"
    />
  </svg>
);

const ScrollToBottomIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M48.8 17.6L32.8 38.9333C32.4 39.4667 31.6 39.4667 31.2 38.9333L15.2 17.6C14.7056 16.9408 15.176 16 16 16L48 16C48.824 16 49.2944 16.9408 48.8 17.6Z"
      // fill="#F0F1F2"
      stroke="#323333"
      stroke-width="6"
    />
    <rect
      x="47.5"
      y="50.5"
      width="31"
      height="5"
      rx="2.5"
      transform="rotate(-180 47.5 50.5)"
      fill="#323333"
      stroke="#323333"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M46.3187 33.96C46.3987 33.32 46.4587 32.68 46.4587 32C46.4587 31.32 46.3987 30.68 46.3187 30.04L50.5387 26.74C50.9187 26.44 51.0187 25.9 50.7787 25.46L46.7787 18.54C46.5987 18.22 46.2587 18.04 45.8987 18.04C45.7787 18.04 45.6587 18.06 45.5587 18.1L40.5787 20.1C39.5387 19.3 38.4187 18.64 37.1987 18.14L36.4387 12.84C36.3787 12.36 35.9587 12 35.4587 12H27.4587C26.9587 12 26.5387 12.36 26.4787 12.84L25.7187 18.14C24.4987 18.64 23.3787 19.32 22.3387 20.1L17.3587 18.1C17.2387 18.06 17.1187 18.04 16.9987 18.04C16.6587 18.04 16.3187 18.22 16.1387 18.54L12.1387 25.46C11.8787 25.9 11.9987 26.44 12.3787 26.74L16.5987 30.04C16.5187 30.68 16.4587 31.34 16.4587 32C16.4587 32.66 16.5187 33.32 16.5987 33.96L12.3787 37.26C11.9987 37.56 11.8987 38.1 12.1387 38.54L16.1387 45.46C16.3187 45.78 16.6587 45.96 17.0187 45.96C17.1387 45.96 17.2587 45.94 17.3587 45.9L22.3387 43.9C23.3787 44.7 24.4987 45.36 25.7187 45.86L26.4787 51.16C26.5387 51.64 26.9587 52 27.4587 52H35.4587C35.9587 52 36.3787 51.64 36.4387 51.16L37.1987 45.86C38.4187 45.36 39.5387 44.68 40.5787 43.9L45.5587 45.9C45.6787 45.94 45.7987 45.96 45.9187 45.96C46.2587 45.96 46.5987 45.78 46.7787 45.46L50.7787 38.54C51.0187 38.1 50.9187 37.56 50.5387 37.26L46.3187 33.96Z"
      // fill="#C2C3C4"
      stroke="#323333"
      stroke-width="6"
    />
    <circle cx="31.5" cy="32" r="6" fill="#323333" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M29.5143 18.5009L31.7984 21.1831L34.0824 18.5009C35.9077 16.3575 38.7231 15 41.6076 15C46.6647 15 50.5967 18.9321 50.5967 23.9891C50.5967 27.1235 49.2141 30.2018 46.1656 33.929C43.0826 37.6982 38.6173 41.7556 32.9439 46.9003L32.9396 46.9042L31.7907 47.9501L30.6552 46.9242C30.6541 46.9232 30.653 46.9223 30.652 46.9213C24.9794 41.7664 20.5149 37.7045 17.4318 33.9325C14.3826 30.202 13 27.1236 13 23.9891C13 18.9321 16.9321 15 21.9891 15C24.8737 15 27.6891 16.3575 29.5143 18.5009Z"
      // fill="#FF9D89"
      stroke="#323333"
      stroke-width="6"
    />
  </svg>
);

const Content = () => {
  const [isTop, setIsTop] = useState(isWindowTop());

  useEffect(() => {
    const onScroll = () => {
      setIsTop(isWindowTop());
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isTop]);

  const [isBottom, setIsBottom] = useState(isWindowBottom());

  useEffect(() => {
    const onScroll = () => {
      setIsBottom(isWindowBottom());
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isBottom]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToBottom = () =>
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

  return (
    <React.Fragment>
      <button
        className={isTop ? "options" : "scroll-to-top"}
        onClick={
          isTop
            ? () => chrome.runtime.sendMessage({ action: "openOptionsPage" })
            : scrollToTop
        }
      >
        {isTop ? <SettingsIcon /> : <ScrollToTopIcon />}
      </button>
      <button
        className={isBottom ? "support" : "scroll-to-bottom"}
        onClick={
          isBottom
            ? () => chrome.runtime.sendMessage({ action: "openSupportPage" })
            : scrollToBottom
        }
      >
        {isBottom ? <SupportIcon /> : <ScrollToBottomIcon />}
      </button>
    </React.Fragment>
  );
};

const app = document.createElement("div");
app.id = "scrollable-root";
document.body.appendChild(app);
ReactDOM.render(<Content />, app);

chrome.storage.sync.get(
  { position: DEFAULT_POSITION_VALUE },
  ({ position }) => {
    app.classList.add(position);
  }
);

chrome.storage.onChanged.addListener((changes) => {
  if (changes.position) {
    app.classList.remove(changes.position.oldValue);
    app.classList.add(changes.position.newValue);
  }
});
