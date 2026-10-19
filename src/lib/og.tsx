import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

async function loadGoogleFont(family: string, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}&text=${encodeURIComponent(text)}`
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error(`Fonte não encontrada: ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

/** Cartão de compartilhamento (LinkedIn, X, WhatsApp...) no mesmo estilo editorial do site */
async function loadAvatar() {
  const data = await readFile(join(process.cwd(), "src/lib/og-avatar.jpg"));
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

/** Cartão de compartilhamento (LinkedIn, X, WhatsApp...) no mesmo estilo editorial do site */
export async function renderOgImage({
  eyebrow,
  title,
  footer,
  photo,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  /** "large": foto ocupando a lateral (home) · "small": avatar ao lado do rodapé (posts) */
  photo: "large" | "small";
}) {
  const avatar = await loadAvatar();
  const text = `${eyebrow}${title}${footer}{}AS`;
  let fonts: { name: string; data: ArrayBuffer; style: "normal"; weight: 400 }[] = [];
  try {
    const [serif, mono] = await Promise.all([
      loadGoogleFont("Instrument Serif", text),
      loadGoogleFont("Geist Mono", text),
    ]);
    fonts = [
      { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
      { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
    ];
  } catch {
    // Sem rede no build: usa a fonte padrão em vez de quebrar
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0e0e0d",
          color: "#ecebe6",
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(125,90,164,0.28), transparent 45%)",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: photo === "large" ? "72px 64px" : 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Geist Mono", fontSize: 22, color: "#9b9991", whiteSpace: "nowrap" }}>
          <span style={{ color: "#7d5aa4" }}>{"{"}</span>
          <span style={{ color: "#ecebe6" }}>AS</span>
          <span style={{ color: "#7d5aa4" }}>{"}"}</span>
          <span style={{ marginLeft: 24, textTransform: "uppercase", letterSpacing: 2 }}>{eyebrow}</span>
        </div>
        <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: title.length > 60 ? 72 : 92, lineHeight: 1.05, letterSpacing: -1 }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(236,235,230,0.15)",
            paddingTop: 28,
            fontFamily: "Geist Mono",
            fontSize: 22,
            gap: 24,
            whiteSpace: "nowrap",
            color: "#9b9991",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {photo === "small" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} width={52} height={52} alt="" style={{ borderRadius: 999 }} />
            )}
            {footer}
          </span>
          <span>andresouza.dev.br</span>
        </div>
        </div>
        {photo === "large" && (
          <div style={{ display: "flex", position: "relative", width: 400, height: "100%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} width={400} height={630} alt="" style={{ objectFit: "cover", objectPosition: "top" }} />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                backgroundImage: "linear-gradient(90deg, #0e0e0d 0%, rgba(14,14,13,0) 35%)",
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...ogSize, fonts }
  );
}
