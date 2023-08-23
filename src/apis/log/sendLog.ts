import LogEvents from "./log-event";

const sendLog = (event: LogEvents, data?: object) => {
  // @ts-ignore
  window.smartlook("track", event, data);

  console.log(`[Smartlook] ${event}`, data);
};

export default sendLog;
