import React, { Component } from 'react';
import Favorites from './components/Favorites.js';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
// import './App.css';


//Set the limit of results to 50 that way the results can be randomized and
//shown to the user using math.random() and show/hide methods

//'search' returns all results within a given area; 'explore' returns
//recommended results within a given area.

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            baseURL: 'https://api.foursquare.com/v2/',
            search: 'venues/search?',
            explore: 'venues/explore?',
            price: '&price=',
            location: 'near=',
            radius: '&radius=500',
            code: 200,
            limit: '&limit=50',
            client_id: '&client_id=FAKQIEROR2HUJGJXALMHBCNMLM5HSIULTXO21UKSNS1IVN13',
            client_secret: '&client_secret=MEC1NRC3Z0EYTO41JTP5HCBYCBLSGNP3KHBY3P1INKWUPEBY',
            query: '&query=restaurant',
            v: '&v=20191231',
            intent: '&intent=browse',
            searchURL: '',
            currentCity: '',
            venues: [],
            results: false,
            venue: '',
            cost: '',
            favorites: [],
            newFavorite: [],
            comments: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFavorites = this.handleFavorites.bind(this);
        this.fetchFavorites = this.fetchFavorites.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
        this.handleCreateFavorite = this.handleCreateFavorite.bind(this);
        this.handleCreateComment = this.handleCreateComment.bind(this);
        this.updateCommentsArray = this.updateCommentsArray.bind(this);
        this.updateFavoritesArray = this.updateFavoritesArray.bind(this);
        this.handleFavoriteDelete = this.handleFavoriteDelete.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.removeFromFavoritesArray = this.removeFromFavoritesArray.bind(this);
        this.removeFromCommentsArray = this.removeFromCommentsArray.bind(this);
        this.removeFromComments = this.removeFromComments.bind(this);
        // this.handleCreate = this.handleCreate.bind(this);
    }

    //============================
    //PROPER FOURSQUARE URL SETUP
    //============================
    //https://api.foursquare.com/v2/venues/search?near=san_diego,_ca&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD


    //============================
    //FOURSQUARE FOOD CATEGORY KEY
    //============================

    //4d4b7105d754a06374d81259



    //=====================
    //LOCATION INPUT METHOD
    //=====================

    handleSearch(event){
        event.preventDefault()
        console.log(this.state.currentCity);
        let area = this.state.currentCity;
        let cost = this.state.cost;
        this.setState({
            location: `near=${area}`,
            price: `&price=${cost}`
        })
    }


    //====================
    //HANDLE FORM CHANGE
    //===================

    handleChange(event) {
       this.setState({
         [event.target.id]: event.target.value
       })
    }


    //========================
    // HANDLE FAVORITES METHOD
    //========================

    handleFavorites(entry) {
        this.setState(prevState => {
            console.log("this is prevState:", prevState);
            prevState.favorites.push(entry)
            return {
                favorites: prevState.favorites
            }
        })
        this.fetchFavorites();
        this.fetchComments();
        console.log("this is favorites:", this.state.favorites);
    }


    //========================
    //FOURSQUARE FETCH METHOD
    //========================


    handleSubmit (event) {
      event.preventDefault()
      this.setState({
        searchURL: this.state.baseURL + this.state.explore + this.state.location + this.state.radius + this.state.query + this.state.limit + this.state.price + this.state.client_id + this.state.client_secret + this.state.v
      }, () => {
        console.log(this.state.searchURL)
        fetch(this.state.searchURL)
          .then(response => {
            return response.json()
        }).then(json => {
            console.log(json);
            this.setState({
                venues: json.response.groups[0].items,
                results: true,
                venue: json.response.groups[0].items[Math.floor(json.response.groups[0].items.length * Math.random())].venue
            })
        }).catch(err => console.log(err))
      })
    }

    //===============
    //CREATE METHOD
    //==============

    handleCreateFavorite() {
        let favorite = {
           name: this.state.venue.name,
           shortname: this.state.venue.categories[0].shortName,
           address: this.state.venue.location.address,
           city: this.state.currentCity
           }
        fetch('http://localhost:3000/favorites', {
        body: JSON.stringify(favorite),
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        }).then( createdFavorites => {
            return createdFavorites.json()
        }).then( jData => {
            console.log("this is jData:", jData);
            console.log("this is favorite:", favorite);
            this.updateFavoritesArray(jData, 'favorites')
        }).catch( err => console.log(err));
    }

    updateFavoritesArray(favorite, array){
        console.log("this is favorites:", favorite);
    this.setState( prevState => {
        prevState[array].push(favorite)
        return {
            [array]: prevState[array]
            }
        })
    }

    handleCreateComment(comment, favoriteID) {
        let newComment = {
            note: comment,
            favorite_id: favoriteID
        }
        fetch('http://localhost:3000/comments', {
        body: JSON.stringify(newComment),
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then( createdComments => {
            return createdComments.json()
        }).then( jData => {
            this.updateCommentsArray(jData, 'comments')
        }).catch( err => console.log(err));
        console.log("these are the comments:", this.state.comments);
        this.fetchFavorites();
        this.fetchComments();
    }

    updateCommentsArray(comment, array){
        console.log("this is updated array:", [array]);
    this.setState( prevState => {
        console.log("this is prevState[array]", prevState[array]);
        prevState[array].push(comment)
        return {
            [array]: prevState[array]
            }
        })
    }

    //============================
    //UPDATE METHOD/LEAVE COMMENTS
    //============================

    handleUpdate(comment, array, index, id){
        let updateNote = {
            note: comment
        }
        fetch(`http://localhost:3000/comments/${id}`, {
            body: JSON.stringify(updateNote),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then( updatedFavorite => updatedFavorite.json())
        .then(jData => {
            console.log("this is jData", jData);
            this.removeFromCommentsArray(array, index, updateNote);
            this.updateCommentsArray(jData, 'comments');
            })
        .catch(err => console.log('this is error from handleUpdate', err));
    }



    //==============================================
    //DELETE METHOD AND REMOVAL FROM FAVORITES ARRAY
    //==============================================

    handleFavoriteDelete(id, index, array){
        console.log('this is delete', id, index, array);
        fetch(`http://localhost:3000/favorites/${id}`, {
            method: 'DELETE'
        })
        .then(data => {
            console.log("It's been deleted, trust me");
            this.removeFromFavoritesArray(array, index)
        }).catch( err => console.log('this is error from handleDelete:', err))
        this.fetchComments();
        this.fetchFavorites();
    }

    removeFromFavoritesArray(array, index){
        this.setState(prevState => {
            console.log("this is prevState:", prevState.favorites);
            prevState.favorites.splice(index, 1)
            return {
                [array]: prevState.favorites
                }
            })
            this.fetchFavorites();
        }

    handleCommentDelete(id, array){
        console.log('this is delete comment', id);
        fetch(`http://localhost:3000/comments/${id}`, {
            method: 'DELETE'
        })
        .then(data => {
            console.log("It's been deleted, trust me");
            this.removeFromComments(array, id)
        }).catch( err => console.log('this is error from handleDelete:', err))
        this.fetchFavorites();
    }

    removeFromComments(array, index){
        this.setState(prevState => {
            console.log("this is prevState:", prevState.comments);
            prevState.comments.splice(index, 1)
            return {
                [array]: prevState.comments
                }
            })
            this.fetchComments();
        }

    removeFromCommentsArray(array, index, newEntry){
        this.setState(prevState => {
            console.log("this is prevState:", prevState.comments);
            console.log("this is newEntry:", newEntry);
            prevState.comments[index] = newEntry
            return {
                [array]: prevState.comments[index]
                }
            })
            this.fetchComments();
        }

    //===============
    //FETCH REQUESTS
    //===============

    fetchFavorites(){
        fetch('http://localhost:3000/favorites')
            .then(data => data.json())
        .then(jData => {
            this.setState({
                favorites: jData
            })
        })
    }

    fetchComments(){
        fetch('http://localhost:3000/comments')
            .then(data => data.json())
        .then(jData => {
            this.setState({
                comments: jData
            })
            console.log("this is jData in comment fetch:", jData);
        })
    }

    //=================
    //PREVENT INFINITE
    //=================

    componentDidMount(){
        this.fetchFavorites()
        this.fetchComments()
    }

    render(){
        return (
            <div>
                <h1>Pick-4-Me!</h1>
                <Container >
                <div onSubmit={this.handleSearch}>
                    <h3>Please Fill Out & Submit These Two Fields:</h3>
                    <form >
                        <FormControl>
                        <InputLabel>Location: </InputLabel>
                        <Input
                            id='currentCity'
                            type='text'
                            onChange={this.handleChange}
                            placeholder='City, State'
                            value={this.state.currentCity}
                        />
                        </FormControl>
                        <br/>
                        <br/>
                        <FormControl>
                        <InputLabel>How Expensive?</InputLabel>
                        <Input
                            id='cost'
                            type='text'
                            onChange={this.handleChange}
                            placeholder='Price Point: 1, 2, 3, or 4'
                            value={this.state.cost}
                        />
                        </FormControl>
                        <br/>
                        <Button type='submit'>Submit Info</Button>
                    </form>
                </div>
                <Button onClick={this.handleSubmit}>Get Data</Button>
                </Container>
                <div>
                    {this.state.results ?
                        <div>
                            <h2>Name of Restaurant: {this.state.venue.name}</h2>
                            <h3>Style of Food: {this.state.venue.categories[0].name}</h3>
                            <Button onClick={this.handleCreateFavorite}>Add to Favorites</Button>
                        </div>
                        : ''
                    }
                </div>
                <div>
                    <Favorites
                        favorites={this.state.favorites}
                        handleFavoriteDelete={this.handleFavoriteDelete}
                        handleCommentDelete={this.handleCommentDelete}
                        handleCreateComment={this.handleCreateComment}
                        handleChange={this.handleChange}
                        comments={this.state.comments}
                        handleUpdate={this.handleUpdate}
                    />
                </div>
            </div>
        )
    }
}

export default App;
