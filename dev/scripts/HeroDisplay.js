import React from 'react';
import Gallery from './gallery.js'

class HeroDisplay extends React.Component {

    constructor() {
        super();
        this.state = {
            show: true
        }
        this.handleHeroFade = this.handleHeroFade.bind(this)
    }

    handleHeroFade() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return(
            <div className="hero">
                <input type="checkbox" id='slideIn' onChange={this.handleHeroFade}/>
                <label htmlFor="slideIn"><i className="fa fa-glass" aria-hidden="true"></i></label>
                <p className="glassIcon">Click Glass to Begin Your Selection</p>
                {this.state.show === true ? <HeroText /> : null}
                <div id="page1">
                  <Gallery />
              {/* <CocktailInfo /> */}
              </div>
              
            </div>
        )
    }
}

class HeroText extends React.Component {

    render() {
        return(
            <div>
                <h1>Coffee Cocktails</h1>
                    <p className="introText">Welcome to Moonbucks, your first choice for premium brand coffee. This holiday season, spice up your party with a specialty coffee cocktail. Select your preferred choice of liquor, then choose from our menu of specialty coffee cocktail recipes. Everyone loves coffee, so this year make your holiday party an event to remember.</p>  
            </div>

        )
    }

}



export default HeroDisplay;