import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class UpdateForm extends Component {
    constructor(){
        super()
        this.state = {
            comment: ''
        }
    }

    handleSubmit = (event) => {
         event.preventDefault();
         console.log("this is comments:", this.props.favorites[this.props.index]);
         this.props.handleUpdate(this.state.comment, this.props.comments, this.props.favorites[this.props.index], this.props.comments[this.props.index].id)

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
                        type="text"
                        value={this.state.comment}
                        onChange={this.handleChange}
                        id='comment'
                    />
                    <Button type="submit">Add Note</Button>
                </form>
            </div>
        )
    }
}

export default UpdateForm;
