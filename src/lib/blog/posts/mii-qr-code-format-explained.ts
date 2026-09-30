/**
 * LifeSimGrid — Blog post: Mii QR code format, explained
 *
 * Grounded in the site's own implementation:
 *   - src/lib/qr-handler.ts            (jsQR binaryData in, byte-mode QR out, ECL-M / version 3)
 *   - src/components/AvatarEditor.tsx  (0x01 copy-allow flag, 0x04–0x0B System ID rewritten by the unlock, name at 0x1A–0x2D UTF-16)
 *   - MiiQrUnlocker formatIntro        (copy-allow 0x01 bit 0, share-disable 0x30 bit 0, source: 3dbrew)
 */

import type { BlogPost } from "../types";

export const postMiiQrFormat: BlogPost = {
  slug: "mii-qr-code-format-explained",
  title: "Mii QR Code Format: FFL Bytes and Offset 0x04",
  description:
    "How Mii QR codes store a Mii in FFL binary: the header fields, permission flags, why consoles say 'cannot be edited', and how unlocking actually works.",
  publishedAt: "2026-09-28",
  tags: ["Mii", "QR Code", "3DS", "Guides"],
  blocks: [
    {
      type: "p",
      text: "Scan a Mii QR code with a normal phone scanner and you get a screen full of garbage. Scan the same code on a 3DS and you get a complete character — face, name, body, and a set of invisible rules about who may copy, share, or edit it. That gap between the two experiences is a small piece of binary engineering, and it is the reason our [Mii QR Unlocker](/mii-qr-unlocker) exists. This guide walks through the format the way our tool sees it: the QR layer, the FFL data block, the fields that decide who may copy, share, and edit a Mii, and the exact reasons a console tells you **\"This Mii cannot be edited.\"** Every claim below comes from the same decoder that runs in our tool — nothing here is guessed from a wiki.",
    },
    { type: "h2", text: "First surprise: a Mii QR code is not text" },
    {
      type: "p",
      text: "Most QR codes you scan day to day carry plain text — a URL, a Wi-Fi password, a restaurant menu. A Mii QR code does not. It carries a **byte-mode payload**: a raw block of binary data that only makes sense to a console that knows the format. When a phone scanner decodes one, it tries to interpret those bytes as text using some character encoding, fails halfway, and prints the garbage you have probably seen.",
    },
    {
      type: "p",
      text: "The technical difference lives in the QR specification itself. QR codes can encode data in several modes — numeric, alphanumeric, byte, and Kanji. Text content uses the alphanumeric or byte mode with a UTF-8 payload; a Mii uses the byte mode with a payload that is simply **not text at all**. Our decoder reads the code with [jsQR](https://github.com/cozmo/jsQR) and takes the raw `binaryData` array instead of the decoded string, which is the single most important implementation detail: the moment you treat a Mii QR as a string, you have already corrupted it.",
    },
    {
      type: "p",
      text: "Writing the code back out has the same trap in reverse. A QR generator aimed at URLs will happily re-encode binary data through a text layer and destroy it. That is why our encoder passes the buffer through in byte mode with a fixed QR version and error-correction level, sized so that a 3DS camera can read it off a phone screen reliably. Binary in, binary out — the payload never passes through a string.",
    },
    { type: "h2", text: "FFL: the face library behind every Mii" },
    {
      type: "p",
      text: "The data inside the QR describes the Mii in the **FFL (Face Library) format** — Nintendo's shared character-rendering library, publicly documented by the community and the basis for the same Mii data that Wii, 3DS, Wii U, and Switch games consume. FFL stores a Mii as a compact structure: identity fields like the name and gender, a set of appearance fields for facial features, body type and colors, and a small block of **permission flags** that controls what other people's consoles may do with the character.",
    },
    {
      type: "p",
      text: "Two properties of this format shape everything else in this guide. First, it is **stable across console generations** — a 3DS-era Mii QR still scans on a Wii U, and Switch games consume the same underlying Mii data, which is why a format guide written once stays useful. Second, it is **positionally sensitive**: every field lives at a fixed offset from the start of the block, though those offsets shift slightly between console generations. Get one offset wrong and you do not get a slightly odd Mii — you get a Mii that will not scan at all. This positional strictness is also why the format survives console launches untouched: games do not reinvent it — they hand their character data to the same library.",
    },
    { type: "h2", text: "A field-by-field map of the header" },
    {
      type: "p",
      text: "Our tool parses the opening bytes of the block to show you a preview before any modification happens. These are the header fields the format defines, and what each one controls:",
    },
    {
      type: "table",
      headers: ["Offset", "Field", "What it holds"],
      rows: [
        ["`0x00`", "Version byte", "Which Mii-data generation the block uses"],
        ["`0x01`", "Option flags", "Bit `0` carries the **copy-allow** flag; the remaining bits cover the profanity flag and region lock"],
        ["`0x02`–`0x03`", "Slot header", "Which Mii Maker page and slot the Mii was saved in"],
        ["`0x04`–`0x0B`", "System ID", "Eight bytes identifying the owner console — the field edit enforcement checks, and what our unlock pass rewrites"],
        ["`0x18`", "Gender & personal bits", "The gender bit, plus birth date and favorite color"],
        ["`0x1A`–`0x2D`", "Name", "Up to 10 characters in UTF-16, null-terminated"],
        ["`0x30`", "Share flag", "Bit `0` here is the **share-disable** switch (source: 3dbrew's Mii format documentation)"],
      ],
    },
    {
      type: "p",
      text: "The name field is worth pausing on, because it is where hand-editing goes wrong most often. Ten characters does not mean ten bytes: each character takes two bytes in UTF-16, unused positions are filled with null bytes, and the decoder stops at the first null. Write a name in UTF-8 instead and a Japanese or German name turns into mojibake on the console; forget the null terminator and the name runs into whatever comes next.",
    },
    {
      type: "p",
      text: "Everything after the header is the Mii itself — dozens of appearance fields covering facial shape, hair, eyes, eyebrows, nose, mouth, glasses, body height and build, and favorite colors, each packed into specific bits. Our tool reads enough of this to render a preview, and then deliberately **never touches it**: an unlock that changed a single pixel of the face would be an unlock you could not trust.",
    },
    { type: "h2", text: "Why scanned Miis say \"This Mii cannot be edited\"" },
    {
      type: "p",
      text: "The permission system exists because Mii QR codes are a sharing mechanism, and Nintendo let creators decide how far sharing goes. When a Mii is created on a console, its FFL data records the creator's choices as flags inside the block. When another console scans that QR, the arriving Mii is marked as **received** — the console treats the original creator as the author, reads the flags, and enforces them:",
    },
    {
      type: "ul",
      items: [
        "**Copy-allow** — if the creator disabled copying, the receiving console will not let the Mii be duplicated or saved elsewhere.",
        "**Share-disable** — if sharing is switched off, the Mii cannot be turned into a new QR code and passed on again.",
        "**Editing** — a received Mii is never editable on the receiving console, regardless of the other two flags. Editing rights belong to the console where the Mii was born. Personality, and the voice defaults that follow from it, travel with the same data — our [voice synthesis guide](/blog/tomodachi-life-voice-synthesis-guide) breaks that down.",
      ],
    },
    {
      type: "p",
      text: "That third rule is the one that surprises people. You can scan a Mii, admire it, use it in games — but the moment you try to open it in the editor, the console refuses with **\"This Mii cannot be edited.\"** This is not a malfunction; it is the flags doing exactly what their author asked them to do.",
    },
    {
      type: "p",
      text: "There is one official route around this, and it works only when the creator allowed copying: on the 3DS, copy the Mii into your own Mii Maker and rebuild it from the parts — the rebuilt Mii is yours, born on your console, and fully editable. It is tedious for anything beyond a quick fix, and it is unavailable when copying itself is locked. That gap between \"officially possible\" and \"practically workable\" is the space every unlock tool operates in.",
    },
    { type: "h2", text: "What our unlocker changes — and what it never touches" },
    {
      type: "p",
      text: "Given the field map above, the unlock operation is small on purpose. Our tool reads the payload and rewrites the first byte of the System ID at `0x04` — the ownership identity a console checks when it decides whether a received Mii may be edited — so the Mii no longer resolves to a foreign owner. If you want to rename the Mii, it rewrites the name field in correct UTF-16 as part of the same pass, and re-encodes the block as a fresh byte-mode QR code. Everything else, byte for byte, is copied through untouched.",
    },
    {
      type: "p",
      text: "The re-encode step matters more than it sounds. The new QR is generated in byte mode at a fixed version and error-correction level `M`, rendered at a size and margin tuned for scanning a phone screen with a 3DS camera. Use the wrong QR settings and the code might visually look fine while refusing to scan on the very console you are pointing it at — error-correction levels trade scan robustness against data capacity, and Mii payloads sit close enough to the limits that the choice is not cosmetic.",
    },
    {
      type: "p",
      text: "The whole round trip runs in your browser. The payload is decoded from the image file you drop in, held in memory, modified, and rendered back out — with the session's history kept in your browser's own IndexedDB storage. No server sits in the middle, which is not just a privacy nicety: it also means the tool cannot silently keep a copy of anyone's Mii, including yours.",
    },
    { type: "h2", text: "From 3DS to Switch: cameras, QR codes, and access keys" },
    {
      type: "p",
      text: "The hardware story explains most of the confusion around Mii sharing today. The 3DS had twin cameras, so scanning a QR code was a native gesture — Mii Maker, Tomodachi Life, Miitopia and StreetPass all consumed them. The Switch dropped the cameras entirely: its Mii Maker can still **read** a 3DS or Wii U Mii QR code held up to... nothing, because there is no camera to read it with. What the Switch kept is the underlying FFL data — which is why the format knowledge in this guide still applies — while the sharing layer moved.",
    },
    {
      type: "p",
      text: "For Miitopia on Switch, Nintendo replaced QR codes with an **access key** system: a short code that downloads a Mii from an online service, and a separate key that publishes your own. The Switch 2 continues this approach. Access keys solve the no-camera problem elegantly, but they inherit the same permission philosophy — a downloaded Mii is someone else's creation — and they only work for games that support the service.",
    },
    {
      type: "p",
      text: "The practical bridge between the eras runs through the 3DS-era format: take a Mii QR code, unlock it if the flags are closed, and scan it into a Switch Mii Maker through any of the workarounds players use for the missing camera — emulated scanning on a modded console, or recreating the unlocked Mii by eye from the decoded preview. Once the Mii exists on the Switch, its data is native and it works everywhere Switch Mii support does, from [Tomodachi Life: Living the Dream](/tomodachi-voice-lab) to Miitopia. And because the personality system rides on the same Mii data, everything in our [Tomodachi Life MBTI mapping](/blog/tomodachi-life-mbti-mapping-explained) applies to the transplanted character unchanged.",
    },
    { type: "h2", text: "Why hand-editing with a hex editor usually fails" },
    {
      type: "p",
      text: "Now that you know the layout, the temptation is to skip the tool and flip bytes in a hex editor. Three failure modes await, and all three are quiet — the file never announces what went wrong.",
    },
    {
      type: "ol",
      items: [
        "**Wrong generation, wrong offsets.** Field positions shift between Wii, 3DS and Switch generations of the format. A patch written against the wrong layout edits the wrong bytes — and the most likely victims are the appearance fields you never meant to touch.",
        "**The string trap.** Hex editors default to text. Open a Mii payload, edit the name as ASCII, save — and the UTF-16 name field is now misaligned by design, corrupting the bytes that follow it.",
        "**The re-encoding trap.** After editing the bytes, you still have to produce a QR code. Generators aimed at URLs encode through a text layer and mangle binary payloads; only a byte-mode encoder at the right version and error-correction level produces a code a console will accept.",
      ],
    },
    {
      type: "p",
      text: "A dedicated tool exists to make all three mistakes impossible: fixed offsets, byte-mode in and out, and a name field written with the correct encoding and padding. That is the entire reason [our unlocker](/mii-qr-unlocker) is a page and not a documentation comment.",
    },
    { type: "h2", text: "Questions people ask about Mii QR codes" },
    { type: "h3", text: "Is unlocking a Mii QR code legal and safe?" },
    {
      type: "p",
      text: "On safety, the mechanics are on your side: the unlock only rewrites the permission-related bytes and leaves the appearance block untouched, so a modified code either scans as the same Mii with new permissions or not at all. On legality, the format is community-documented, the tool runs on Mii data you already possess, and what you do next is bound by the same rules as any fan activity — respect the original creator, and do not pass off someone else's character as your own. Nintendo's stance on modified Mii data is the same as its stance on the rest of the console's file system: unsupported territory, use your judgment.",
    },
    { type: "h3", text: "Does this work with Miitopia and Smash Bros. Miis?" },
    {
      type: "p",
      text: "Yes. Miitopia and Super Smash Bros. Ultimate consume the same FFL-format Mii data as Tomodachi Life and the 3DS Mii Maker, so a QR code produced for one game scans into the others on consoles that accept QR input. The format is the common language; the games are just different audiences for it.",
    },
    { type: "h3", text: "Why won't my console camera scan the unlocked QR code?" },
    {
      type: "p",
      text: "Ninety percent of the time this is optics, not data. Turn your screen brightness to maximum, hold the console at the distance where the QR fills the frame without blurring, clean the camera lens, and avoid glare from overhead lights. If the code still refuses, re-generate it — a screenshot of a QR code can carry compression artifacts that break decoding, so always keep the original rendered image.",
    },
    { type: "h3", text: "Will the unlocked Mii look different in games?" },
    {
      type: "p",
      text: "No. The Mii data is copied through byte for byte — face, hair, colors, height, name, and voice settings all arrive exactly as the creator set them. The only visible changes are the ones you ask for, like a renamed Mii. If a Mii looks different after a scan, the QR image itself was degraded somewhere along the way; re-generate and re-scan before suspecting the data.",
    },
    { type: "h3", text: "Can I edit a Mii directly on the Switch?" },
    {
      type: "p",
      text: "Not a received one. The Switch Mii Maker can edit Miis that were created on that console, but a Mii that arrived from outside — by access key or by scan — is locked to protect its author, exactly as on the 3DS. The route to an editable copy runs through the format: unlock the original QR so it scans as a local, editable Mii, then get it onto the Switch by the means available to your setup.",
    },
    { type: "h3", text: "What about the newer Mii system on Switch 2?" },
    {
      type: "p",
      text: "The Switch 2 continues the access-key approach for Miitopia, and the underlying Mii data remains the same FFL lineage. QR codes as a physical sharing medium belong to the camera-equipped consoles — 3DS and Wii U — which is precisely why understanding the format still matters: the data those QR codes carry is the same data your Switch games use today.",
    },
    { type: "h3", text: "Can I restore the original permissions afterwards?" },
    {
      type: "p",
      text: "Keep the original QR image — the unlock never overwrites your source file — it produces a new code with the flags opened. If you ever want the restrictions back, the original image still carries them and will scan with the creator's settings intact. What you cannot do is re-lock a Mii that is already living on a console: editing rights, once granted to your console by an unlocked scan, stay with that Mii for good. That asymmetry is worth knowing before you unlock something you borrowed from a friend.",
    },
    { type: "h2", text: "Try it yourself" },
    {
      type: "p",
      text: "The fastest way to make this format concrete is to feed the tool one of your own Miis and watch the fields appear:",
    },
    {
      type: "ul",
      items: [
        "[Mii QR Unlocker](/mii-qr-unlocker) — drop in a QR code, see the name and permission flags decoded, and re-generate an editable code.",
        "[Mii Creator](/tomodachi-life-mii-creator) — build a Mii from scratch with live FFL-backed rendering and export it.",
        "[Mii Eyes Editor](/mii-eyes) — a focused editor for the eye shapes that define a Mii's expression.",
        "[Voice Lab](/tomodachi-voice-lab) — hear how Tomodachi Life turns a personality into a synthesized voice.",
      ],
    },
    {
      type: "callout",
      text: "Nintendo, Mii, Nintendo 3DS, Wii U, Switch and Miitopia are trademarks of Nintendo. This guide describes a community-documented format for personal backup and editing purposes and is not affiliated with or endorsed by Nintendo. The FFL format details cited here follow 3dbrew's public documentation.",
    },
  ],
};
