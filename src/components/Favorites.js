import React, { Component } from 'react';
import Comments from './Comments.js';
import Comment from './Comment.js';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';


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
        this.showInfo = this.showInfo.bind(this);
    }

    showInfo(event){
        console.log("this is the data I want to delete:", this.props.favorites);
        console.log("this is what I might need to delete:", this.props.comments);
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
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
            <Container>
                <h1> My Current Favorites: </h1>
                <div>
                    {this.props.favorites ? this.props.favorites.map((restaurant, index) => {
                        return (
                            <Card key={index}>
                                <h2 onClick={this.showNote}>{restaurant.name}</h2>
                                <h3>Address:
                                    <a href={`https://www.google.com/maps/place/+${restaurant.address},+ ${restaurant.city}`}>{restaurant.address} {restaurant.city}</a>
                                </h3>
                                <h4>Speciatly: {restaurant.shortname}</h4>
                                {this.state.showComment ?
                                    <div>
                                        {this.props.comments[index] ?
                                            <Comment
                                                handleCommentDelete={this.props.handleCommentDelete}
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
                                <Button variant="contained" color="secondary" onClick={() => {this.props.handleFavoriteDelete(restaurant.id, index, this.props.favorites)}}>Delete
                                </Button>
                                <Button variant="outlined" color="inherit" onClick={this.toggleForm}>Leave a Note</Button>
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
                            </Card>
                        )
                    })
                    : ''
                    }
                </div>
            </Container>
            </Grid>
        )
    }
}

//this.props.comments[index].id, this.props.comments

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
