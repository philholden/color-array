import googlish from '../index'
import expect from 'expect'

describe('googlish', function () {
  const haystack = 'The quick brown fox, jumps Over the lazy dog'

  it('should be true if all words are present', function () {
    let test = googlish('the quick fox')
    expect(test(haystack)).toBe(true)
  })

  it('should be false if one word is missing', function () {
    let test = googlish('the quick rabbit')
    expect(test(haystack)).toBe(false)
  })

  it('should ignore case by default', function () {
    let test = googlish('thE quIck Dog')
    expect(test(haystack)).toBe(true)
  })

  it('should match substrings by default', function () {
    let test = googlish('the quic ox')
    expect(test(haystack)).toBe(true)
  })

  it('should be match quoted single strings', function () {
    let test = googlish('the \'quick brown\'')
    expect(test(haystack)).toBe(true)
  })

  it('should be fail if quoted single strings not together', function () {
    let test = googlish('the \'quick fox\'')
    expect(test(haystack)).toBe(false)
  })

  it('should be match double quoted strings', function () {
    let test = googlish('the "quick brown\"')
    expect(test(haystack)).toBe(true)
  })

  it('should be fail if double quoted strings not together', function () {
    let test = googlish('the "quick fox"')
    expect(test(haystack)).toBe(false)
  })

  it('should be able to match whole words only', function () {
    let test1 = googlish('th quic fo', true)
    let test2 = googlish('th quic fo', false)
    expect(test1(haystack)).toBe(false)
    expect(test2(haystack)).toBe(true)
  })

  it('should be able to be case sensitive', function () {
    let test1 = googlish('Over jumps quick fox', false, true)
    let test2 = googlish('over jumps quick fox', false, true)
    expect(test1(haystack)).toBe(true)
    expect(test2(haystack)).toBe(false)
  })


})
