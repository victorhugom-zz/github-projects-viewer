import React from 'react'

import { ImgThumb, HorizontalBlockCenter, Anchor, Hover } from '../styledComponents'

const ContributorContainer = Hover.extend``

const Contributor = contributor => (
  <ContributorContainer>
    <Anchor href={contributor.html_url} target="_blank">
      <HorizontalBlockCenter>
        <ImgThumb src={contributor.avatar_url} />
        <span>{contributor.login}</span>
      </HorizontalBlockCenter>
    </Anchor>
  </ContributorContainer>
)

export default Contributor
