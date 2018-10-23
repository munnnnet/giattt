import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/Layout/'
import Card from '../components/Card/'
import Bio from '../components/Bio'

class NoteIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Bio 
          title="Notes"
          description="Here's some of my front end development and UX notes"
        />
        <div className="flexWrapper">
          {posts.map(({ node }) => {
            const category = get(node, 'frontmatter.category')
            const title = get(node, 'frontmatter.title') || node.fields.slug
            const role = get(node, 'frontmatter.role')
            const source = get(node, 'frontmatter.source')
            
              if(category == "note"){
                return (
                  <Card 
                    key={node.fields.slug}
                    title={title}

                    role={role}
                    link={node.fields.slug}
                    
                    source={source}
                  />
                )
              }
            })
          }
        </div>
      </Layout>
    )
  }
}

export default NoteIndex

export const noteQuery = graphql`
  query NoteIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: 
      { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { publish: { ne: "false" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            category
            title
            role
            link
            source
          }
        }
      }
    }
  }
`
