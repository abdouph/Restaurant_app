import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useRef } from "react";
import "./player.css";

export function Player() {
  const player = useRef(null);

  return (
    <>
      <MediaPlayer
        load="play"
        posterLoad="eager"
        className="player !rounded-3xl"
        title="Our story"
        src="https://firebasestorage.googleapis.com/v0/b/nour-el-djazair.appspot.com/o/6015593_Chef_Man_1920x1080.mp4?alt=media&token=61005777-da89-4b1f-9467-a4749c620732"
        // crossOrigin
        playsInline
        ref={player}
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src="https://firebasestorage.googleapis.com/v0/b/nour-el-djazair.appspot.com/o/Fichier%205.png?alt=media&token=e4bd84c5-c030-4371-9a77-663bbfc91769"
            alt="Our story"
          />
        </MediaProvider>
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </>
  );
}
