# Color-Array

Functions for converting between CSS strings and rgba arrays

```bash
npm install --save color-fn
``` 

```javascript
import { fromCss } from 'color-fn'

fromCss('#fFf')                    // [ 255, 255, 255, 1 ]
fromCss('#1a1a1a')                 // [ 26, 26, 26, 1 ]
fromCss('rgb(10 , 4, 9 )')         // [ 10, 4, 9, 1 ]
fromCss('rgba(10 , 4, 9, 0.5 )')   // [ 10, 4, 9, .5 ]
fromCss('hsl(180, 60%, 50%)')      // [ 51, 204, 204, 1 ]
fromCss('hsla(180, 60%, 50%, .5)') // [ 51, 204, 204, .5 ]
fromCss('pink')                    // [ 255, 192, 203, 1 ]


```
const test = googlish('over fox "lazy dog"')
test('the quick brown fox jumps over the lazy dog')
//true

const test = googlish('over fox "dog lazy"')
test('the quick brown fox jumps over the lazy dog')
//false
```

By default substrings count as matches and search is case insensitive. This can be changed:

```javascript
let wholeWords = true
let caseSensitive = true
googlish('over fox', wholeWords, caseSensitive)
```

Ideal for creating filter functions:

```javascript
const isLazyDog = googlish('"lazy dog"')
const dogs = ['happy dog', 'lazy dog']
const lazyDogs = dogs.filter(isLazyDog)
// ['lazy dog']
```
