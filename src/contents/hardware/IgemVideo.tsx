/*
 * Embed of a video hosted on video.igem.org (PeerTube), without sound.
 *   muted=1          start muted
 *   title=0          hide the title bar over the video
 *   warningTitle=0   hide the "watch on PeerTube" warning
 *   peertubeLink=0   hide the PeerTube logo link
 *   p2p=0            plain HTTP streaming (no WebRTC peers)
 * Pass autoplay / loop to make it behave like a silent GIF.
 */
type IgemVideoProps = {
  id: string;
  title: string;
  autoplay?: boolean;
  loop?: boolean;
};

export function IgemVideo({ id, title, autoplay = false, loop = false }: IgemVideoProps) {
  const params = new URLSearchParams({
    muted: "1",
    title: "0",
    warningTitle: "0",
    peertubeLink: "0",
    p2p: "0",
  });
  if (autoplay) params.set("autoplay", "1");
  if (loop) params.set("loop", "1");

  return (
    <div className="hw-video">
      <iframe
        title={title}
        src={`https://video.igem.org/videos/embed/${id}?${params.toString()}`}
        allow="fullscreen; autoplay"
        loading="lazy"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
}
