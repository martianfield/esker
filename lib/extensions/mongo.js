'use strict'

module.exports = (sentences) => {
  if(sentences.length === 1) {
    return getExpression(sentences[0])
  }

  let result = {};
  let lastOperator = undefined;
  let currentArray = undefined;
  for(let i=0; i < sentences.length; i += 1) {
    let s = sentences[i]
    let expression = getExpression(s)
    if(s.operator) {
      if(lastOperator !== s.operator) {
        currentArray = []
        result['$'+s.operator] = currentArray
        lastOperator = s.operator
      }
    }
    currentArray.push(expression)
  }
  return result
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