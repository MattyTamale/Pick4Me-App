import React, { Component } from 'react';
import Comments from './Comments.js';
import Comment from './Comment.js';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';


class Favorites extends Component {
    constructor(props){
        super(props)
        this.state = {
            showForm: false,
            showComment: false,
            showEditForm: false,
            showFaves: false
        }
        // this.toggleForm = this.toggleForm.bind(this);
        this.showNote = this.showNote.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.toggleFavs = this.toggleFavs.bind(this);
    }

    showInfo(event){
        console.log("this is the data I want to delete:", this.props.favorites);
        console.log("this is what I might need to delete:", this.props.comments);
    }

    toggleFavs(event){
        this.setState({
            showFaves: !this.state.showFaves
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
                <div className="favContainer">
                <Button variant="contained" color="secondary" size="large" onClick={this.toggleFavs} className="toggleFavorites">Show/Hide</Button>
                <br/>
                <br/>
                </div>
                {this.state.showFaves ?
                    <div>
                        {this.props.favorites ? this.props.favorites.map((restaurant, index) => {
                            return (
                                <Card key={index} className="favorite">
                                    <CardContent>
                                    <div className="favoriteInfo">
                                    <h2 onClick={this.showNote} className="name">{restaurant.name}</h2>
                                    <h3>Address:</h3>
                                    <h2><a href={`https://www.google.com/maps/place/+${restaurant.address},+ ${restaurant.city}`}>{restaurant.address} {restaurant.city}</a></h2>
                                    <h3>Speciatly: {restaurant.shortname}</h3>
                                    </div>
                                    {this.state.showComment ?
                                        <div>
                                            {this.props.comments[index] ?
                                                <Card>
                                                    <CardContent>
                                                    <Comment
                                                        handleCommentDelete={this.props.handleCommentDelete}
                                                        handleUpdate={this.props.handleUpdate}
                                                        key={index}
                                                        index={index}
                                                        comments={this.props.comments}
                                                        favorites={this.props.favorites}
                                                    />
                                                    </CardContent>
                                                </Card>
                                                : ''
                                            }
                                        </div>
                                        : ''
                                    }
                                    <div className="favButtons">
                                        <div className="deleteButton">
                                        <Button variant="contained" color="secondary" onClick={() => {this.props.handleFavoriteDelete(restaurant.id, index, this.props.favorites)}}>Delete
                                        </Button>
                                        </div>
                                        <div className="noteButton">
                                            <Comments
                                                handleCreateComment={this.props.handleCreateComment}
                                                restaurant={restaurant}
                                                key={index}
                                                index={index}
                                                favorites={this.props.favorites}
                                            />
                                        </div>
                                    </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                        : ''
                        }
                    </div>
                    : ''
                }
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
