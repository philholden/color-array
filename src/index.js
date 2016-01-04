import colors from 'color-name'

const roll = max => n => (n % max + max) % max
const limit = (min, max) => n => n < min ? min : n > max ? max : n
const limit255 = limit(0, 255)
const limit100 = limit(0, 100)
const limit1 = limit(0, 1)
const roll360 = roll(360)

//x6 faster than parseInt
let hex3lookup = {}
let hex6lookup = {}
let decTohex = []

for (let i = 0; i < 16; i++) {
  let hex = i.toString(16)
  hex3lookup[hex] = parseInt('' + hex + hex, 16)
  for (let n = 0; n < 16; n++) {
    hex6lookup['' + hex + n.toString(16)] = i * 16 + n
    decTohex[i * 16 + n] =  '' + hex + n.toString(16)
  }
}

const hex3 = { ...hex3lookup }
const hex6 = { ...hex6lookup }

const hex3Exp = /^#([\da-f])([\da-f])([\da-f])$/i
const hex6Exp = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i
const rgbExp = /^rgb\( *(\d+) *, *(\d+) *, *(\d+) *\)$/i
const rgbaExp = /^rgba\( *(\d+) *, *(\d+) *, *(\d+) *, *(0?\.\d+) *\)$/i
const hslExp = /^hsl\( *(\d+) *, *(\d{1,3})% *, *(\d{1,3})% *\)$/i
const hslaExp = /^hsla\( *(\d+) *, *(\d{1,3})% *, *(\d{1,3})% *, *(0?\.\d+) *\)$/i

const normalize = col => col.split(' ').join('').toLowerCase()

const hue2rgb = (p, q, t) => {
  if(t < 0) t += 1
  if(t > 1) t -= 1
  if(t < 1/6) return p + (q - p) * 6 * t
  if(t < 1/2) return q
  if(t < 2/3) return p + (q - p) * (2/3 - t) * 6
  return p
}

const hslVecToRgbVec = (h, s, l) => {
  let r, g, b

  if(s == 0) {
    r = g = b = l
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ]
}

// const rgbVecToHslVec = (r, g, b) => {
//   r /= 255, g /= 255, b /= 255
//   let max = Math.max(r, g, b), min = Math.min(r, g, b)
//   let h, s, l = (max + min) / 2

//   if (max == min) {
//     h = s = 0
//   } else {
//     let  d = max - min
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
//     switch(max) {
//       case r: h = (g - b) / d + (g < b ? 6 : 0)
//         break
//       case g: h = (b - r) / d + 2
//         break
//       case b: h = (r - g) / d + 4
//         break
//     }
//     h /= 6
//   }

//   return [ h, s, l ]
// }

const hslaVecToRgbaVec = (h, s, l, a) =>  [ ...hslVecToRgbVec(h, s, l), a ]
//const rgbaVecToHslaVec = (r, g, b, a) => [ ...rgbVecToHslVec(r, g, b), a ]

const _fromHex3 = col => {
  let matches = hex3Exp.exec(col)
  if (matches) {
    return [
      hex3[matches[1]],
      hex3[matches[2]],
      hex3[matches[3]],
      1
    ]
  }
  return null
}

const _fromHex6 = col => {
  let matches = hex6Exp.exec(col)
  if (matches) {
    return [
      hex6[matches[1]],
      hex6[matches[2]],
      hex6[matches[3]],
      1
    ]
  }
  return null
}

export const fromHex3 = col => _fromHex3(col.toLowerCase())
export const fromHex6 = col => _fromHex6(col.toLowerCase())

export const fromRgb = col => {
  let matches = rgbExp.exec(col)
  if (matches) {
    return [
      limit255(+matches[1]),
      limit255(+matches[2]),
      limit255(+matches[3]),
      1
    ]
  }
  return null
}

export const fromRgba = col => {
  let matches = rgbaExp.exec(col)
  if (matches) {
    return [
      limit255(+matches[1]),
      limit255(+matches[2]),
      limit255(+matches[3]),
      +matches[4]
    ]
  }
  return null
}

export const fromHsl = col => {
  let matches = hslExp.exec(col)
  if (matches) {
    return [ ...hslVecToRgbVec(
      roll360(+matches[1]) / 360,
      limit100(+matches[2]) / 100,
      limit100(+matches[3]) / 100
    ), 1 ]
  }
  return null
}

export const fromHsla = col => {
  let matches = hslaExp.exec(col)
  if (matches) {
    return hslaVecToRgbaVec(
      roll360(+matches[1]) / 360,
      limit100(+matches[2]) / 100,
      limit100(+matches[3]) / 100,
      +matches[4]
    )
  }
  return null
}

export const fromName = col => {
  return [ ...colors[col.toLowerCase()], 1 ] || null
}

export const fromCss = col => {
  col = normalize(col)
  return _fromHex3(col) ||
    _fromHex6(col) ||
    fromRgb(col) ||
    fromRgba(col) ||
    fromHsl(col) ||
    fromHsla(col) ||
    fromName(col)
}

export const toCssHex = rgbaArr => (
  '#' +
  decTohex[Math.round(limit255(rgbaArr[0]))] +
  decTohex[Math.round(limit255(rgbaArr[1]))] +
  decTohex[Math.round(limit255(rgbaArr[2]))]
)

export const toCssRgb = rgbaArr => (
  'rgb(' +
  Math.round(limit255(rgbaArr[0])) + ',' +
  Math.round(limit255(rgbaArr[1])) + ',' +
  Math.round(limit255(rgbaArr[2])) + ')'
)

export const toCssRgba = rgbaArr => (
  'rgb(' +
  Math.round(limit255(rgbaArr[0])) + ',' +
  Math.round(limit255(rgbaArr[1])) + ',' +
  Math.round(limit255(rgbaArr[2])) + ',' +
  limit1(rgbaArr[3]) + ')'
)

export const toCss = rgbaArr => (
  rgbaArr[3] === 1 ? toCssHex(rgbaArr) : toCssRgba(rgbaArr)
)

export const interpolate = (arr1, arr2, frac) => [
  Math.round(arr1[0] + (arr2[0] - arr1[0]) * frac),
  Math.round(arr1[1] + (arr2[1] - arr1[1]) * frac),
  Math.round(arr1[2] + (arr2[2] - arr1[2]) * frac),
  arr1[3] + (arr2[3] - arr1[3]) * frac
]

export const interpolateCss = (col1, col2, frac) => {
  const arr1 = fromCss(col1)
  const arr2 = fromCss(col2)
  return toCss(interpolate(arr1, arr2, frac))
}

export const darkenCss = (col, frac) => {
  const rgbaArr = fromCss(col)
  const black = [ 0, 0, 0, rgbaArr[3] ]
  return toCss(interpolate(rgbaArr, black, frac))
}

export const lightenCss = (col, frac) => {
  const rgbaArr = fromCss(col)
  const white = [ 255, 255, 255, rgbaArr[3] ]
  return toCss(interpolate(rgbaArr, white, frac))
}

