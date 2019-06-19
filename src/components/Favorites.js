import React, { Component } from 'react';
import Comments from './Comments.js';



class Favorites extends Component {
    constructor(){
        super()
        this.state = {
            showForm: false,
            showComment: false
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.showNote = this.showNote.bind(this);
    }

    toggleForm(event){
        this.setState({
            showForm: !this.state.showForm
        })
    }

    showNote(event){
        console.log("this is comments:", this.props.comments);
    }

    render() {
        return (
            <div>
                Favorites will go here:
                <div>
                    {this.props.favorites ? this.props.favorites.map((restaurant, index) => {
                        return (
                            <div key={index}>
                                <h3 onClick={this.showNote}>{restaurant.name}</h3>
                                {this.props.comments[index] ? <h4>{this.props.comments[index].note}</h4> : ''}
                                <button onClick={() => {this.props.handleDelete(restaurant.id, index, this.props.favorites)}}>Delete</button>
                                <button onClick={this.toggleForm}>Leave a Note</button>
                                {this.state.showForm ?
                                    <Comments
                                        handleCreateComment={this.props.handleCreateComment}
                                        restaurant={restaurant}
                                        key={index}
                                        index={index}
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

// <h4>{this.props.comments[index].note}</h4>

// {this.state.showForm ?
//     <Comments
//         handleUpdate={this.props.handleUpdate}
//         restaurant={restaurant}
//         key={index}
//         index={index}
//         favorites={this.props.favorites}
//     />
// : ''
// }


export default Favorites;
