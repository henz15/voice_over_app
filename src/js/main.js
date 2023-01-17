const synth = window.speechSynthesis;
const textInput = document.getElementById("txtEnglish");
const voiceForm = document.querySelector("form");
const voiceSpeedBtn = document.querySelector("#btnVoiceSpeed");
const pausePlayBtn = document.querySelector("#btnPausePlay");
const selectBox = document.querySelector("#ddlVoices");

let voiceSpeed = 1;
let voices = [];
let selectedVoice = 0;
const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>`;

const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>`;

synth.cancel();
textInput.value =
  "Malawi Law Society (MLS) will from 7th to 11th next month host the 2022 African Bar Association annual conference in Lilongwe. This is the continent’s biggest gathering of legal minds and President Lazarus Chakwera will be the guest of honour with Vice-President of Liberia Senator Jewel Howard Taylor being the keynote speaker. In this interview, our News Analyst LUCKY MKANDAWIRE speaks to MLS president PATRICK GRAY MPAKA on the conference and other issues. Excerpts";

const getVoices = () => {
  voices = synth.getVoices();
  let options = [];
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name) {
      options.push(
        `<option value=${voices[i].name}>${voices[i].name}</option>`
      );
    }
  }
  console.log(synth.getVoices());
  selectBox.innerHTML = options.join(" ");
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {
  if (synth.speaking) {
    return;
  }

  if (textInput.value) {
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    speakText.onend = (e) => {
      voiceSpeedBtn.style.visibility = "visible";
      pausePlayBtn.innerHTML = `${playIcon} Play`;
      textInput.disabled = false;
    };

    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };

    speakText.voice = voices[selectedVoice];
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
  selectBox.style.visibility = "hidden";

  if (pausePlayBtn.textContent.trim() === "Pause" && synth.speaking) {
    synth.pause();
    pausePlayBtn.innerHTML = `${playIcon} Resume`;
    textInput.disabled = false;
    return;
  }

  if (pausePlayBtn.textContent.trim() === "Resume" && synth.paused) {
    synth.resume();
    pausePlayBtn.innerHTML = `${pauseIcon} Pause`;
    textInput.disabled = true;
    return;
  }

  speak();
  pausePlayBtn.innerHTML = `${pauseIcon} Pause`;
  textInput.disabled = true;
});

function changeFunc(e) {
  selectedVoice = selectBox.selectedIndex;
  console.log(selectedVoice);
}

function convertAudio() {
  document.getElementById("divAudioContainer").innerHTML = `
      <div class="w-full flex gap-10 flex-col sm:flex-row">
      <audio src="Audios/aud_test.mp3" controls></audio>
      <div class="flex flex-col gap-5">
      <p>This is basically an audio player, all options but voices are available</p>
      <p>It is based on the gtts (Google Text to Speech technology)</p>
      </div></div>`;
  // const requestTextToAudio = {
  //   audioPath: `C:/Users/Henry/source/repos/voice_over_app/src/Audios/aud_test.mp3`,
  //   message: textInput.value.trim(),
  //   fireAndForget: false,
  // };

  // fetch("http://localhost:3001/api/textToAudio/convert", {
  //   method: "POST",
  //   headers: {
  //     Accept: "*/*",
  //     "Content-Type": "application/json",
  //     "access-control-allow-origin": "*",
  //   },
  //   body: JSON.stringify(requestTextToAudio),
  // })
  //   .then((response) => {
  //     if (!response.ok) throw new Error(response.statusText);
  //     return response.json();
  //   })
  //   .then((data) => {
  //     document.getElementById("divAudioContainer").innerHTML = `
  //     <div class="flex gap-10 justify-center w-full">
  //     <audio src="Audios/aud_test.mp3" controls></audio>
  //     <p>Has control like normal audio, but no provision for voices</p></div>`;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
}

convertAudio();
