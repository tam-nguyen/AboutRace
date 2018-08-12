import React from 'react'

import {
  ArticleCard,
  ClipCard,
  QACard,
  InterviewCard,
  QuickFactCard
} from '../components/cards'

const defaultToEmpty = arr => (arr ? arr : [])

const getCards = (relationships, queryFilter, onOpen) => {
  if(!onOpen)
    onOpen = link => {}

  const articles = defaultToEmpty(relationships.articles)
    .filter(article => 
      !queryFilter 
      || queryFilter === `recent` 
      || queryFilter === `article`
    )
    .map(
      article => 
        <ArticleCard 
          key={'article-' + article.title} 
          onOpen={ link => onOpen(link, article) } 
          article={article} 
        />
    )

  const clips = defaultToEmpty(relationships.clips)
  .filter(clip => 
    !queryFilter 
    || queryFilter === `recent` 
    || queryFilter === `clip`
  )
  .map( clip => 
    <ClipCard
      key={'clip-' + clip.title}
      linkable={true}
      clip={clip}
    />
  )

  const qa = defaultToEmpty(relationships.faqs)
  .filter( qa => 
    !queryFilter 
    || queryFilter === `recent` 
    || queryFilter === `qa`
  )
  .map( qa => 
    <QACard
      key={'qa-' + qa.title}
      qa={qa}
    />
  )

  const interviews = defaultToEmpty(relationships.interviews)
  .filter( interview => 
    !queryFilter
    || queryFilter === `recent`
    || queryFilter === `interview`
  )
  .map( interview => 
    <InterviewCard
      key={'interview-' + interview.title}
      onOpen={ link => onOpen(link, interview) }
      interview={interview} 
    />
  )

  const quickfacts = defaultToEmpty(relationships.quickfacts)
  .filter(quickfact => 
    !queryFilter 
    || queryFilter === `recent` 
    || queryFilter === `quickfact`
  )
  .map( quickfact => 
    <QuickFactCard
      key={'quickfact-' + quickfact.title} 
      quickfact={quickfact}
    />
  )

  return [
    ...articles,
    ...clips,
    ...qa,
    ...interviews,
    ...quickfacts,
  ]
}

export default getCards
