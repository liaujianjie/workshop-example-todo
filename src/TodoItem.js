import React from 'react'
import { Checkbox, EditableText } from '@blueprintjs/core'

const TodoItem = props => {
  return (
    <div className='TodoItem'>
      <Checkbox
        className='TodoCheckbox inline'
        checked={props.checked}
        onChange={event => {
          props.onCheck(event.target.checked)
        }} />
      <EditableText
        className={`TodoField ${props.checked ? 'pt-text-muted strikethrough' : null}`}
        value={props.text}
        onChange={props.onTextChange} />
    </div>
  )
}

export default TodoItem
