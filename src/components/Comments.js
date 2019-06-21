import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';


class Comments extends Component {
    constructor(){
        super()
        this.state = {
            comment: '',
            showForm: false
        }
    }

    handleSubmit = (event) => {
         event.preventDefault();
         console.log("this is favorites:", this.props.favorites[this.props.index].id);
         this.props.handleCreateComment(this.state.comment, this.props.favorites[this.props.index].id);
         this.setState({
             showForm: false
         })
    }

    toggleForm = (event) => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleChange = (event) => {
       this.setState({
         [event.target.id]: event.target.value
       })
    }

    render(){
        return(
            <div key={this.props.index}>
            <Button variant="outlined" color="inherit" onClick={this.toggleForm}>Leave a Note</Button>
            {this.state.showForm ?
                <form onSubmit={this.handleSubmit}>
                    <FormControl>
                    <TextField
                        multiline
                        rowsMax="4"
                        id='comment'
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.comment}
                    />
                    <Button type="submit">Submit</Button>
                    </FormControl>
                </form>
                : ''
            }
            </div>
        )
    }
}


export default Comments;
