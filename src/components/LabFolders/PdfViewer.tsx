/**
 * Embedded PDF viewer used by each block's "Protocols" folder. <object>
 * (rather than <iframe>) degrades to real fallback content when a browser
 * can't render the PDF inline, or when the placeholder src doesn't exist
 * yet — a download link is always available either way.
 */
export function PdfViewer({ src, title }: { src: string; title: string }) {
  return (
    <div className="pdf-viewer">
      <object className="pdf-viewer__frame" data={src} type="application/pdf" aria-label={title}>
        <p className="pdf-viewer__fallback">
          The embedded viewer isn't available here.{" "}
          <a href={src} download>
            Download the protocols PDF
          </a>{" "}
          instead.
        </p>
      </object>
      <a className="record-download pdf-viewer__download" href={src} download>
        Download PDF
      </a>
    </div>
  );
}
