'use strict'

module.exports = (sentences) => {
  let queryType = getQueryType(sentences)


  if(queryType.structure === "simple") {
    return getExpression(sentences[0])
  }

  if(queryType.structure === "pure") {
    let expressions = []
    let result = {}
    result["$" + queryType.operator] = expressions

    for(let i=0; i < sentences.length; i += 1) {
      expressions.push(getExpression(sentences[i]))
    }

    return result
  }

  if(queryType.structure === "mixed") {
    // create 'and' groups
    let groups = [];
    let currentCollection = []
    groups.push({"$and":currentCollection})
    for(let i=0; i < sentences.length; i += 1) {
      let s = sentences[i]
      if(s.operatorLeft === "or") {
        currentCollection = []
        groups.push({"$and":currentCollection})
      }
      currentCollection.push(getExpression(s))
    }

    return {"$or":groups}
  }

}

function getQueryType(sentences) {
  if(sentences.length === 1) {
    return { structure: "simple", operator:"and" }
  }
  let hasOr = false
  let hasAnd = false

  for(let i=0; i < sentences.length; i += 1) {
    let s = sentences[i]
    if(s.operatorLeft === "and" || s.operatorRight === "and") {
      hasAnd = true
    }
    if(s.operatorLeft === "or" || s.operatorRight === "or") {
      hasOr= true
    }
  }
  if(hasAnd && hasOr) {
    return { structure:"mixed", operator:"or"}
  }
  else {
    if( hasAnd) {
      return { structure:"pure", operator:"and"}
    }
    else {
      return { structure:"pure", operator:"or"}
    }
  }
}

function getExpression(s) {
  // each sentence has a field, verb, value, and not property
  let value;
  switch(s.verb) {
    case "is":
      value = isNaN(s.value) ? String(s.value) : Number(s.value)
      if(s.not) {
        value = {"$ne":value}
      }
      else {
        value = {"$eq":value}
      }
      break;
    case "has":
      if(s.not) {
        value = {"$regex":new RegExp('^((?!' + s.value + ').)*$', 'i')}
      }
      else {
        value = {"$regex":new RegExp(s.value, 'i')}
      }
      break;
    case ">":
      value = isNaN(s.value) ? String(s.value) : Number(s.value)
      if(s.not) {
        value = {"$lt":value}
      }
      else {
        value = {"$gt":value}
      }
      break;
    case "<":
      value = isNaN(s.value) ? String(s.value) : Number(s.value)
      if(s.not) {
        value = {"$gt":value}
      }
      else {
        value = {"$lt":value}
      }
      break;
  }
  let expression = {}
  expression[s.field] = value
  return expression
}