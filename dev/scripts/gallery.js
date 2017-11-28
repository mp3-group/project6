import React from 'react';

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
                {this.state.cocktails.map(cocktail => {
                    return (
                        <div key={cocktail.id}>
                            <h2>{cocktail.name}</h2>
                            <img src={``} alt={`Image of ${cocktail}`} />
                        </div>
                    )
                })}
            </div>

        )
    }
}


export default 'Gallery';