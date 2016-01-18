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
    it("x or y", () => {
      let result = parse('age.is.20_or_age.is.30', ext)
      let expected = {
        "$or": [
          {"age":{"$eq":20}},
          {"age":{"$eq":30}}
        ]
      }
      expect(result.output).to.deep.equal(expected)
    })
    it("x or y or z", () => {
      let result = parse('age.is.20_or_age.is.21_or_age.is.22', ext)
      let expected = {
        "$or": [
          {"age":{"$eq":20}},
          {"age":{"$eq":21}},
          {"age":{"$eq":22}}
        ]
      }
      expect(result.output).to.deep.equal(expected)
    })
    it("x and y", () => {
      let result = parse('age.is.20_and_age.is.30', ext)
      expect(result.output).to.deep.equal({"$and": [{"age":{"$eq":20}}, {"age":{"$eq":30}}]})
    })
    it("x and y and z", () => {
      let result = parse('age.is.20_and_age.is.21_and_age.is_22', ext)
      let expected = {
        "$and": [
          {"age":20},
          {"age":21},
          {"age":22}
        ]
      }
    })
    it("x_and_y_or_z", () => {
      let result = parse('color.is.blue_and_age.is.13_or_age.is.14', ext)
      let expected = {
        "$or":[
          {"$and":[
            {"color":{"$eq":"blue"}},
            {"age":{"$eq":13}}
          ]},
          {"$and":[
            {"age":{"$eq":14}}
          ]}
        ]
      }
      expect(result.output).to.deep.equal(expected)
    })
    it("x_or_y_and_z", () => {
      let result = parse('age.is.14_or_color.is.blue_and_age.is.13', ext)
      let expected = {
        "$or":[
          {"$and":[
            {"age":{"$eq":14}}
          ]},
          {"$and":[
            {"color":{"$eq":"blue"}},
            {"age":{"$eq":13}}
          ]}
        ]
      }
      expect(result.output).to.deep.equal(expected)
    })
  })

})