import React, { Component } from 'react'
import { InputGroup, Card, Elevation } from '@blueprintjs/core' // the UI library that we are using
import Center from 'react-center' // component to center our panel
import TodoItem from './TodoItem' // our custom todo item component
import "./App.css" // import our customer CSS

// App is our root component (remember that our UI is structured as a tree).
// all components must extend from React.Component
class App extends Component  {
  constructor (props) {
    // we have to call the parent class' constructor to properly
    // initialise the component if we want to override the constructor
    super(props)

    // for stateful components, we must always set the initial state
    this.state = {
      newField: "",
      todoData: [
        { checked: false, text: 'Buy groceries' },
        { checked: true, text: 'Do chores' },
        { checked: false, text: 'Prepare dinner' }
      ]
    }
  }

  // you can think of the render function as the function that binds the state and the UI,
  // i.e. state => UI, where the arrow represents this render functions
  render() {
    // using functional programming to immutably create an array of TodoItem components
    // out of the todo data
    const todoItems = this.state.todoData.map((todoData, index) => {
      return <TodoItem
        // this passes all fields in todoData as props into TodoItem (similar to spread operator syntax)
        {...todoData}
        // here we create a new arrow function that will call the updateTodoCheck event
        // handler we defined below
        onCheck={isChecked => {
          // remember we need to pass in the index of the todo, otherwise the method
          // wouldn't know which todo item we are editing
          this.updateTodoCheck(index, isChecked)
        }}
        // similar to above
        onTextChange={newText => {
          this.updateTodoText(index, newText)
        }}/>
    })

    return (
      <Center>
        <Card
          elevation={Elevation.TWO}
          // in react we use "className" instead of "class"
          className='Panel'>
          <form onSubmit={this.onSubmitNew}>
            <input
              // we delimit each class with a space
              className='pt-input pt-large NewField'
              type='text'
              placeholder='Hit enter to add a new task...'
              // remember we discard the idea of having a text field's state live on the
              // text field itself. the next 2 lines converts this input from a "uncontrolled
              // component" to a "controlled component". this means that the state of the
              // component is controlled by a state machine elsewhere. in this case, the state
              // machine lives inside this component.
              onChange={this.onNewFieldChange}
              value={this.state.newField}/>
          </form>
          {/* below is how we throw in ANY kind of expressions, but not all data types can be rendered
              you can see other strategies for conditional rendering here:
              https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
              */}
          {todoItems}
        </Card>
      </Center>
    )
  }

  // event handler for when the topmost text field's content changes
  onNewFieldChange = (event) => {
    this.setState({
      newField: event.target.value
    })
  }

  // you can read more about controlled input components here:
  // https://reactjs.org/docs/forms.html

  // event handler for when the form wrapping the topmost text field is submitted
  onSubmitNew = (event) => {
    // in native HTML, a form submission event will trigger a URL redirection. we stop
    // that from happening by calling preventDefault() on that form submission event
    // you can read more about it here:
    // https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data
    event.preventDefault();
    const newTodoItem = {
      checked: false,
      text: this.state.newText
    }
    // we do not modify state by mutating this.state
    this.setState({
      todoData: [
        // the triple periods '...' is called the spread operator in javascript. in
        // our case, its spreads out the array into another array, e.g.
        // const myArray = [ 1, 2, 3 ];
        // const myNewArray = [ ...myNewArray, 4, 5 ]; // => [ 1, 2, 3, 4, 5 ]
        // you can read more about it here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        newTodoItem,
        ...this.state.todoData,
      ],
      newField: '' // clear the topmost text field when we have added a new todo item
    })
    // remember that in react, we do not mutate variables, in fact you can tell that all
    // of our methods/functions are pure functions
  }

  // method for replacing the todo data at a specifix index
  updateTodo = (index, newValue) => {
    // in JS, arrays are also objects and the underlying datastructure look like this:
    // { 1: "foo", 2: "bar" }
    // Object.assign returns a new array of this.state.todoData with the data at index
    // replaced with newValue
    const newTodoData = Object.assign(this.state.todoData, {[index]: newValue})
    // update the state!
    this.setState({ todoData: newTodoData })
  }

  // event handler for updating todo item checkbox state at a specific index
  updateTodoCheck = (index, isChecked) => {
    const newItemData = {
      ...this.state.todoData[index],
      checked: isChecked
    }
    this.updateTodo(index, newItemData)
  }

  // event handler for updating todo item textfield state at a specific index
  updateTodoText = (index, newText) => {
    // using the spread operator again, but now with an object
    const newItemData = {
      ...this.state.todoData[index],
      text: newText
    }
    this.updateTodo(index, newItemData)
  }
}

// we have to export anything that we want to be able to import in other files.
// there are 2 types of exports:
// 1. named export
// 2. default export (this one's a default export!)
// to give you some sense, React.Component is a named import and React is a default export
// you can read more about them here:
// https://stackoverflow.com/a/33611943/4773291
export default App
