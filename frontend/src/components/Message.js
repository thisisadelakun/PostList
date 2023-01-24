import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({ message, info, positive, warning, negative }) => (
  <Message compact info positive warning negative>
    {message}
  </Message>
)
