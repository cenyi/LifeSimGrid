/**
 * QR Code Handler — Binary-safe encoding/decoding for avatar QR data
 *
 * This module uses the following open-source libraries:
 * - jsqr (MIT License) — https://github.com/cozmo/jsQR
 * - qrcode (MIT License) — https://github.com/soldair/node-qrcode
 *
 * The avatar binary format parsed here is a publicly documented
 * format reverse-engineered by the open-source community.
 *
 * This tool only reads and writes binary data locally in the browser.
 * No data is transmitted to any external server.
 */
import jsQR from "jsqr";
import QRCode from "qrcode";

/** Reads a QR Code image file and extracts its binary data using jsQR */
export async function decodeQRFromFile(file: File): Promise<Uint8Array | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code && code.binaryData) {
          resolve(new Uint8Array(code.binaryData));
        } else {
          resolve(null);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/** Generates a QR Code data URL from binary data using byte mode encoding */
export async function generateAvatarQR(
  avatarBuffer: Uint8Array
): Promise<string | null> {
  try {
    const dataUrl = await QRCode.toDataURL(
      [{ data: avatarBuffer, mode: "byte" }],
      {
        errorCorrectionLevel: "M",
        version: 3,
        width: 256,
        margin: 2,
      }
    );
    return dataUrl;
  } catch (err) {
    console.error("QR generation failed:", err);
    return null;
  }
}
