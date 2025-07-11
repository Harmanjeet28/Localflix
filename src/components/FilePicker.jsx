import React from "react";

export default function FilePicker({ onPick }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        color: "white",
        maxWidth: 700,
        margin: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 className="text-2xl font-bold mb-6">📂 How to Organize Your Media Folder</h2>

      <div
        style={{
          backgroundColor: "#222",
          borderRadius: 10,
          padding: "1rem 2rem",
          textAlign: "left",
          color: "#ddd",
          lineHeight: 1.5,
        }}
      >
        {/* Step 1 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginRight: 15,
              color: "#E50914", // Netflix red
            }}
          >
            1
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "600" }}>
              Create a main folder for all your media (e.g., <code>LocalFlix</code>).
            </p>
            <img
              src="https://i.imgur.com/F84N6O4.png"
              alt="Main folder example"
              style={{ maxWidth: 380, borderRadius: 6, marginTop: 8 }}
            />
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginRight: 15,
              color: "#E50914", // Netflix red
            }}
          >
            2
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "600" }}>
              Inside that folder, create subfolders for categories like <code>TV Shows</code> and <code>Movies</code>.
            </p>
            <img
              src="https://i.imgur.com/wBExh7v.png"
              alt="Subfolders example"
              style={{ maxWidth: 380, borderRadius: 6, marginTop: 8 }}
            />
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginRight: 15,
              color: "#E50914", // Netflix red
            }}
          >
            3
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "600" }}>
              Inside each category folder (<code>TV Shows</code> or <code>Movies</code>), create one folder for each show or movie with its title as the folder name.
            </p>
            <p style={{ marginTop: 4, color: "#bbb", fontSize: 14 }}>
              For example, inside <code>TV Shows</code> you might have folders named <code>Ben 10</code>, <code>Friends</code>, etc.
            </p>
            <img
              src="https://i.imgur.com/CsGlXDI.png"
              alt="Show/Movie named folder example"
              style={{ maxWidth: 380, borderRadius: 6, marginTop: 8 }}
            />
          </div>
        </div>

        {/* Step 4 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginRight: 15,
              color: "#E50914", // Netflix red
            }}
          >
            4
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "600" }}>
              Inside each show/movie folder, add the video file (.mp4) and optionally an image file (like <code>poster.jpg</code> or <code>cover.png</code>) for cover art.
            </p>
            <img
              src="https://i.imgur.com/nJgofa8.png"
              alt="Show/movie folder example"
              style={{ maxWidth: 380, borderRadius: 6, marginTop: 8 }}
            />
          </div>
        </div>

        <p style={{ color: "#999", fontStyle: "italic", marginTop: 10 }}>
          *You can also put all files in a single folder, but the app won’t organize them nicely.
        </p>
      </div>

      <button
        onClick={onPick}
        className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 transition mt-8"
      >
        Select Folder
      </button>
    </div>
  );
}
