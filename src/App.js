import React, { Component } from 'react';
import './App.css';
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel' //headers and container//
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar' //allows buttons to line up and look professional//
import Modal from 'react-bootstrap/lib/Modal' //imports popout//
import FormGroup from 'react-bootstrap/lib/FormGroup' //group inputs together//
import ControlLabel from 'react-bootstrap/lib/ControlLabel' //labels for inputs//
import FormControl from 'react-bootstrap/lib/FormControl' //organizes expressions//

class App extends Component {
  state = {
    recipes: [
      { recipeName: 'Ice', ingredients: ['Water'] },
      { recipeName: 'Toast', ingredients: ['Bread'] },
      { recipeName: 'Cereal ', ingredients: ['Cereal of Choice', 'Milk'] },
    ],
    add: false,
    edit: false,
    newRecipe: { recipeName: '', ingredients: [] },
    currentIndex: 0
  }

  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }

  addRecipe(recipeName, ingredients) {
    this.setState({
      newRecipe: { recipeName: recipeName, ingredients: ingredients }
    })
  }

  saveRecipe(){
    let recipes = this.state.recipes.slice();
    recipes.push(this.state.newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes});
    this.setState({
      newRecipe: { recipeName: '', ingredients: [] }
    });
    this.close();
  }

  editRecipeName(recipeName,currentIndex){
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = {recipeName: recipeName, ingredients: recipes[currentIndex].ingredients};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes});
  }

  editIngredients(ingredients, currentIndex){
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = {recipeName: recipes[currentIndex].recipeName, ingredients: ingredients};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes});
  }

  componentDidMount(){
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    if(localStorage.length === 0){
      recipes = [
        { recipeName: 'Ice', ingredients: ['Water'] },
        { recipeName: 'Toast', ingredients: ['Sliced Break'] },
        { recipeName: 'Cold Cereal', ingredients: ['Favorite Cereal', 'Milk'] }
      ]
    }
    this.setState({recipes});
  }

  //closes Modal //
  close = () => {
    if (this.state.add) {
      this.setState({
        add: false
      })
    } else if(this.state.edit){
      this.setState({edit: false})
    }
  }

  //opens Modal//
  open = (state, index) => {
    this.setState({ [state]: true })
    this.setState({currentIndex: index});
  }

  render() {
    const { recipes, add, newRecipe, edit, currentIndex } = this.state;
    return (
      <div className="App container" style={{marginTop: 20}}>
      {recipes.length>0 && (
      <div>        
        <Accordion>
          {recipes.map((recipe, index) => (
            <Panel header={recipe.recipeName} eventKey={index} key={index}>
              <ol>
                {recipe.ingredients.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <ButtonToolbar>
                <Button bsStyle='danger' onClick={event => this.deleteRecipe(index)}>Delete Recipe</Button>
                <Button bsStyle='info' onClick={event => this.open('edit', index)}>Edit Recipe</Button>
              </ButtonToolbar>
            </Panel>
          ))}

        </Accordion>

        <Modal show={edit} onHide={this.close}>
          <Modal.Header closeButton>Edit Recipe</Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Recipe Name</ControlLabel>
              <FormControl
                type='text'
                placeholder='Type New Recipe Name'
                value={recipes[currentIndex].recipeName}
                onChange={event => this.editRecipeName(event.target.value, currentIndex)}
              />
            </FormGroup>

            <FormGroup controlId='controlTextarea'>
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                componentClass='textarea'
                placeholder='Type Ingredients Separated By Comma'
                value={recipes[currentIndex].ingredients}
                onChange={event => this.editIngredients(event.target.value.split(','), currentIndex)}
              />
            </FormGroup>

            <ButtonToolbar>
            <Button bsStyle='primary' onClick={event => this.close()}>Save Recipe</Button>
            <Button bsStyle='danger' onClick={event => this.close()}>Close</Button>
            </ButtonToolbar>             

          </Modal.Body>        
                     
        </Modal>

        </div>
      )}
        <Modal show={add} onHide={this.close}>
          <Modal.Header closeButton>Add Recipe</Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>New Recipe Name</ControlLabel>
              <FormControl
                type='text'
                placeholder='Type New Recipe Name'
                value={newRecipe.recipeName}
                onChange={event => this.addRecipe(event.target.value, newRecipe.ingredients)}
              />
            </FormGroup>

            <FormGroup controlId='controlTextarea'>
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                componentClass='textarea'
                placeholder='Type Ingredients Separated By Comma'
                value={newRecipe.ingredients}
                onChange={event => this.addRecipe(newRecipe.recipeName, event.target.value.split(','))}
              />
            </FormGroup>

            <ButtonToolbar>
            <Button bsStyle='primary' onClick={event => this.saveRecipe()}>Save Recipe</Button>
            <Button bsStyle='danger' onClick={event => this.close()}>Cancel</Button>
            </ButtonToolbar>             

          </Modal.Body>        
                     
        </Modal>
        <Button bsStyle='primary' onClick={event => this.open('add', currentIndex)}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;

