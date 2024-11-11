// Store the original console.log function
const originalConsoleLog = console.log;

// Override console.log
const consoleOverride = (level) => {
  return function (...args) {
    // Call the original console.log with the same arguments
    originalConsoleLog.apply(console, args);

    // Create a new div element to hold the log message
    const logMessage = document.createElement("div");

    const timestamp = new Date().toISOString();
    const logText = `${timestamp} > ${args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
      .join(" ")}`;

    logMessage.style.whiteSpace = "pre-wrap"; // To handle formatted messages
    logMessage.textContent = logText;

    // Append the message to a container div
    let logContainer = document.getElementById("logContainer");
    if (!logContainer) {
      logContainer = document.createElement("pre");
      logContainer.id = "logContainer";
      logContainer.style.position = "sticky";
      logContainer.style.bottom = "10px";
      logContainer.style.width = "70vw";
      logContainer.style.border = "1px solid #ccc";
      logContainer.style.padding = "10px";
      logContainer.style.borderRadius = "10px";
      logContainer.style.marginTop = "20px";
      logContainer.style.maxHeight = "80px";
      logContainer.style.backgroundColor = "black";
      logContainer.style.color = "white";
      logContainer.style.overflowY = "scroll";
      document.body.appendChild(logContainer);
    }
    logContainer.appendChild(logMessage);
    logContainer.scrollTop = logContainer.scrollHeight;
  };
};

console.log = consoleOverride("log");
console.error = consoleOverride("error");
console.warn = consoleOverride("warn");
console.info = consoleOverride("info");
