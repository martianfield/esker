'use strict'

const should = require('chai').should()
const eskel = require(__dirname + '/../index.js')
const parse = eskel.parse;

describe('Parse', () => {
  it('single sentence', () => {
    let result = parse('name.is.Amelia')
    result.length.should.equal(1)
  })

  it('multiple sentences', () => {
    let result = parse('name.is.Amelia_and_age.is.larger.than.20')
    result.length.should.equal(2)
  })
})