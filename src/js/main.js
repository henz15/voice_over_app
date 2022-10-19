const synth = window.speechSynthesis;
const textInput = document.getElementById("txtEnglish");
const voicesDdl = document.getElementById("ddlVoices");
const voiceForm = document.querySelector("form");
const voiceSpeedBtn = document.querySelector("#btnVoiceSpeed");
const pausePlayBtn = document.querySelector("#btnPausePlay");

let voiceSpeed = 1;
let voices = [];

synth.cancel();

const getVoices = () => {
  voices = synth.getVoices();

  voices
    .filter((x) => x.lang === "en-GB" || x.lang === "en-US")
    .forEach((voice) => {
      const option = document.createElement("option");

      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);

      voicesDdl.appendChild(option);
    });
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
      console.log("done speaking........");
    };

    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };

    const selectedVoice =
      voicesDdl.selectedOptions[0].getAttribute("data-name");

    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    speakText.rate = voiceSpeed;
    speakText.pitch = 1;

    synth.speak(speakText);
  }
};

voiceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

voicesDdl.addEventListener("change", (e) => {
  speak();
});

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

pausePlayBtn.addEventListener("click", function (e) {
  if (this.textContent === "Pause" && synth.speaking) {
    synth.pause();
    this.textContent = "Play";
  } else {
    if (synth.paused) {
      synth.resume();
      this.textContent = "Pause";
    }
  }
});
