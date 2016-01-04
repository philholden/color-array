import {
  fromHex3,
  fromHex6,
  fromRgb,
  fromRgba,
  fromHsl,
  fromHsla,
  fromName,
  fromCss
} from '../index'
import expect from 'expect'

describe('color-fn', function () {

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
})
