import pyUrl from "./files/L298N_V4_30_python.py?url";
import inoUrl from "./files/L298N_V4_30_Arduino.ino?url";

import { img } from "./images.ts";

export { img };

export type IgemVideoInfo = { id: string; title: string };

/* Videos hosted on video.igem.org (PeerTube), embedded without sound. */
export const VIDEOS: Record<"video1" | "video2" | "video3" | "video4" | "video5", IgemVideoInfo> = {
  video1: { id: "dcQcmtf97nT6iiw7fEGPFH", title: "Madrid-UCM: RePhlow's process (2026)" },
  video2: { id: "s2boPeSdKyYo246Xfxkf4e", title: "Video 2 - Assembly of the coaxial injector" },
  video3: {
    id: "2vf2f3tDDaYJABJp12hy1F",
    title: "Madrid-UCM: Rotating-bed bioreactor at preliminary test (2026) [Spanish]",
  },
  video4: {
    id: "tREeXr1D1WxYr454GpD53e",
    title: "Madrid-UCM: Rotating-bed bioreactor at 120 rpm in dry conditions (2026)",
  },
  video5: { id: "aqRSm7qkG6XmaGRVncSobM", title: "Madrid-UCM: Rotating-bed bioreactor assembly (2026)" },
};

/* Code downloads: bundled by Vite from ./files (no upload needed). */
export const FILES = { py: pyUrl, ino: inoUrl };

/*
 * 3D-printable parts, in the same "hardware" folder on iGEM Uploads as the
 * images. Both were replaced with revised geometry; Uploads serves a name
 * it already holds rather than overwriting it, so the new files went up
 * under their own "-v2" names and are named here explicitly.
 */
export const STL = {
  motorSupport: img("soporte-del-motor-v2.stl"),
  arduinoMount: img("uno-r2-mount-v2.stl"),
};
