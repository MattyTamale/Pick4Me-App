import React, { Component } from 'react';
import Comments from './Comments.js';



class Favorites extends Component {
    constructor(){
        super()
        this.state = {
            showForm: false
        }
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm(event){
        this.setState({
            showForm: !this.state.showForm
        })
    }

    render() {
        return (
            <div>
                Favorites will go here:
                <div>
                    {this.props.favorites ? this.props.favorites.map((restaurant, index) => {
                        return (
                            <div key={index}>
                                <h3>{restaurant.name}</h3>
                                <p>{this.props.comments}</p>
                                <button onClick={() => {this.props.handleDelete(restaurant.id, index, this.props.favorites)}}>Delete</button>
                                <button onClick={this.toggleForm}>Leave a Note</button>
                                {this.state.showForm ?
                                    <Comments
                                        handleUpdate={this.props.handleUpdate}
                                        restaurant={restaurant}
                                        key={index}
                                        index={index}
                                        comments={this.props.comments}
                                        favorites={this.props.favorites}
                                    />
                                : ''
                                }
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
