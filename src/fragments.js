import { graphql } from 'gatsby'

export const PosterImageClipFragment = graphql`
  fragment PosterImageClipFragment on node__clip {
    title
    field_external_video_url {
      uri
      title
    }
    relationships {
      field_poster_image {
        localFile {
          publicURL
        }
      }
    }
  }
`;

export const ArticleFragment = graphql`
  fragment ArticleFragment on node__article {
    title
    field_include_in_the_teaching_se
    field_short_version {
      processed
    }
    field_author {
      processed
    }
    relationships {
      field_main_image {
        localFile {
          publicURL
        }
      }
    }
  }
`;

export const FullArticleFragment = graphql`
  fragment FullArticleFragment on node__article {
    __typename
    id
    field_include_in_the_teaching_se
    field_short_version {
      processed
    }
    field_old_article_discl {
      processed
    }
    field_author {
      processed
    }
    field_author_bio {
      processed
    }
    field_copyright {
      processed
    }
    title
    relationships {
      field_belongs_to_subtheme {
        id
        name
        relationships {
          field_belongs_to_theme {
            id
            name
          }
        }
      }
      field_article_related_content {
        __typename
        ... on node__faq {
          ...FAQFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
        ... on node__quickfact {
          ...QuickfactWithRelatedContentFragment
        }
      }
      field_tags {
        name
        relationships {
          backref_field_tags_node_article {
            ...ArticleFragment
          }
          backref_field_tag_node_faq {
            ...FAQFragment
          }
          backref_field_t_node_clip {
            ...PosterImageClipFragment
          }
        }
      }
      field_author_image {
        localFile {
          publicURL
          childImageSharp {
            id
            original {
              width
              height
              src
            }
            sizes {
              src
            }
            resolutions {
              height
              width
              src
            }
          }
        }
      }
      field_main_image {
        localFile {
          publicURL
          childImageSharp {
            id
            original {
              width
              height
              src
            }
            sizes {
              src
            }
            resolutions {
              height
              width
              src
            }
          }
        }
      }
    }
    field_large_callout_text {
      processed
    }
    field_full_version {
      processed
    }
  }
`;

export const InterviewFragment = graphql`
  fragment InterviewFragment on node__interview {
    title
    changed
    field_interviewee_bio {
      processed
    }
    field_key_quote {
      processed
    }
    relationships {
      field_interviewee {
        localFile {
          publicURL
        }
      }
    }
  }
`

export const FullInterviewFragment = graphql`
  fragment FullInterviewFragment on node__interview {
    title
    changed
    field_interviewee_name {
      processed
    }
    field_interviewee_bio {
      processed
    }
    field_key_quote {
      processed
    }
    field_full_length_version {
      processed
    }
    relationships {
      field_which_subtheme_does_this_b {
        id
        name
        relationships {
          field_belongs_to_theme {
            id
            name
          }
        }
      }
      field_tags {
        name
        relationships {
          backref_field_tags_node_article {
            ...ArticleFragment
          }
          backref_field_tag_node_faq {
            ...FAQFragment
          }
          backref_field_t_node_clip {
            ...PosterImageClipFragment
          }
        }
      }
      field_interviewee {
        localFile {
          publicURL
          childImageSharp {
            id
            original {
              width
              height
              src
            }
            sizes {
              src
            }
            resolutions {
              height
              width
              src
            }
          }
        }
      }
    }
  }
`

export const FAQFragment = graphql`
  fragment FAQFragment on node__faq {
    title
    field_expert_1 {
      value
      format
      processed
    }
    changed
  }
`

export const ClipFragment = graphql`
  fragment ClipFragment on node__clip {
    field_episode
    title
    field_external_video_url {
      uri
    }
    field_title_of_clip {
      processed
    }
     relationships {
      field_re {
        __typename
        ... on node__faq {
          ...FAQFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
      }
      field_poster_image {
        localFile {
          publicURL
        }
      }
    }
  }
`

export const QuickfactWithRelatedContentFragment = graphql`
  fragment QuickfactWithRelatedContentFragment on node__quickfact {
    title
    field_quickfact {
      value
      format
      processed
      summary
    }
    relationships {
      field_related_content {
        __typename
        ... on node__faq {
          ...FAQFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
      }
    }
  }
`

