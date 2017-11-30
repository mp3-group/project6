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
                q: `coffee ${alcohol}`,
                'allowedIngredient[]': alcohol,
                'allowedCourse[]': 'course^course-Beverages',

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
            showCocktailID: cocktail
            
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

                        {this.state.showCocktailID === cocktail.id ? <CocktailInfo alcohol={this.state.selectedValue}ingredients={cocktail.ingredients}/> : null}
                        
                    </li>
                    
                )}
            
            </div>
        );
    }
}

class CocktailInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients:props.ingredients,
            alcohol:props.alcohol
        }
        // this.getCocktailRecipe = this.getCocktailRecipe.bind(this);
    }
    render(){
        return(
            <div>
                {this.state.ingredients}
                {/* this is what we'll use to link to the lcbo api: */}
                <p>{this.state.alcohol}</p>
            </div>
        )
    }
}

export default Gallery;