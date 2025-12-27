// ================= AUDIO SYSTEM =================
let audioUnlocked = false;
let soundEnabled = true;

const sounds = {
  boot: new Audio("sounds/boot.mp3"),
  type: new Audio("sounds/type.mp3"),
  error: new Audio("sounds/error.mp3")
};

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function unlockAudio() {
  if (!audioUnlocked) {
    audioCtx.resume().then(() => {
      audioUnlocked = true;
      sounds.boot.play().catch(() => {});
    });
  }
}

document.addEventListener("keydown", unlockAudio, { once: true });
document.addEventListener("click", unlockAudio, { once: true });

function playSound(name) {
  if (!audioUnlocked || !soundEnabled) return;
  const s = sounds[name];
  s.currentTime = 0;
  s.play().catch(() => {});
}

// ================= MATRIX BACKGROUND =================
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "アカサタナハマヤラ0123456789";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0,255,0,0.45)";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 33);

// ================= TERMINAL CORE =================
const input = document.getElementById("input");
const output = document.getElementById("output");

let history = [];
let historyIndex = 0;
let isTyping = false;

// ================= DATA LOADING =================
let profile, skills, projects, experience;

async function loadData() {
  [profile, skills, projects, experience] = await Promise.all([
    fetch("data/profile.json").then(r => r.json()),
    fetch("data/skills.json").then(r => r.json()),
    fetch("data/projects.json").then(r => r.json()),
    fetch("data/experience.json").then(r => r.json())
  ]);
}

// ================= TYPEWRITER =================
function typeText(text, speed = 18) {
  return new Promise(resolve => {
    const line = document.createElement("pre");
    output.appendChild(line);

    let i = 0;
    isTyping = true;

    const interval = setInterval(() => {
      line.textContent += text[i] || "";
      if (text[i]) playSound("type");
      i++;
      output.scrollTop = output.scrollHeight;

      if (i >= text.length) {
        clearInterval(interval);
        isTyping = false;
        resolve();
      }
    }, speed);
  });
}

// ================= BOOT =================
async function boot() {
  await loadData();
  await typeText("Booting Matrix OS...\n");
  await typeText("Loading user profile...\n");
  await typeText("System ready.\n");
  await typeText("Type 'help' to begin.\n");
}
boot();

// ================= COMMANDS =================
const commands = {
  help: async () => await typeText(`
help        show commands
about       about me
skills      list skills
projects    list projects
experience  work experience
sound       toggle sound
clear       clear terminal
`),

  about: async () => await typeText(
    `${profile.name}\n${profile.title}\n\n${profile.bio}`
  ),

  skills: async () =>
    await typeText(skills.map(s => `• ${s}`).join("\n")),

  projects: async () =>
    await typeText(projects.map(p => `• ${p.name}\n  ${p.desc}`).join("\n\n")),

  experience: async () =>
    await typeText(
      experience.map(e =>
        `${e.role} @ ${e.company}\n${e.period}\n${e.desc}`
      ).join("\n\n")
    )
};

// ================= INPUT HANDLER =================
input.addEventListener("keydown", async e => {
  if (isTyping) return;

  if (e.key.length === 1) playSound("type");

  if (e.key === "Enter") {
    const cmd = input.value.trim();
    history.push(cmd);
    historyIndex = history.length;

    await typeText(`DJ@portfolio:~$ ${cmd}\n`);

    if (cmd === "clear") {
      output.innerHTML = "";
    }
    else if (cmd === "sound") {
      soundEnabled = !soundEnabled;
      await typeText(`Sound ${soundEnabled ? "enabled" : "disabled"}\n`);
    }
    else if (commands[cmd]) {
      await commands[cmd]();
    }
    else {
      playSound("error");
      await typeText("Command not found\n");
    }

    input.value = "";
  }

  if (e.key === "ArrowUp") {
    if (historyIndex > 0) input.value = history[--historyIndex];
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1)
      input.value = history[++historyIndex];
    else input.value = "";
  }
});
