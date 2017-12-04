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
                    <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita a consectetur voluptas eum eaque beatae repellendus quasi molestias, iusto vel harum odio ea praesentium asperiores aliquam exercitationem sapiente esse corporis.</p>  
            </div>

        )
    }

}



export default HeroDisplay;