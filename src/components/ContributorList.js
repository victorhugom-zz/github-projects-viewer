import React from 'react'
import PropTypes from 'prop-types'

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

Contributors.propTypes = {
  contributors: PropTypes.object.isRequired,
}

export default Contributors
