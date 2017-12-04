import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import flickity from 'flickity';
import Flickity from 'react-flickity-component'
import imagesLoaded from 'flickity-imagesloaded';



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
        this.setCocktailId = this.setCocktailId.bind(this);
    }

    getCocktails(alcohol) {
        axios.get(`http://api.yummly.com/v1/api/recipes`, {
            params: {
                _app_id: 'bd90db8c',
                _app_key: '09d9084e61038c6296815d0591809343',
                q: 'coffee',
                'allowedIngredient[]': alcohol,
                'allowedCourse[]': 'course^course-Beverages',

                attributes: {
                    course: "Cocktails"
                },

                q: `coffee ${alcohol}`
            }
        }).then((res) => {
            this.setState({
                cocktails: res.data.matches
            })
        })
    }

    setCocktailId(cocktailId) {
        this.setState(prevState => ({
            showCocktailID: cocktailId
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
                        <input type="radio" value="rum" checked={this.state.selectedValue === 'rum'} />
                        <h2>Rum</h2>
                    </label>

                    <label>
                        <input type="radio" value="whiskey" checked={this.state.selectedOption === 'whiskey'} />
                        Whiskey
                    </label>
                    <label>
                        <input type="radio" value="baileys" checked={this.state.selectedOption === 'baileys'} />
                        Irish Cream
                    </label>
                    <label>
                        <input type="radio" value="vodka" checked={this.state.selectedOption === 'vodka'} />
                        Vodka
                    </label>
                </form>

                {this.state.cocktails.map(cocktail =>
                    <li onClick={() => this.setCocktailId(cocktail.id)} key={cocktail.id}>
                        {cocktail.recipeName}
                        <img src={cocktail.smallImageUrls[0].replace(/90$/, '500')} />
                        {this.state.showCocktailID === cocktail.id ? <CocktailInfo alcohol={this.state.selectedValue} cocktailId={cocktail.id} /> : null}

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
            liquors: [],
            recipe: []
        }
    }

    componentDidMount() {
        this.getCocktailRecipe();
        this.getLiquors();
    }

    getCocktailRecipe() {
        axios.get(`http://api.yummly.com/v1/api/recipe/${this.props.cocktailId}`, {
            params: {
                _app_id: 'bd90db8c',
                _app_key: '09d9084e61038c6296815d0591809343',

            }
        }).then((res) => {
            this.setState({
                recipe: res.data.ingredientLines
            })

        })
    }

    getLiquors(){
        axios({
            method: 'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: 'http://lcboapi.com/products?',
                params: {
                    _access_key: 'MDo2MWJkNGVlZS1kNDgxLTExZTctODVkNC05ZjYwOTU5N2ExMWU6TTZycmVONzJ4N1RrYWtQdXZCMml2OTFDNUpNa1lhbEpQVnNz',
                    q: `${this.props.alcohol}`,
                    per_page: 5
                },
            }
        }).then((res) => {
            this.setState({
                liquors: res.data.result
            })
        });
    }

    render() {
        const flickityOptions = {
            wrapAround: true,
            imagesLoaded: true,
            initialIndex: 0,
            cellAlign: 'left',
            contain: true
        }

        return (
            <div>
                <h2>Recipe</h2>
                {this.state.recipe.map((recipeLine, index) =>
                    <p key={index}>{recipeLine}</p>
                )}
                {this.state.liquors.length > 0 ?
                    <Flickity
                        className={'carousel'}
                        elementType={'div'}
                        options={flickityOptions}
                        imagesLoaded={true}
                    >
                        {this.state.liquors.map(liquor =>
                            <div key={liquor.id} className="liquorBottle">
                                <img src={liquor.image_url} className="bottleImage" />
                                <p className="liquorName">{liquor.name}</p>
                            </div>
                        )};

                </Flickity>
                    : null}
            </div>
        )
    }

}

export default Gallery;
