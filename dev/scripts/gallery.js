import React from 'react';
import axios from 'axios';

class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            cocktails: [],
            isToggleOn: false,
            showCocktailID: '',
            selectedValue: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.getCocktailRecipe = this.getCocktailRecipe.bind(this);
    }
   
    getCocktails(alcohol) {
        axios.get(`http://api.yummly.com/v1/api/recipes`, {
            params: {
                _app_id: 'bd90db8c',
                _app_key: '09d9084e61038c6296815d0591809343',
                q:`coffee ${alcohol}`
            }
        }).then((res) => {
            console.log(res.data.matches);
            this.setState({
                cocktails: res.data.matches
            })

        })
    }

    getCocktailRecipe(cocktail) {
        // e.preventDefault();
       
        this.setState(prevState => ({
            // id: cocktail,
            showCocktailID: cocktail
            // isToggleOn: !prevState.isToggleOn
            
        }));
     
    }

    getLiqourBrand() {
        
    }

    handleChange(e) {

        this.setState({
            selectedValue: e.target.value
            }, 

            () => this.getCocktails(this.state.selectedValue)
        );
    }

    render() {
        return (
            <div>                
                <form className="alcoholOption" value={this.state.selectedValue} onChange={this.handleChange}>   
                    <label>
                        <input type="radio" value="rum" checked={this.state.selectedOption === 'rum'}/>
                        Rum
                    </label>
                    <label>
                        <input type="radio" value="whiskey" checked={this.state.selectedOption === 'whiskey'}/>
                        Whiskey
                    </label>
                    <label>
                        <input type="radio" value="irish" checked={this.state.selectedOption === 'irish'}/>
                        Irish Cream
                    </label>
                    <label>
                        <input type="radio" value="vodka" checked={this.state.selectedOption === 'vodka'}/>
                        Vodka
                    </label>
                </form>    

                {this.state.cocktails.map(cocktail => 

                    <li onClick={()=>this.getCocktailRecipe(cocktail.id)}  key={cocktail.id}>
                        {cocktail.recipeName}
                        <img src={cocktail.smallImageUrls[0].replace(/90$/,'500')} />

                        {this.state.showCocktailID === cocktail.id ? <p>{cocktail.ingredients}</p> : null}
                        
                    </li>
                    
                )}
            
            </div>
        );
    }
}

class CocktailRecipe extends React.Component {

}



export default Gallery;