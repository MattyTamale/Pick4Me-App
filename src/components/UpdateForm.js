import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

class UpdateForm extends Component {
    constructor(){
        super()
        this.state = {
            comment: '',
            showForm: false
        }
    }

    handleSubmit = (event) => {
         event.preventDefault();
         console.log("this is comments:", this.props.favorites[this.props.index]);
         this.props.handleUpdate(this.state.comment, this.props.comments, this.props.comments[this.props.index], this.props.comments[this.props.index].id)
         // this.toggleForm();

    }

    handleChange = (event) => {
       this.setState({
         [event.target.id]: event.target.value
       })
    }

    // toggleForm = (event) => {
    //     this.setState({
    //         showForm: !this.state.showForm
    //     })
    // }

    render(){
        return(
            <div key={this.props.index}>
                <form onSubmit={this.handleSubmit}>
                    <FormControl>
                        <Input
                            type="text"
                            value={this.state.comment}
                            onChange={this.handleChange}
                            id='comment'
                        />
                        <Button type="submit">Add Note</Button>
                    </FormControl>
                </form>
            </div>
        )
    }
}

export default UpdateForm;
