import styled from 'styled-components'

export const Hover = styled.div`
  &:hover {
    background-color: #f6f6f6;
  }
`

export const Anchor = styled.a`
  text-decoration: none;
  color: black;
`

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: gray;
  margin: 10px;
`

export const SubTitle = styled.h2`
  font-size: 1em;
  text-align: center;
  color: gray;
  margin: 10px;
`

export const Text = styled.h3`
  font-size: 0.8em;
  text-align: center;
  color: dark-gray;
  margin: 10px;
`

export const ElipsedText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${props => props.width || '200px'};
`

export const Panel = styled.div`
  background: #fff;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 10px;
  margin: 10px;
`

export const ImgThumb = styled.img`
  width: 30px;
  height: 30px;
  margin: 10px;
`

export const HorizontalBlock = styled.div`
  display: flex;
  flex-direction: row;
`

export const HorizontalBlockCenter = HorizontalBlock.extend`
  align-items: center;
`

export const HorizontalBlockTop = HorizontalBlock.extend`
  align-items: flex-start;
`
export const HorizontalBlockBottom = HorizontalBlock.extend`
  align-items: baseline;
`

export const VerticalBlock = styled.div`
  display: flex;
  flex-direction: column;
`

export const HrLineLight = styled.hr`
  border: 1px #dfdfdf solid;
`

export const GrayInput = styled.input`
  height: 30px;
  color: black;
  background: #e9e8e6;
  border: none;
  border-radius: 3px;
`
