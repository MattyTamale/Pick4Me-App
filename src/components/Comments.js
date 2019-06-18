import React, { Component } from 'react';

class Comments extends Component {
    constructor(){
        super()
        this.state = {
            comments: ''
        }
    }

    handleSubmit = (event) => {
         event.preventDefault();
         console.log("this is favorites:", this.props.favorites[this.props.index]);
           this.handleUpdate()
    }

    handleUpdate = () => {
        this.props.handleUpdate(this.state, this.props.index, this.props.favorites, this.props.favorites[this.props.index].id)
        console.log("this is comments:", this.props.comments);
    }

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
                        id='comments'
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.comments}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}


export default Comments;
