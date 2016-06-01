import {
  twoDigitHex,
  fromHex3,
  fromHex6,
  fromRgb,
  fromRgba,
  fromHsl,
  fromHsla,
  fromName,
  fromCss,
  toCssHex,
  toCssRgb,
  toCssRgba,
  toCssHsl,
  toCssHsla,
  interpolateCss,
  darkenCss,
  lightenCss,
} from '../index'
import expect from 'expect'

describe('color-fn', function () {

  it('should convert dec255 to hex2', () => {
    expect(twoDigitHex(255)).toEqual('ff')
    expect(twoDigitHex('255')).toEqual('ff')
    expect(twoDigitHex(0)).toEqual('00')
  })

  it('should convert from hex3 to rgb vec', () => {
    expect(fromHex3('#fFf')).toEqual([ 255, 255, 255, 1 ])
    expect(fromHex3('#12a')).toEqual([ 17, 34, 170, 1 ])
  })

  it('should convert from hex6 to rgb vec', () => {
    expect(fromHex6('#1a1a1a')).toEqual([ 26, 26, 26, 1 ])
    expect(fromHex6('#123abc')).toEqual([ 18, 58, 188, 1 ])
  })

  it('should convert from rgb to rgb vec', () => {
    expect(fromRgb('rgb(10 , 4, 9 )')).toEqual([ 10, 4, 9, 1 ])
    expect(fromRgb('rgb(400, 0, 255)')).toEqual([ 255, 0, 255, 1 ])
  })

  it('should convert from rgba to rgba vec', () => {
    expect(fromRgba('rgba(10 , 4, 9, 0.5 )')).toEqual([ 10, 4, 9, .5 ])
    expect(fromRgba('rgba(400,0,255,0.5)')).toEqual([ 255, 0, 255, .5 ])
  })

  it('should convert from hsl to rgb vec', () => {
    expect(fromHsl('hsl(180, 60%, 50%)')).toEqual([ 51, 204, 204, 1 ])
    expect(fromHsl('hSl(2000, 10%, 90%)')).toEqual([ 227, 230, 232, 1 ])
  })

  it('should convert from hsla to rgba vec', () => {
    expect(fromHsla('hsla(180, 60%, 50%, .5)')).toEqual([ 51, 204, 204, .5 ])
    expect(fromHsla('hsla(2000, 10%, 90%, 0.5)')).toEqual([ 227, 230, 232, .5 ])
  })

  it('should convert from color name to rgb vec', () => {
    expect(fromName('pink')).toEqual([ 255, 192, 203, 1 ])
    expect(fromName('blue')).toEqual([ 0, 0, 255, 1 ])
  })

  it('should convert from CSS color string to rgb vec', () => {
    expect(fromCss('#fFf')).toEqual([ 255, 255, 255, 1 ])
    expect(fromCss('#1a1a1a')).toEqual([ 26, 26, 26, 1 ])
    expect(fromCss('rgb(10 , 4, 9 )')).toEqual([ 10, 4, 9, 1 ])
    expect(fromCss('rgba(10 , 4, 9, 0.5 )')).toEqual([ 10, 4, 9, .5 ])
    expect(fromCss('hsl(180, 60%, 50%)')).toEqual([ 51, 204, 204, 1 ])
    expect(fromCss('hsla(180, 60%, 50%, .5)')).toEqual([ 51, 204, 204, .5 ])
    expect(fromCss('pink')).toEqual([ 255, 192, 203, 1 ])
  })

  it('should convert rgbaArr to CSS hex6', () => {
    expect(toCssHex([ 255, 255, 255, 1 ])).toEqual('#ffffff')
  })

  it('should convert rgbaArr to CSS hex6 and limit', () => {
    expect(toCssHex([ -100, 2550, 255, 1 ])).toEqual('#00ffff')
  })

  it('should convert rgbaArr to CSS hex6 and round', () => {
    expect(toCssHex([ 255, 254.5, 255, 1 ])).toEqual('#ffffff')
  })


  it('should convert rgbaArr to CSS rgb', () => {
    expect(toCssRgb([ 255, 255, 255, 1 ])).toEqual('rgb(255,255,255)')
  })

  it('should convert rgbaArr to CSS rgb and limit', () => {
    expect(toCssRgb([ -100, 2550, 255, 1 ])).toEqual('rgb(0,255,255)')
  })

  it('should convert rgbaArr to CSS rgb and round', () => {
    expect(toCssRgb([ 255, 254.5, 255, 1 ])).toEqual('rgb(255,255,255)')
  })


  it('should convert rgbaArr to CSS rgba', () => {
    expect(toCssRgba([ 255, 255, 255, .5 ])).toEqual('rgba(255,255,255,0.5)')
  })

  it('should convert rgbaArr to CSS rgba and limit', () => {
    expect(toCssRgba([ -100, 2550, 255, 100 ])).toEqual('rgba(0,255,255,1)')
  })

  it('should convert rgbaArr to CSS hsl', () => {
    expect(toCssHsl([ 10, 10, 90, .5 ])).toEqual('hsl(240,80%,20%)')
  })

  it('should convert rgbaArr to CSS hsla', () => {
    expect(toCssHsla([ 10, 10, 90, .5 ])).toEqual('hsla(240,80%,20%,0.5)')
  })

  it('should interpolate CSS colors', () => {
    expect(interpolateCss('#f07', '#0f7', 0.5)).toEqual('#808077')
  })

  it('should darken CSS colors', () => {
    expect(darkenCss('#861', 0.5)).toEqual('#443309')
  })

  it('should lighten CSS colors', () => {
    expect(lightenCss('#777', 0.5)).toEqual('#bbbbbb')
  })
})
