/*
 * All images of the Hardware page (28 AVIF files, hardware-images.zip).
 *
 * Upload them to https://uploads.igem.org inside a folder "hardware".
 * Then EITHER set IMG_BASE once (if Uploads kept the file names),
 * OR paste the exact URL that Uploads gives you for each file below.
 */
export const IMG_BASE = "https://static.igem.wiki/teams/6124/wiki/assets/hardware/";

export const IMAGES: Record<string, string> = {
  "hw-capsules-ab.avif": IMG_BASE + "hw-capsules-ab.avif",
  "hw-fig01-process.avif": IMG_BASE + "hw-fig01-process.avif",
  "hw-fig02-block-flow.avif": IMG_BASE + "hw-fig02-block-flow.avif",
  "hw-fig03a-injector-assembled.avif": IMG_BASE + "hw-fig03a-injector-assembled.avif",
  "hw-fig03b-injector-parts.avif": IMG_BASE + "hw-fig03b-injector-parts.avif",
  "hw-fig04-reactors.avif": IMG_BASE + "hw-fig04-reactors.avif",
  "hw-fig05-initial-bfd.avif": IMG_BASE + "hw-fig05-initial-bfd.avif",
  "hw-fig06-final-bfd.avif": IMG_BASE + "hw-fig06-final-bfd.avif",
  "hw-fig07-motor-support.avif": IMG_BASE + "hw-fig07-motor-support.avif",
  "hw-fig08-arduino-mount.avif": IMG_BASE + "hw-fig08-arduino-mount.avif",
  "hw-fig09-assembly.avif": IMG_BASE + "hw-fig09-assembly.avif",
  "hw-fig10-assembly.avif": IMG_BASE + "hw-fig10-assembly.avif",
  "hw-fig11-assembly.avif": IMG_BASE + "hw-fig11-assembly.avif",
  "hw-fig12-assembly.avif": IMG_BASE + "hw-fig12-assembly.avif",
  "hw-fig13-assembly.avif": IMG_BASE + "hw-fig13-assembly.avif",
  "hw-fig14-assembly.avif": IMG_BASE + "hw-fig14-assembly.avif",
  "hw-fig15-assembly.avif": IMG_BASE + "hw-fig15-assembly.avif",
  "hw-fig16-assembly.avif": IMG_BASE + "hw-fig16-assembly.avif",
  "hw-fig17-assembly.avif": IMG_BASE + "hw-fig17-assembly.avif",
  "hw-fig18-assembly.avif": IMG_BASE + "hw-fig18-assembly.avif",
  "hw-fig19-assembly.avif": IMG_BASE + "hw-fig19-assembly.avif",
  "hw-fig20-assembly.avif": IMG_BASE + "hw-fig20-assembly.avif",
  "hw-fig21-assembly.avif": IMG_BASE + "hw-fig21-assembly.avif",
  "hw-fig22-assembly.avif": IMG_BASE + "hw-fig22-assembly.avif",
  "hw-fig23-assembly.avif": IMG_BASE + "hw-fig23-assembly.avif",
  "hw-fig24-assembly.avif": IMG_BASE + "hw-fig24-assembly.avif",
  "hw-fig25-assembly.avif": IMG_BASE + "hw-fig25-assembly.avif",
  "hw-fig26-wiring.avif": IMG_BASE + "hw-fig26-wiring.avif",
};

/** img("hw-fig01-process.avif") -> its static.igem.wiki URL */
export const img = (name: string): string => IMAGES[name] ?? IMG_BASE + name;
