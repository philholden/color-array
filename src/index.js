const roll = max => n => (n % max + max) % max
const limit = (max, min) => n => n < min ? min : n > max ? max : n
const limit255 = limit(0, 255)
const limit100 = limit(0, 100)
const roll360 = roll(360)

//x6 faster than parseInt
let hex3lookup = {}
let hex6lookup = {}

for (let i = 0; i < 16; i++) {
  hex3lookup[i.toString(16)] = parseInt('' + i + i, 16)
  for (let n = 0; n < 16; n++) {
    hex6lookup['' + i.toString(16) + n.toString(16)] = i * 16 + n
  }
}

const hex3 = { ...hex3lookup }
const hex6 = { ...hex6lookup }

const hex3Exp = /^#([\da-f])([\da-f])([\da-f])$/i
const hex6Exp = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i
const rgbExp = /^rgb\( *(\d+) *, *(\d+) *, *(\d+) *\)$/i
const rgbaExp = /^rgba\( *(\d+) *, *(\d+) *,(\d+) *, *(0?\.\d+) *\)$/i
const hslExp = /^hsl\( *(\d{1,3}) *, *(\d{1,3})% *, *(\d{1,3})% *\)$/i
const hslaExp = /^hsla\( *(\d{1,3}) *, *(\d{1,3})% *, *(\d{1,3}) *, *(0?\.\d+)% *\)$/i

const normalize = col => col.split(' ').join('').toLowerCase()

const hue2rgb = (p, q, t) => {
  if(t < 0) t += 1
  if(t > 1) t -= 1
  if(t < 1/6) return p + (q - p) * 6 * t
  if(t < 1/2) return q
  if(t < 2/3) return p + (q - p) * (2/3 - t) * 6
  return p
}

const hslArrayToRgbArray(h, s, l) {
  let r, g, b

  if(s == 0){
    r = g = b = l
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s
    var p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

const rgbArrayToHslArray = (r, g, b) => {
  r /= 255, g /= 255, b /= 255
  let max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max == min) {
    h = s = 0
  } else {
    let  d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0) break
      case g: h = (b - r) / d + 2 break
      case b: h = (r - g) / d + 4 break
    }
    h /= 6
  }

  return [ h, s, l ]
}

const hslaArrayToRgbaArray = (h, s, l, a) =>  [ ...hslToRgb(h, s, l), a ]
const rgbaArrayToHslaArray = (r, g, b, a) => [ ...rgbToHsl(h, s, l), a ]

const rgbFromHex3 = col => {
  let matches = hex3Exp.exec(col)
  if (matches) {
    return [
      hex3[matches[1]],
      hex3[matches[2]],
      hex3[matches[3]]
    ]
  }
  return null
}

const rgbFromHex6 = col => {
  let matches = hex6Exp.exec(col)
  if (matches) {
    return [
      hex6[matches[1]],
      hex6[matches[2]],
      hex6[matches[3]]
    ]
  }
  return null
}

const rgbFromRgb = col => {
  let matches = rgbExp.exec(col)
  if (matches) {
    return [
      limit255(matches[1]),
      limit255(matches[2]),
      limit255(matches[3])
    ]
  }
  return null
}

const rgbFromRgb = col => {
  let matches = rgbExp.exec(col)
  if (matches) {
    return [
      limit255(matches[1]),
      limit255(matches[2]),
      limit255(matches[3])
    ]
  }
  return null
}

const rgbFromRgba = col => {
  let matches = rgbaExp.exec(col)
  if (matches) {
    return [
      limit255(matches[1]),
      limit255(matches[2]),
      limit255(matches[3]),
      matches[4]
    ]
  }
  return null
}

const rgbFromHsl = col => {
  let matches = hslExp.exec(col)
  if (matches) {
    return [
      roll360(matches[1]) / 360,
      limit100(matches[2]) / 100,
      limit100(matches[3]) / 100
    ]
  }
  return null
}

const rgbFromHsla = col => {
  let matches = hslaExp.exec(col)
  if (matches) {
    return [
      roll360(matches[1]) / 360,
      limit100(matches[2]) / 100,
      limit100(matches[3]) / 100,
      matches[4]
    ]
  }
  return null
}

const rgbFromCss = col => {
  col = normalize(col)
  return rgbFromHex3 ||
    rgbFromHex6 ||
    rgbFromRgb ||
    rgbFromRgba ||
    rgbFromHsl ||
    rgbFromHsla ||
    rgbFromName
}

