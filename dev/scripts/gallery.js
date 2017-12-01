import React from 'react';
import axios from 'axios';

class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            cocktails: [],
            isToggleOn: false,
            showCocktailID: '',
            selectedValue: '',
            showPopup: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.getCocktailRecipe = this.getCocktailRecipe.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
                

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
            showCocktailID: cocktail
            
        }));
     
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
                <form className="alcoholOption clearfix" value={this.state.selectedValue} onChange={this.handleChange}>
                    <label>
                        <input type="radio" value="rum" checked={this.state.selectedValue === 'rum'}/>
                        <h2>Rum</h2>
                    </label>

                    <label>
                        <input type="radio" value="whiskey" checked={this.state.selectedValue === 'whiskey'}/>
                        <h2>Whiskey</h2>
                    </label>
                    <label>
                        <input type="radio" value="irish" checked={this.state.selectedValue === 'irish'}/>
                        <h2>Irish Cream</h2>
                    </label>
                    <label>
                        <input type="radio" value="vodka" checked={this.state.selectedValue === 'vodka'}/>
                        <h2>Vodka</h2>
                    </label>
                </form>               
                
                {this.state.cocktails.map(cocktail => 
                    <li onClick={()=>this.getCocktailRecipe(cocktail.id)}  key={cocktail.id}>
                        {cocktail.recipeName}
                        <img src={cocktail.smallImageUrls[0].replace(/90$/,'500')} />
                        {this.state.showCocktailID === cocktail.id ? <CocktailInfo alcohol={this.state.selectedValue} ingredients={cocktail.ingredients} cocktailId={cocktail.id}/> : null}
                        
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
            alcohol:props.alcohol,
            liquors: [],
            ingredients:props.ingredients,
            alcohol:props.alcohol
        }
        // this.getCocktailRecipe = this.getCocktailRecipe.bind(this);
    }
    render(){
        return(
            <div>

                {this.state.ingredients}
                {this.state.liquors.length > 0 ?
                <Flickity
                    className={'carousel'} 
                    elementType={'div'}  
                    options={flickityOptions} 
                    imagesLoaded={true}  
                >
                {this.state.liquors.map(liquor => 
                    <div key={liquor.id} className="liquorBottle">
                        <img src={liquor.image_url} className="bottleImage"/> 
                        <p className="liquorName">{liquor.name}</p>
                    </div>
                )};
                    
                </Flickity>
                : null}
            </div>
        )
    }


export default Gallery;