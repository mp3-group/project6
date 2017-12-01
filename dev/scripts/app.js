import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './gallery.js';

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
              <div className='wrapper companyName'>
                <img className='logo' src="assets/coffeeBeanLean.png" alt="company logo of a coffee bean"/>
                <h1>moondollars</h1>
                <p>premium coffee</p>
              </div>
                <input type="checkbox" id='slideIn'/>
                <label htmlFor="slideIn">click</label>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita a consectetur voluptas eum eaque beatae repellendus quasi molestias, iusto vel harum odio ea praesentium asperiores aliquam exercitationem sapiente esse corporis.</p>
              <div id="page1">
                  <Gallery />
              {/* <CocktailInfo /> */}
              </div>
            </header>
        </div>
      )
    }
}



ReactDOM.render(<App />, document.getElementById('app'));

