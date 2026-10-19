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
 * 3D-printable parts. The STL files were not inside the HTML export:
 * upload soporte_del_motor.stl and UNO_R2_MOUNT.stl to the same "hardware"
 * folder on iGEM Uploads and check the final URL (copy it from Uploads).
 */
export const STL = {
  motorSupport: img("soporte_del_motor.stl"),
  arduinoMount: img("UNO_R2_MOUNT.stl"),
};
