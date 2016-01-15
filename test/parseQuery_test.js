'use strict'

const should = require('chai').should()
const parseQuery = require(__dirname + '/../lib/parse.js').parseQuery

describe('Parse Query', () => {

  it('and', () => {
    let sentences = parseQuery('name.is.peter_and_age.is.20')
    sentences.length.should.equal(3)
    sentences[0].should.equal('name.is.peter')
    sentences[1].should.equal('_and_')
    sentences[2].should.equal('age.is.20')
  })

  it('or', () => {
    let sentences = parseQuery('name.is.peter_or_age.is.20')
    sentences.length.should.equal(3)
    sentences[0].should.equal('name.is.peter')
    sentences[1].should.equal('_or_')
    sentences[2].should.equal('age.is.20')
  })
})