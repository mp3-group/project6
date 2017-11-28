import React from 'react';
import Form from './form.js';

class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            cocktails: []
        }
    }
    componentDidMount() {
        axios.get(``, {
            params: {
                api_key: ``,

            }
        }).then((res) => {
            // console.log(res);
            this.setState({
                cocktails: res
            })
        })
    }
    render() {
        return (
            <div>
                <h1>hi</h1>
                <p>hi</p>
                {/* {this.state.cocktails.map(cocktail => {
                    return (
                            // <div key={cocktail.id}>
                            //     <h2>{cocktail.name}</h2>
                            //     <img src={``} alt={``} />
                            // </div>
                            <h1>workkk</h1>
                    )
                })} */}
            </div>

        )
    }
}


export default Gallery;