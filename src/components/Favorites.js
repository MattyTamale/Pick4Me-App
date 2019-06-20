import React, { Component } from 'react';
import Comments from './Comments.js';
import Comment from './Comment.js';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';

// const useStyles = makeStyles(theme => ({
//   button: {
//     margin: theme.spacing(1),
//   },
//   input: {
//     display: 'none',
//   },
// }));


class Favorites extends Component {
    constructor(props){
        super(props)
        this.state = {
            showForm: false,
            showComment: false,
            showEditForm: false
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.showNote = this.showNote.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
    }

    toggleForm(event){
        this.setState({
            showForm: !this.state.showForm
        })
    }

    showNote(event){
        console.log("this is comments:", this.props.comments);
        this.setState({
            showComment: !this.state.showComment
        })
    }

    showEditForm(event){
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    render() {
        return (
            <div>
                <h1> My Current Favorites: </h1>
                <Container>
                <div>
                    {this.props.favorites ? this.props.favorites.map((restaurant, index) => {
                        return (
                            <div key={index}>
                                <h2 onClick={this.showNote}>{restaurant.name}</h2>
                                <h3>Address: {restaurant.address} {restaurant.city}</h3>
                                <h4>Speciatly: {restaurant.shortname}</h4>
                                {this.state.showComment ?
                                    <div>
                                        {this.props.comments[index] ?
                                            <Comment
                                                handleUpdate={this.props.handleUpdate}
                                                key={index}
                                                index={index}
                                                comments={this.props.comments}
                                                favorites={this.props.favorites}
                                            />
                                            : ''
                                        }
                                    </div>
                                    : ''
                                }
                                <Button variant="contained" color="secondary" onClick={() => {this.props.handleFavoriteDelete(restaurant.id, index, this.props.favorites, this.props.comments[index].id, this.props.comments)}}>Delete
                                    <DeleteIcon className={classes.rightIcon} />
                                </Button>
                                
                                <Button onClick={this.toggleForm}>Leave a Note</Button>
                                {this.state.showForm ?
                                    <div>
                                        <Comments
                                            handleCreateComment={this.props.handleCreateComment}
                                            restaurant={restaurant}
                                            key={index}
                                            index={index}
                                            favorites={this.props.favorites}
                                        />
                                    </div>
                                : ''
                                }
                            </div>
                        )
                    })
                    : ''
                    }
                </div>
                </Container>
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
