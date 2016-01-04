# Color-Array

Functions for converting between CSS strings and rgba arrays. Functional rather than object orientated approach.

## Install

```bash
npm install --save color-array
``` 

## Color array from CSS

```javascript
import { fromCss } from 'color-array'

fromCss('#fFf')                    // [ 255, 255, 255, 1 ]
fromCss('#1a1a1a')                 // [ 26, 26, 26, 1 ]
fromCss('rgb(10 , 4, 9 )')         // [ 10, 4, 9, 1 ]
fromCss('rgba(10 , 4, 9, 0.5 )')   // [ 10, 4, 9, .5 ]
fromCss('hsl(180, 60%, 50%)')      // [ 51, 204, 204, 1 ]
fromCss('hsla(180, 60%, 50%, .5)') // [ 51, 204, 204, .5 ]
fromCss('pink')                    // [ 255, 192, 203, 1 ]
```

## Color array to CSS

```javascript
import {
  toCss,
  toCssHex,
  toCssRgb,
  toCssRgba
} from 'color-array'

toCss([ 255, 255, 255, 1 ])        // '#ffffff'
toCss([ 255, 255, 255, .5 ])       // 'rgba(255,255,255,0.5)'

//force format
toCssHex([ 255, 255, 255 ])        // '#ffffff' 
toCssRgb([ 255, 255, 255 ])        // 'rgb(255,255,255)'
toCssRgba([ 255, 255, 255, 1 ])    // 'rgba(255,255,255,1)'
```

## Interpolate Colors

```javascript
import {
  interpolateCss,
  darkenCss,
  lightenCss,
} from 'color-array'

interpolateCss('#f07', '0f7')      // '#ffffff'
darkenCss('#fff', .5)              // 'rgba(255,255,255,0.5)'
lightenCss('#000', .5)             // '#ffffff' 
```



