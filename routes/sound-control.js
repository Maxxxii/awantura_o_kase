import express from "express";
import playSound from "play-sound";

const router = express.Router();
const player = playSound({ player: "mplayer" });
let musicProcess = null;

router.post("/play-intro", (req, res) => {
  if (!musicProcess) {
    musicProcess = player.play("X:/Apps/awantura_o_kase/public/sounds/intro.mp3", (err) => {
      if (err) {
        console.log(`Error playing sound: ${err}`);
        res.status(500).send("Error playing sound");
      } else {
        console.log("Intro started successfully");
        res.status(200).send("Sound started");
      }
      musicProcess = null;
    });
  } else {
    console.log("Music is already playing");
    res.status(200).send("Music is already playing");
  }
});

router.post("/pause-intro", (req, res) => {
  if (musicProcess) {
    musicProcess.stdin.write("p");
    res.status(200).send("Music paused/resumed");
  } else {
    console.log("No music to pause/resume");
    res.status(400).send("No music to pause/resume");
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
    musicProcess = player.play("X:/Apps/awantura_o_kase/public/sounds/category.mp3", { mplayer: ["-loop", 1] }, (err) => {
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
  if (!musicProcess) {
    musicProcess = player.play("X:/Apps/awantura_o_kase/public/sounds/bid.mp3", { mplayer: ["-loop", 1, "-endpos", 1] }, (err) => {
      if (err) {
        console.log(`Error playing sound: ${err}`);
        res.status(500).send("Error playing sound");
      } else {
        console.log("Bid sound started successfully");
        res.status(200).send("Sound started");
      }
      musicProcess = null;
    });
  } else {
    console.log("Music is already playing");
    res.status(200).send("Music is already playing");
  }
});

export default router;
