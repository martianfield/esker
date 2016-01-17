'use strict'

const expect = require('chai').expect;
const should = require('chai').should();
const eskel = require(__dirname + '/../index.js')
const parse = eskel.parse
const ext = eskel.mongo

describe("Mongo Extension", () => {
  describe("Equal", () => {
    it("equal (string)", () => {
      let result = parse('name.is.johnny', ext)
      expect(result.output).to.deep.equal({"name":{"$eq":"johnny"}})
    })
    it("not equal (string)", () => {
      let result = parse('name.is.not.johnny', ext)
      expect(result.output).to.deep.equal({"name":{"$ne":"johnny"}})
    })
    it("equal (implicit numeric)", () => {
      let result = parse('age.is.33', ext)
      expect(result.output).to.deep.equal({"age":{"$eq":33}});
    })
    it("not equal (implicit numeric)", () => {
      let result = parse('age.is.not.33', ext)
      expect(result.output).to.deep.equal({"age":{"$ne":33}});
    })
  })

  describe("Contain", () => {
    it("contain (string", () => {
      let result = parse('name.contains.ohn', ext)
      expect(result.output).to.deep.equal({"name":{"$regex":/ohn/i}})
    })
    it("not contain (string", () => {
      let result = parse('name.does.not.contain.ohn', ext)
      expect(result.output).to.deep.equal({"name":{"$regex":/^((?!ohn).)*$/i}})
    })
  })

  describe("Greater / less than", () => {
    it("greater than (implicit numeric)", () => {
      let result = parse('age.is.greater.than.12', ext)
      expect(result.output).to.deep.equal({"age":{"$gt":12}})
    })
    it("not greater than (implicit numeric)", () => {
      let result = parse('age.is.not.greater.than.12', ext)
      expect(result.output).to.deep.equal({"age":{"$lt":12}})
    })
    it("less than (implicit numeric)", () => {
      let result = parse('age.is.smaller.than.12', ext)
      expect(result.output).to.deep.equal({"age":{"$lt":12}})
    })
    it("not less than (implicit numeric)", () => {
      let result = parse('age.is.not.less.than.12', ext)
      expect(result.output).to.deep.equal({"age":{"$gt":12}})
    })
  })

  describe("Logical Operators", () => {
    it("or", () => {
      let result = parse('age.is.20_or_age.is.30', ext)
      expect(result.output).to.deep.equal({"$or": [{"age":{"$eq":20}}, {"age":{"$eq":30}}]})
    })
    it("and", () => {
      let result = parse('age.is.20_and_age.is.30', ext)
      expect(result.output).to.deep.equal({"$and": [{"age":{"$eq":20}}, {"age":{"$eq":30}}]})
    })
  })

})