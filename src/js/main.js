const synth = window.speechSynthesis;
const textInput = document.getElementById("txtEnglish");
const voiceForm = document.querySelector("form");
const voiceSpeedBtn = document.querySelector("#btnVoiceSpeed");
const pausePlayBtn = document.querySelector("#btnPausePlay");

let voiceSpeed = 1;
let voices = [];
const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>`;

const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>`;

synth.cancel();

const getVoices = () => {
  voices = synth
    .getVoices()
    .filter((x) => x.lang === "en-GB" || x.lang === "en-US");
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {
  if (synth.speaking) {
    console.log("Already speaking");
    return;
  }

  if (textInput.value) {
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    speakText.onend = (e) => {
      voiceSpeedBtn.style.visibility = "visible";
      pausePlayBtn.innerHTML = `${playIcon} Play`;
      console.log("done speaking........");
    };

    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };

    speakText.voice = voices[2];
    speakText.rate = voiceSpeed;
    speakText.pitch = 1;

    synth.speak(speakText);
  }
};

voiceSpeedBtn.addEventListener("click", function (e) {
  switch (this.textContent) {
    case "0.5x":
      this.textContent = "1x";
      voiceSpeed = 1;
      break;
    case "1x":
      this.textContent = "1.5x";
      voiceSpeed = 1.5;
      break;
    case "1.5x":
      this.textContent = "2x";
      voiceSpeed = 2;
      break;
    case "2x":
      this.textContent = "0.5x";
      voiceSpeed = 0.5;
      break;
    default:
      this.textContent = "1.5x";
      voiceSpeed = 1.5;
      break;
  }
});

voiceForm.addEventListener("submit", function (e) {
  e.preventDefault();

  voiceSpeedBtn.style.visibility = "hidden";

  if (pausePlayBtn.textContent.trim() === "Pause" && synth.speaking) {
    synth.pause();
    pausePlayBtn.innerHTML = `${playIcon} Play`;
    textInput.blur();
    return;
  }

  if (pausePlayBtn.textContent.trim() === "Play" && synth.paused) {
    synth.resume();
    pausePlayBtn.innerHTML = `${pauseIcon} Pause`;
    textInput.blur();
    return;
  }

  speak();
  pausePlayBtn.innerHTML = `${pauseIcon} Pause`;
  textInput.blur();
});
