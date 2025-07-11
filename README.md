# 🎬 LocalFlix

**LocalFlix** is a personal, privacy-respecting Netflix-style web app that lets you browse, play, and organize video content from your local file system.

## 🚀 Features

- 🎥 Browse local folders of Movies and TV Shows (organized by folder structure)
- 🖼️ Automatically display posters (jpg/png/webp) alongside each video
- 📽️ HTML5 video player with resume playback support
- 🧠 "Continue Watching" smart banner (remembers where you left off)
- 🔍 Search bar to quickly find a movie or show
- 📂 TV Shows and Movies filter
- ✅ "My List" feature to bookmark your favorite content
- 💻 Responsive and mobile-friendly layout

---

## 🛠️ Technologies Used

| Tech                  | Description                                             |
|-----------------------|---------------------------------------------------------|
| **React**             | Modern UI library used to build the entire SPA          |
| **JavaScript (ES6+)** | Core scripting logic and state management               |
| **File System Access API** | Read videos/images directly from the user's local folders |
| **HTML5 Video API**   | Local video playback and progress tracking              |
| **CSS Modules / Custom CSS** | Custom styling with hover effects and modals      |
| **React Hooks**       | `useState`, `useEffect`, `useMemo` for state logic      |

---

## 🧠 How It Works

1. **Folder Selection**  
   Users select a main folder that contains subfolders (e.g., "Movies", "TV Shows"). Each subfolder is treated as a title, and optional poster images (like JPG/PNG) are matched to videos by filename similarity.

2. **Smart Resume**  
   The app saves playback progress in `localStorage` and shows a "Continue Watching" banner for the most recently watched video.

3. **Search & Filter**  
   Users can filter content by title or by category (TV Shows / Movies), and results update instantly.

4. **"My List" Bookmarking**  
   Each show or movie can be bookmarked and revisited later from the "My List" tab in the header.

---

## 📸 Screenshots

### 🎬 Home Screen (Banner + Collection Grid)
![Home Screen](https://i.imgur.com/GZGeFbK.png)

### ▶️ Video Player Modal
![Video Modal](https://i.imgur.com/se4Kvep.png)

### ✅ My List View
![My List](https://i.imgur.com/5fNeYH6.png)

---

## 💡 Ideal Use Cases

- Personal media library organizer
- Works completely offline with no server/backend
- Ideal for home servers, external drives, or shared family video collections
- Great for educational institutions managing offline video courses

---

## 📦 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/localflix.git
   cd localflix
