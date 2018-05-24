// we have to import react every time we want to create a react component inside a file
// because the HTML syntax you see below is just JSX syntactic sugar over normal javascript
// to read more about this, see:
// https://reactjs.org/docs/jsx-in-depth.html
import React from 'react'
import { Checkbox, EditableText } from '@blueprintjs/core'

// this is a stateless functional component, notice that it is essentially a function
// that takes in props. no state machine is encapsulated inside here, all of its states
// are propagated from the parent component.
const TodoItem = props => {
  return (
    <div className='TodoItem'>
      {/* these two components are from Blueprint, see the documentation here:
          http://blueprintjs.com/docs/v2/#core/components/forms/checkbox */}
      <Checkbox
        className='TodoCheckbox inline'
        checked={props.checked}
        onChange={event => {
          // for checkboxes, the value of the check state from the event is in
          // event.target.checked
          props.onCheck(event.target.checked)
        }} />
      <EditableText
        className={`TodoField ${props.checked ? 'pt-text-muted strikethrough' : null}`}
        value={props.text}
        // since the function signature of props.onTextChange is the same as the one
        // expected for onChange, then we can just pass in the function without wrapping
        // it with our own function
        onChange={props.onTextChange} />
    </div>
  )
}

export default TodoItem
