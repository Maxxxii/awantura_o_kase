import express from "express";
import playSound from "play-sound";
import { spawn } from "child_process";

const router = express.Router();
const player = playSound({ player: "mplayer" });
let musicProcess = null;

router.post("/play-intro", (req, res) => {
  if (!musicProcess) {
    musicProcess = spawn("mplayer", ["-slave", "-quiet", "path_to_root/public/sounds/intro.mp3"], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    musicProcess.on("error", (err) => {
      console.log(`Error playing sound: ${err}`);
      res.status(500).send("Error playing sound");
      musicProcess = null;
    });

    musicProcess.on("close", (code) => {
      console.log(`mplayer exited with code ${code}`);
      musicProcess = null;
    });

    console.log("Intro started successfully");
    res.status(200).send("Sound started");
  } else {
    console.log("Music is already playing");
    res.status(200).send("Music is already playing");
  }
});

router.post("/pause-intro", (req, res) => {
  if (musicProcess && musicProcess.stdin) {
    musicProcess.stdin.write("p\n");
    res.status(200).send("Music paused/resumed");
  } else {
    console.log("No music to pause/resume");
    res.status(400).send("No music to pause/resume");
  }
});

router.post("/fade-out", (req, res) => {
  let volume = 100;
  const step = 1;
  const delay = 200;

  function fadeOut() {
    if (volume > 80) {
      setTimeout(() => {
        volume -= step;
        if (volume < 0) volume = 0;

        if (musicProcess && musicProcess.stdin) {
          musicProcess.stdin.write(`volume -${step} 0\n`);
          fadeOut();
        }
      }, delay);
    } else {
      if (musicProcess) {
        musicProcess.stdin.write("quit\n");
        musicProcess = null;
      }
    }
  }

  if (musicProcess && musicProcess.stdin) {
    fadeOut();
    res.status(200).send("Intro fade-out");
  } else {
    console.log("No music to fade-out");
    res.status(400).send("No music to fade-out");
  }
});

router.post("/stop-intro", (req, res) => {
  if (musicProcess) {
    musicProcess.kill();
    musicProcess = null;
    res.status(200).send("Music stopped");
  } else {
    console.log("No music to stop");
    res.status(400).send("No music to stop");
  }
});

router.post("/play-category", (req, res) => {
  if (!musicProcess) {
    musicProcess = player.play("path_to_root/public/sounds/category.mp3", { mplayer: ["-loop", 1] }, (err) => {
      if (err) {
        console.log(`Error playing sound: ${err}`);
        res.status(500).send("Error playing sound");
      } else {
        console.log("Category sound started successfully");
        res.status(200).send("Sound started");
      }
      musicProcess = null;
    });
  } else {
    console.log("Music is already playing");
    res.status(200).send("Music is already playing");
  }
});

router.post("/play-bid", (req, res) => {
  musicProcess = player.play("path_to_root/public/sounds/bid.mp3", { mplayer: ["-loop", 1] }, (err) => {
    if (err) {
      console.log(`Error playing sound: ${err}`);
      res.status(500).send("Error playing sound");
    } else {
      console.log("Bid sound started successfully");
      res.status(200).send("Sound started");
    }
    musicProcess = null;
  });
});

export default router;
