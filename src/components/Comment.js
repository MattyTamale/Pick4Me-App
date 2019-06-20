import React, { Component } from 'react';
import UpdateForm from './UpdateForm.js';
import Button from '@material-ui/core/Button';


class Comment extends Component {
    constructor(){
        super()
        this.state = {
            showForm: false
        }
    }

    showEditForm = (event) => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    render(){
        return (
            <div key={this.props.index}>
                <h4>{this.props.comments[this.props.index].note}</h4>
                <Button onClick={this.showEditForm}>Edit</Button>
                {this.state.showForm ?
                    <div>
                        <UpdateForm
                            handleUpdate={this.props.handleUpdate}
                            index={this.props.index}
                            comments={this.props.comments}
                            favorites={this.props.favorites}
                        />
                    </div>
                    : ''
                }
            </div>
        )
    }
}


export default Comment;
