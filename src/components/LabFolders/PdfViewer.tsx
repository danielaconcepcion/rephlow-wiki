/**
 * Embedded PDF viewer used by each block's "Protocols" folder. <object>
 * (rather than <iframe>) degrades to real fallback content when a browser
 * can't render the PDF inline, or when the placeholder src doesn't exist
 * yet — the two actions below are always available either way.
 *
 * Both actions are offered because they are genuinely different things to
 * want: "Download PDF" saves the file, while "Open in browser" hands it to
 * the browser's own PDF reader in a new tab, which is what a reader needs
 * to search the text, zoom past the embed's fixed height or print it. The
 * embedded frame alone gives neither.
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
          or{" "}
          <a href={src} target="_blank" rel="noopener noreferrer">
            open it in your browser
          </a>{" "}
          instead.
        </p>
      </object>
      <div className="pdf-viewer__actions">
        <a className="record-download pdf-viewer__action" href={src} download>
          Download PDF
        </a>
        <a
          className="record-download pdf-viewer__action"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in browser
        </a>
      </div>
    </div>
  );
}
