# 🖥️ Terminal Portfolio

A fully interactive **terminal-style personal portfolio** built using **HTML, CSS, and JavaScript**.
Inspired by hacker terminals and retro interfaces, this project simulates a real command-line experience inside the browser.

---

## 🚀 Features

* 🧠 **Terminal-style interface**
* ⌨️ **Command-based interaction**
* 🎯 **Typing animation for realistic output**
* 🌌 **Matrix rain background**
* 🔊 **Typing + system sound effects**
* 📁 **Fake file system (ls, cd, cat, pwd)**
* 📜 **JSON-driven content**
* 🎨 **Theme-friendly design**
* ⚡ **Fast & lightweight (no frameworks)**

---

## 📂 Project Structure

```
portfolio/
│
├── index.html
├── style.css
├── script.js
│
├── data/
│   ├── profile.json
│   ├── skills.json
│   ├── projects.json
│   └── experience.json
│
├── sounds/
│   ├── boot.mp3
│   ├── type.mp3
│   └── error.mp3
│
└── assets/
    └── (optional icons / images)
```

---

## 🧠 Supported Commands

| Command      | Description                 |
| ------------ | --------------------------- |
| `help`       | Show all available commands |
| `about`      | About me                    |
| `skills`     | List technical skills       |
| `projects`   | Show projects               |
| `experience` | Work experience             |
| `ls`         | List files                  |
| `cd`         | Navigate folders            |
| `cat`        | Read a file                 |
| `clear`      | Clear terminal              |
| `sound`      | Toggle sound on/off         |

---

## 🧾 Example Commands

```bash
help
about
skills
projects
cd projects
ls
cat resume.txt
```

---

## 📁 Data Files (Editable)

All content is stored inside the `data/` folder.

### `data/profile.json`

```json
{
  "name": "Your Name",
  "title": "Software Developer",
  "bio": "I build clean, scalable software and interactive experiences."
}
```

### `data/skills.json`

```json
["JavaScript", "HTML", "CSS", "Node.js", "Linux"]
```

### `data/projects.json`

```json
[
  {
    "name": "Terminal Portfolio",
    "desc": "A terminal-based interactive portfolio website."
  }
]
```

### `data/experience.json`

```json
[
  {
    "role": "Developer",
    "company": "Freelance",
    "period": "2023 - Present",
    "desc": "Building web and automation projects."
  }
]
```

---

## 🧠 How It Works

* All commands are parsed in `script.js`
* Output is printed with a **typewriter animation**
* File system is simulated in JavaScript
* Data is dynamically loaded from JSON files
* Matrix background runs via `<canvas>`

---

## ▶️ Run Locally

You can run this project using any local server.

### Option 1: VS Code Live Server

1. Open folder in VS Code
2. Right-click `index.html`
3. Click **Open with Live Server**

### Option 2: Python

```bash
python -m http.server
```

Then open:

```
http://localhost:8000
```

---

## 🎨 Customization

You can easily:

* Change theme colors in `style.css`
* Adjust typing speed in `script.js`
* Replace sound effects in `/sounds`
* Add new commands in `script.js`

---

## 🧩 Future Enhancements

* User profiles
* Command history persistence
* Theme switcher
* Mobile optimizations

---

## 📜 License

MIT License
Free to use, modify, and distribute.
