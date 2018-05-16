import React from 'react'
import { Panel, SubTitle, HrLineLight } from '../styledComponents'
import Contributor from './Contributor'

const Contributors = ({ contributors }) => (
  <Panel>
    <SubTitle>Contributors</SubTitle>
    <HrLineLight />
    <div
      style={{
        height: 500,
        overflow: 'auto',
        width: 300,
      }}
    >
      {contributors ? contributors.map(x => <Contributor key={x.id} {...x} />) : null}
    </div>
  </Panel>
)

export default Contributors
