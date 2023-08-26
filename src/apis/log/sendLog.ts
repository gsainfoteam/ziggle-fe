import LogEvents from "./log-event";

declare global {
  interface Window {
    smartlook: any;
  }
}

const sendLog = (event: LogEvents, data?: object) => {
  window.smartlook("track", event, data);
};

export default sendLog;
