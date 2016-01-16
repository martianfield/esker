'use strict'

const should = require('chai').should()
const expect = require('chai').expect

const parseSentence = require(__dirname + '/../lib/parse.js').parseSentence

describe('Parse Sentence', () => {

  describe("Verbs", () => {
    it('is (is, equals)', () => {
      expect(parseSentence('name.is.peter').verb).to.equal('is')
      expect(parseSentence('name.equals.peter').verb).to.equal('is')
      expect(parseSentence('name.does.equal.peter').verb).to.equal('is')
    })

    it('has (contains)', () => {
      expect(parseSentence('name.contains.peter').verb).to.equal('has')
      expect(parseSentence('name.has.peter').verb).to.equal('has')
      expect(parseSentence('name.does.contain.peter').verb).to.equal('has')
      expect(parseSentence('name.does.have.peter').verb).to.equal('has')
    })

    it('greater than (>)', () => {
      expect(parseSentence('age.is.greater.than.16').verb).to.equal('>')
      expect(parseSentence('age.is.more.than.16').verb).to.equal('>')
      expect(parseSentence('age.is.larger.than.16').verb).to.equal('>')
      expect(parseSentence('age.is.greater.16').verb).to.equal('>')
      expect(parseSentence('age.is.larger.16').verb).to.equal('>')
      expect(parseSentence('age.greater.than.16').verb).to.equal('>')
      expect(parseSentence('age.more.than.16').verb).to.equal('>')
      expect(parseSentence('age.larger.than.16').verb).to.equal('>')
      expect(parseSentence('age.greater.16').verb).to.equal('>')
      expect(parseSentence('age.larger.16').verb).to.equal('>')
    })

    it('smaller than (>)', () => {
      expect(parseSentence('age.is.smaller.than.16').verb).to.equal('<')
      expect(parseSentence('age.is.less.than.16').verb).to.equal('<')
      expect(parseSentence('age.is.smaller.16').verb).to.equal('<')
      expect(parseSentence('age.smaller.than.16').verb).to.equal('<')
      expect(parseSentence('age.less.than.16').verb).to.equal('<')
      expect(parseSentence('age.smaller.16').verb).to.equal('<')
    })
  })

  describe("Field", () => {
    it('field', () => {
      expect(parseSentence('name.is.peter').field).to.equal('name')
      expect(parseSentence('NAME.is.peter').field).to.equal('name')
      expect(parseSentence('nAmE.is.peter').field).to.equal('name')
    })
  })

  describe("Not", () => {
    it("not", () => {
      expect(parseSentence('name.is.peter').not).to.equal(false)
      expect(parseSentence('name.is.not.peter').not).to.equal(true)
      expect(parseSentence('age.is.larger.than.20').not).to.equal(false)
      expect(parseSentence('age.is.not.larger.than.20').not).to.equal(true)
    })
  })
})