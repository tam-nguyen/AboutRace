import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  SVGChevron,
  FiledUnderLink
} from '../'

import {
  white,
  softblack,
} from '../../colors'

const PADDING = 138;
const PADDING_TABLET = 80;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Container = styled(Column)`
`

const TopContainer = styled(Row)`
  cursor: pointer;

  align-items: center;

  border-bottom: solid black ${props => props.open ? 0 : '1px'};

  @media (min-width: 1025px) { /* desktop */
 
  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const Title = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  padding-top: 18px;
  padding-bottom: 18px;

  margin-right: 10px;
`

const ChevronContainer = styled.div`
  width: 18px;
  height: 30px;

  transform: rotate(${props => props.open ? 90 : 0}deg);

  transition: all 0.3s ease-out;

  @media (max-width: 812px) { /* mobile */
    right: -25px;
  }
`

const Chevron = ({open}) => <ChevronContainer open={open}>
  <SVGChevron color={softblack} />
</ChevronContainer>

///

const ContentPane = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  transition: all 0.3s ease-out;

  height: auto;

  overflow: hidden;

  max-height: ${props => props.open ? 'auto' : 0};

  @media (min-width: 1025px) { /* desktop */
    flex-direction: row;

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const SmallTitle = styled.div`
  font-family: 'Quicksand';
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;

  letter-spacing: 0.02em;

  color: ${softblack};
`

const Text = styled.div`
  & > ul {
    /*list-style: none;*/
  }

  & > ul > li {
    margin-left: -1em;
  }
  font-size: 20px;
  line-height: 24px;
  font-family: 'Neuton';
  margin-bottom: 20px;

  & p {
    margin: 0;
  }
`

const SubTitle = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 14px;
  line-height: 30px;
  letter-spacing: 0.12em;

  text-transform: uppercase;

  padding-left: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 0;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

const Tags = styled(Column)`
  margin-bottom: 60px;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const Tag = styled.div`
  padding: 3px 15px;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  margin-right: 15px;
  margin-top: 15px;

  border-radius: 3px;
  background-color: ${white};
`

const Grade = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 30px;
  line-height: 30px;
  margin-bottom: 60px;

  color: ${softblack};

  letter-spacing: 0.02em;
`

const ContentColumn = styled(Column)`

  
  @media (min-width: 1025px) { /* desktop */
    max-width: 50%;
    margin-right: 100px;
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const SideColumn = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;


  @media (min-width: 1025px) { /* desktop */
    flex-direction: column;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
  }
`

const SideInnerColumn = styled(Column)`
  margin-right: 50px;

  @media (min-width: 1025px) { /* desktop */
    padding-right: 0;
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const ViewButton = styled(Row)`
  cursor: pointer;

  justify-content: center;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    width: 100%;
  }
`

const ViewLessonPlan = props => <ViewButton {...props}>
  <FiledUnderLink 
    to={props.to}
    style={{paddingTop: 0}}
  >
    View Lesson Plan
  </FiledUnderLink>
</ViewButton>

///

const BottomRow = styled(Row)`
  justify-content: center;

  @media (min-width: 1025px) { /* desktop */
    justify-content: flex-start;
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

class PlanPane extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      open: false
    };
  }

  render() {
    const {open} = this.state
    const title = get(this, 'props.data.title')
    const overview = get(this, 'props.data.field_overview.processed')
    const objectives = get(this, 'props.data.field_objectives.processed')

    const grade = get(this, 'props.data.field_grade_levels.processed')

    let subjects = get(this, 'props.data.relationships.field_subject_tags')
    subjects = subjects ? subjects.map( ({name}) => name) : subjects

    const lessonLink = `/lessons/${kebabCase(title)}`
    
    return (
      <Container>
        <TopContainer
          open={open}
          onClick={() => this.setState({open: !open})}
        >
          <Title style={{flex:1}}>{title}</Title>
          <Chevron open={open}/>
        </TopContainer>
        <ContentPane open={open}>
          <ContentColumn>
            <SubTitle>Overview</SubTitle>
            <Text dangerouslySetInnerHTML={{ __html: overview }}/>

            <SubTitle>Objectives</SubTitle>
            <Text dangerouslySetInnerHTML={{ __html: objectives }}/>
          </ContentColumn>
          <Column>
            <SideColumn>
              <SideInnerColumn>
                <SubTitle>subjects</SubTitle>
                <Tags>
                  {
                    subjects && subjects.map( (name, key) => <Row key={key}>
                      <Tag>{name}</Tag>
                    </Row>)
                  }
                </Tags>
              </SideInnerColumn>

              <SideInnerColumn>
                <SubTitle>grade</SubTitle>
                <Grade dangerouslySetInnerHTML={{ __html: grade }} />
              </SideInnerColumn>

              <SideInnerColumn>
                <ViewLessonPlan to={lessonLink}/>
              </SideInnerColumn>
            </SideColumn>

            <BottomRow>
            </BottomRow>
          </Column>
        </ContentPane>
      </Container>
    )
  }
}

export default PlanPane
