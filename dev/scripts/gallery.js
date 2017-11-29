import React from 'react';
import axios from 'axios';

class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            cocktails: [],
            selectedValue: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }
   

    getCocktails(alcohol) {
        axios.get(`http://api.yummly.com/v1/api/recipes`, {
            params: {
                _app_id: '8c73dac4',
                _app_key: '02fdeca1ea3fe3a3ff3f13b6ad559a80',
                q:`coffee ${alcohol}`
            }
        }).then((res) => {
            this.setState({
                cocktails: res.data.matches
            })
        })
    }

    getCocktailRecipe() {
        // TODO: getCocktailRecipe() api call
    }

    getLiqourBrand() {
        // TODO: getLiqourBrand() api call
    }

    handleChange(e) {
        this.setState({selectedValue: e.target.value}, 
            () => this.getCocktails(this.state.selectedValue)
        );
    }

    render() {
        return (
            <div>
                
                <select 
                    value={this.state.selectedValue}
                    onChange={this.handleChange} 
                >   
                    <option value="rum">Rum</option>
                    <option value="whiskey">Whiskey</option>
                    <option value="irish">Irish Cream</option>
                    <option value="vodka">Vodka</option>
                </select>
                {this.state.cocktails.map(cocktail => 
                    <li key={cocktail.id}>
                        <p>{cocktail.recipeName}</p>
                        <img src={cocktail.smallImageUrls[0].replace(/90$/,'500')} />
                    </li>
                )}

            </div>
        );
    }
}


export default Gallery;