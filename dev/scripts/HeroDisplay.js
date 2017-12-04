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
                    <p className="introText">Welcome to Moonbucks, your first choice for premium brand coffee. This holiday season, spice up your party by adding a specialty coffee cocktail to your menu. Simply select your choice of liquor, and find our handcrafted specialty cocktail recipes to choose from. Everyone loves coffee, so make this holiday party an event to remember.</p>  
            </div>

        )
    }

}



export default HeroDisplay;