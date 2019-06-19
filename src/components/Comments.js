import React, { Component } from 'react';

class Comments extends Component {
    constructor(){
        super()
        this.state = {
            comment: ''
        }
    }

    handleSubmit = (event) => {
         event.preventDefault();
         console.log("this is favorites:", this.props.favorites[this.props.index].id);
         this.props.handleCreateComment(this.state.comment, this.props.favorites[this.props.index].id)
    }

    // handleUpdate = () => {
    //     this.props.handleUpdate(this.state, this.props.index, this.props.favorites, this.props.favorites[this.props.index].id)
    //     console.log("this is comments:", this.props.comments);
    // }

    handleChange = (event) => {
       this.setState({
         [event.target.id]: event.target.value
       })
    }

    render(){
        return(
            <div key={this.props.index}>
                <form onSubmit={this.handleSubmit}>
                    <input
                        id='comment'
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.comment}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}


export default Comments;
