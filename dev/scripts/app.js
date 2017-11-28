import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './gallery';
import CocktailInfo from './cocktailInfo';
import axios from 'axios';

// pseudo code:

  // create components for header, input selection, gallery for drink cocktails, display cards/recipe/alcohol drinks...

// take input from user to select type of alcohol
  //there will be a dropdown menu for user to select alcohol from

// display images of the coctails based user's alcohol selection
  // user flickity to display the coctail recipe

//when the coctail is selected the recipe will display informations - recipes and alcohol beverages -
 // recipes will be pulled from yumly  and alcohol will be pulled from lcbo api

// one card will display the recipe information
  //cards will have a flip animation when clicked


class App extends React.Component {
    render() {
      return (
        <div>
          <header>
            <h1>Moondollars!</h1>
          </header>
          <Gallery />
          <CocktailInfo />
        </div>
      )
    }
}



ReactDOM.render(<App />, document.getElementById('app'));

