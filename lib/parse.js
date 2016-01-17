'use strict'

function parse(q, extension) {
  let result = { sentences:[]}

  // get sentences
  let sentences = parseQuery(q);

  // parse sentences
  for(let i = 0; i < sentences.length; i += 1) {
    let sentence = sentences[i]
    if(sentence === '_and_' || sentence === '_or_') {
      if(i>0) {
        sentences[i].toNext = sentence.replace(/_/g,'')
      }
      continue
    }
    result.sentences.push(parseSentence(sentences[i]))
  }

  // add extension output
  if(extension) {
    result.output = extension(result.sentences)
  }

  // and done
  return result;
}

function parseQuery(q) {
  let sentences = q.split(/(_and_|_or_)/)
  return sentences
}

function parseSentence(s) {
  s = s.toLowerCase()
  let tokens = s.split('.')
  let verb = findVerb(tokens)
  return {
    field:tokens[0],
    verb:verb,
    value:tokens[tokens.length - 1],
    not:tokens.indexOf('not') !== -1
  }
}

function findVerb(tokens) {
  let verb;
  for(let i = 0; i < tokens.length; i += 1) {
    let token = tokens[i]
    if(token === 'is' || token === 'equals' || token === 'equal') {
      verb = 'is'
    }
    if(token === 'greater' || token === 'larger' || token === 'more') {
      verb = '>'
    }
    if(token === 'smaller' || token === 'less') {
      verb = '<'
    }
    if(token === 'contains' || token === 'has' || token === 'contain' || token === 'have') {
      verb = 'has'
    }
  }
  return verb
}




module.exports.parse = parse;
module.exports.parseQuery = parseQuery;
module.exports.parseSentence = parseSentence;