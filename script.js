document.addEventListener("DOMContentLoaded", () => {
  // select elements
  const startButton = document.getElementById("start-countdown");
  const pauseButton = document.getElementById("pause-countdown");
  const resumeButton = document.getElementById("resume-countdown");
  const cancelButton = document.getElementById("cancel-countdown");

  //! initial value

  let countdownTimer;
  let endTime;

  // Function to update the display
  function updateDisplay(time) {
    //! Get Days
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    //! Get Hours
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    //! Get Minutes
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    //! Get seconds
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }
  updateDisplay(new Date());
  // Function to reset update display
  function resetDisplayAndButtons() {
    document.getElementById("target-date").textContent = "";
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    startButton.disabled = false;
    pauseButton.disabled = true;
    resumeButton.disabled = true;
    cancelButton.disabled = true;
  }
  // Function to start the counter

  function startCountDown(duration, isResuming = false) {
    if (!isResuming) {
      endTime = Date.now() + duration;
    }
    countdownTimer = setInterval(() => {
      const now = Date.now();
      const timeLeft = endTime - now;
      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        displayMessage("Count Down Finished");
        localStorage.removeItem("countdownTarget");
        resetDisplayAndButtons();
        return;
      }
      updateDisplay(timeLeft);
      pauseButton.disabled = false;
      cancelButton.disabled = false;
    }, 1000);
  }
  // Function to display the message
  function displayMessage(message) {
    const display = document.getElementById("timer-display");
    display.textContent = message;
  }

  // Function to add event listeners to buttons
  //! Start button
  startButton.addEventListener("click", function () {
    const targetDateValue = document.getElementById("target-date").value;
    if (targetDateValue) {
      const targetDate = new Date(targetDateValue);
      const now = new Date();
      if (targetDate > now) {
        const duration = targetDate - now;
        localStorage.setItem("countdownTarget", targetDate.toString());
        startCountDown(duration);
        startButton.disabled = true;
        pauseButton.disabled = false;
        resumeButton.disabled = true;
        cancelButton, (disabled = false);
      } else {
        alert("Please Select Feature Date and Time");
      }
    } else {
      alert("Please Select Date and time");
    }
  });
  //! Pause button
  pauseButton.addEventListener("click", function () {
    clearInterval(countdownTimer);
    pauseButton.disabled = true;
    resumeButton.disabled = false;
  });
  //! Resume button
  resumeButton.addEventListener("click", function () {
    const duration = endTime - Date.now();
    startCountDown(duration, true);
    pauseButton.disabled = false;
    resumeButton.disabled = true;
  });
  //! Cancel button
  cancelButton.addEventListener("click", function () {
    clearInterval(countdownTimer);
    localStorage.removeItem("countdownTimer");
    resetDisplayAndButtons();
  });
  // Function to load and auto-start the counter if a saved target exist
  const savedDate = localStorage.getItem("countdownTimer");
  if (savedDate) {
    const targetDate = new Date(savedDate);
    const now = new Date();
    if (targetDate > now) {
      const duration = targetDate - now;
      startButton.disabled = true;
      pauseButton.disabled = false;
      cancelButton.disabled = false;
    } else {
      localStorage.removeItem("countdownTarget");
      resetDisplayAndButtons();
    }
  }
});
