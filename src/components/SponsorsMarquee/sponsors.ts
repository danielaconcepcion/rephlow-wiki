/*
 * Sponsor logos shown in the sliding strip at the bottom of every page.
 *
 * The AVIF files are in sponsors-logos.zip. Upload them to
 * https://uploads.igem.org inside the folder assets/sponsors.
 * To add, remove or reorder a sponsor, edit this list only.
 */
export const SPONSORS_BASE = import.meta.env.DEV ? import.meta.env.BASE_URL + "assets/sponsors/" : "https://static.igem.wiki/teams/6124/wiki/sponsors/";

export type Sponsor = {
  name: string;
  /** file name inside assets/sponsors on iGEM Uploads */
  file: string;
  /** optional link to the sponsor's website */
  url?: string;
};

export const SPONSORS: Sponsor[] = [
  { name: "Dehesa Sana", file: "dehesa-sana.avif" },
  { name: "Anthropic", file: "anthropic.avif" },
  { name: "Compluemprende, Centro de Emprendimiento UCM", file: "compluemprende.avif" },
  { name: "CSIC, Consejo Superior de Investigaciones Científicas", file: "csic.avif" },
  { name: "Doxa Microfluidics", file: "doxa-microfluidics.avif" },
  { name: "Fluidmecánica, Maquinaria Naval", file: "fluidmecanica.avif" },
  { name: "Promega", file: "promega.avif" },
  { name: "SEBBM", file: "sebbm.avif" },
  { name: "Twist Bioscience", file: "twist-bioscience.avif" },
  { name: "Universidad Complutense de Madrid", file: "ucm.avif" },
];

export const sponsorLogo = (s: Sponsor): string => SPONSORS_BASE + s.file;
