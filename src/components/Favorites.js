import React, { Component } from 'react';



class Favorites extends Component {
    render() {
        return (
            <div>
                Favorites will go here:
                <div>
                    {this.props.favorites ? this.props.favorites.map((restaurant, index) => {
                        return (
                            <div key={index}>
                                <h3>{restaurant.name}</h3>
                            </div>
                        )
                    })
                    : ''
                    }
                </div>
            </div>
        )
    }
}


// <div>
//     Favorites will go here:
//     {this.props.results ? this.props.favorites.map((name, index) => {
//         return (
//             <div>
//                 <h3>{this.props.favorites.name}</h3>
//             </div>
//         )
//     })
//     : ''
//     }
// </div>


export default Favorites;
