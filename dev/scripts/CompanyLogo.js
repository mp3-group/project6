import React from 'react';

class CompanyLogo extends React.Component {
    render() {
        return(
            <div className='companyName'>
                <img className='logo' src="assets/coffeeBeanLean.png" alt="company logo of a coffee bean"/>
                <h1>moondollars</h1>
                <p>premium coffee</p>
          </div>
        )
    }
}

export default CompanyLogo;