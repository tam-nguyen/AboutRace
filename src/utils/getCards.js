import React from 'react'

import {
  ArticleCard,
  ClipCard,
  QACard,
  InterviewCard,
  QuickFactCard
} from '../components/cards'

const defaultToEmpty = arr => (arr ? arr : [])

const generate = (Component, key, object, onOpen) => <Component 
  key={key + '-' + object.title} 
  onOpen={ link => onOpen(link, object) } 
  data={object} 
/>

const filter = (object, queryFilter, filter) => !queryFilter 
  || queryFilter === `recent` 
  || queryFilter === filter

const generateArray = (array, queryFilter, key, Component, onOpen) => array
  .filter( o => filter(o, queryFilter, key) )
  .map( o => generate(Component, key, o, onOpen) )

const getCards = (cards, queryFilter, onOpen) => {
  if(!onOpen) onOpen = link => window.location = link

  let {
    articles,
    clips,
    faq,
    interviews,
    quickfacts,
  } = cards

  if(!articles) articles = []
  if(!clips) clips = []
  if(!faq) faq = []
  if(!interviews) interviews = []
  if(!quickfacts) quickfacts = []

  articles = generateArray(articles, queryFilter, 'article', ArticleCard, onOpen)
  clips = generateArray(clips, queryFilter, 'clip', ClipCard, onOpen)
  faq = generateArray(faq, queryFilter, 'qa', QACard, onOpen)
  interviews = generateArray(interviews, queryFilter, 'interview', InterviewCard, onOpen)
  quickfacts = generateArray(quickfacts, queryFilter, 'quickfact', QuickFactCard, onOpen)

  return [
    ...articles,
    ...clips,
    ...faq,
    ...interviews,
    ...quickfacts,
  ]
}

export default getCards
