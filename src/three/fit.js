/**
 * Where an image of size (iw, ih) lands inside a W x H box.
 * mode 'cover' fills the box (cropping), 'contain' shows it whole. ax/ay are 0..1 anchors.
 * Shared by the WebGL scene and the React overlay so both agree on every coordinate.
 */
export function fitImage({ W, H, iw, ih, mode = 'cover', ax = 0.5, ay = 0.5 }) {
  const s = mode === 'cover' ? Math.max(W / iw, H / ih) : Math.min(W / iw, H / ih)
  const dw = iw * s
  const dh = ih * s
  return { s, dw, dh, offX: (W - dw) * ax, offY: (H - dh) * ay }
}
