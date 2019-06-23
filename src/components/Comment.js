import React, { Component } from 'react';
import UpdateForm from './UpdateForm.js';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';


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
                <h2>{this.props.comments[this.props.index].note}</h2>
                <div className="editButtons">
                    <div className="editComment">
                    <Button variant="outlined" color="secondary" onClick={()=> {this.props.handleCommentDelete(this.props.comments[this.props.index].favorite_id, this.props.comments)}}>Delete <DeleteIcon /></Button>
                    </div>
                    <div className="editComment">
                    <Button variant="outlined" color="primary" onClick={this.showEditForm}>Edit <Icon>edit_icon</Icon></Button>
                    </div>
                </div>
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
