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
            showCocktailID: '',
            selectedValue: '',
            showPopup: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.setCocktailId = this.setCocktailId.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
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

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
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
                        <h2>Whiskey</h2>
                    </label>
                    <label>
                        <input type="radio" value="baileys" checked={this.state.selectedOption === 'baileys'} />
                        <h2> Irish Cream</h2>
                    </label>
                    <label>
                        <input type="radio" value="vodka" checked={this.state.selectedOption === 'vodka'} />
                        <h2>Vodka</h2>
                    </label>
                </form>
                    <p className="introText">Please select a Liquor to see delicious Coffee Cocktails</p>

                <ul className="cocktailDisplay">

                    {this.state.cocktails.map(cocktail =>
                        <li onClick={() => this.setCocktailId(cocktail.id)} key={cocktail.id}>
                            <button className="btnShowInfo" onClick={this.togglePopup}>Show Info</button>
                            <img className="cocktailImage" src={cocktail.smallImageUrls[0].replace(/90$/, '500')} />
                            <h2> {cocktail.recipeName}</h2>
                            {this.state.showCocktailID === cocktail.id &&
                                this.state.showPopup ?

                                <Popup className="popUp"
                                    cocktailInfo={<CocktailInfo alcohol={this.state.selectedValue}  cocktailId={cocktail.id} />}
                                    closePopup={this.togglePopup.bind(this)}
                                />
                                : null}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
class Popup extends React.Component {

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    {this.props.cocktailInfo}
                    <button onClick={this.props.closePopup}>Close</button>
                </div>
            </div>
        );
    }
}

class CocktailInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alcohol: props.alcohol,
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

    getLiquors() {
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
                    per_page: 10
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
            <div className="modal">
                <div className="recipe">
                    <h2>Recipe</h2>
                    {this.state.recipe.map((recipeLine, index) =>
                        <p className="recipeLines" key={index}>{recipeLine}</p>
                    )}
                </div>
                {/* <div className="liquorImages"> */}
                {this.state.liquors.length > 0 && this.state.recipe.length >0 ?
                    <Flickity
                        className={'carousel'}
                        elementType={'div'}
                        options={flickityOptions}
                        imagesLoaded={true}>
                        {this.state.liquors.map(liquor => {
                            const liquorNameLink = liquor.name;
                            const linkNoApostrophe = liquorNameLink.replace("'", "");
                            const link = linkNoApostrophe.replace(/\s+/g, '-')
                            console.log(link, liquor.id);

                            return (<div key={liquor.id} className="liquorBottle">
                                <img src={liquor.image_url} className="bottleImage" />
                                <p className="liquorName">{liquor.name}</p>
                                <p className="liquorPrice">{`$${liquor.price_in_cents * 0.01}`}</p>
                                <p className="liquorMl">{`${liquor.package_unit_volume_in_milliliters
                                    } ml`}</p>
                                {<a style={{ display: "table-cell" }} href= {`http://www.lcbo.com/lcbo/product/${link}/${liquor.id}`} target="_blank">Purchase</a>} 
                            </div>) 
                        })};
                </Flickity>
                    : null}
                {/* </div> */}
            </div>
        )
    }

}

export default Gallery;