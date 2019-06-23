import React, { Component } from 'react';
import Favorites from './components/Favorites.js';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import './App.css';

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
            dollar: '',
            favorites: [],
            newFavorite: [],
            comments: '',
            submitted: false,
            note: '',
            favorite_id: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.infoSubmitted = this.infoSubmitted.bind(this);
        this.setPrice = this.setPrice.bind(this);
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
        searchURL: this.state.baseURL + this.state.explore + this.state.location + this.state.radius + this.state.query + this.state.limit + this.state.price + this.state.client_id + this.state.client_secret + this.state.v,
        submitted: false
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
            console.log("this is venue:", this.state.venue);
        }).catch(err => console.log(err))
      })
    }

    setPrice(){
        if(this.state.cost === '1'){
            this.setState({
                dollar: '$ Cheap'
            })
        }else if (this.state.cost === '2'){
            this.setState({
                dollar: '$$ Average'
            })
        }else if (this.state.cost === '3'){
            this.setState({
                dollar: '$$$ Pricey'
            })
        }else if (this.state.cost === '4'){
            this.setState({
                dollar: '$$$$ Fancy'
            })
        }
    }

    infoSubmitted(event){
        this.setState({
            submitted: true
        })
        this.setPrice();
    }

    //======================
    //HEROKU CREATE METHODS
    //======================

    handleCreateFavorite() {
        let favorite = {
           name: this.state.venue.name,
           shortname: this.state.venue.categories[0].shortName,
           address: this.state.venue.location.address,
           city: this.state.currentCity
           }
        fetch('https://pick4me-api.herokuapp.com/favorites', {
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
            let favoriteId = jData.id
            let newNote = this.state.note
            this.updateFavoritesArray(jData, 'favorites')
            this.handleCreateComment(newNote, favoriteId);
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
        fetch('https://pick4me-api.herokuapp.com/comments', {
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



    //===============
    //CREATE METHOD
    //==============

    // handleCreateFavorite() {
    //     let favorite = {
    //        name: this.state.venue.name,
    //        shortname: this.state.venue.categories[0].shortName,
    //        address: this.state.venue.location.address,
    //        city: this.state.currentCity
    //        }
    //     fetch('http://localhost:3000/favorites', {
    //     body: JSON.stringify(favorite),
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'
    //     }
    //     }).then( createdFavorites => {
    //         return createdFavorites.json()
    //     }).then( jData => {
    //         console.log("this is jData:", jData);
    //         console.log("this is favorite:", favorite);
    //         let favoriteId = jData.id
    //         let newNote = this.state.note
    //         this.updateFavoritesArray(jData, 'favorites')
    //         this.handleCreateComment(newNote, favoriteId);
    //     }).catch( err => console.log(err));
    // }

    updateFavoritesArray(favorite, array){
        console.log("this is favorites:", favorite);
    this.setState( prevState => {
        prevState[array].push(favorite)
        return {
            [array]: prevState[array]
            }
        })
    }

    // handleCreateComment(comment, favoriteID) {
    //     let newComment = {
    //         note: comment,
    //         favorite_id: favoriteID
    //     }
    //     fetch('http://localhost:3000/comments', {
    //     body: JSON.stringify(newComment),
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'
    //     }
    // }).then( createdComments => {
    //         return createdComments.json()
    //     }).then( jData => {
    //         this.updateCommentsArray(jData, 'comments')
    //     }).catch( err => console.log(err));
    //     console.log("these are the comments:", this.state.comments);
    //     this.fetchFavorites();
    //     this.fetchComments();
    // }

    updateCommentsArray(comment, array, index){
        console.log("this is updated array:", [array]);
    this.setState( prevState => {
        console.log("this is prevState[array]", prevState[array]);
        // prevState[array].push(comment)
        // return {
        //     [array]: prevState[array]
        //     }
        // })
        prevState.comments[index] = comment
        return {
            [array]: prevState.comments[index]
            }
        })
    }


    //==============================
    //HEROKU UPDATE METHOD/COMMENT
    //=============================

    handleUpdate(comment, array, index, id){
        let updateNote = {
            note: comment
        }
        fetch(`https://pick4me-api.herokuapp.com/comments/${id}`, {
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
            this.updateCommentsArray(jData, 'comments', index);
            })
        .catch(err => console.log('this is error from handleUpdate', err));
    }

    //============================
    //UPDATE METHOD/LEAVE COMMENTS
    //============================

    // handleUpdate(comment, array, index, id){
    //     let updateNote = {
    //         note: comment
    //     }
    //     fetch(`http://localhost:3000/comments/${id}`, {
    //         body: JSON.stringify(updateNote),
    //         method: 'PUT',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then( updatedFavorite => updatedFavorite.json())
    //     .then(jData => {
    //         console.log("this is jData", jData);
    //         this.removeFromCommentsArray(array, index, updateNote);
    //         this.updateCommentsArray(jData, 'comments', index);
    //         })
    //     .catch(err => console.log('this is error from handleUpdate', err));
    // }

    //===========================================
    //HEROKU DELETE METHOD & REMOVAL FROM ARRAY
    //===========================================

    handleFavoriteDelete(id, index, array, favoriteID, comments){
        console.log('this is delete', id, index, array);
        fetch(`https://pick4me-api.herokuapp.com/favorites/${id}`, {
            method: 'DELETE'
        })
        .then(data => {
            console.log("It's been deleted, trust me");
            this.removeFromFavoritesArray(array, index);
            this.handleCommentDelete(favoriteID, comments);
        }).catch( err => console.log('this is error from handleDelete:', err))
        this.fetchComments();
        this.fetchFavorites();
    }

    handleCommentDelete(id, array){
        console.log('this is delete comment', id);
        fetch(`https://pick4me-api.herokuapp.com/comments/${id}`, {
            method: 'DELETE'
        })
        .then(data => {
            console.log("It's been deleted, trust me");
            this.removeFromComments(array, id)
        }).catch( err => console.log('this is error from handleDelete:', err))
        this.fetchFavorites();
    }

    //==============================================
    //DELETE METHOD AND REMOVAL FROM FAVORITES ARRAY
    //==============================================
    //
    // handleFavoriteDelete(id, index, array, favoriteID, comments){
    //     console.log('this is delete', id, index, array);
    //     fetch(`http://localhost:3000/favorites/${id}`, {
    //         method: 'DELETE'
    //     })
    //     .then(data => {
    //         console.log("It's been deleted, trust me");
    //         this.removeFromFavoritesArray(array, index);
    //         this.handleCommentDelete(favoriteID, comments);
    //     }).catch( err => console.log('this is error from handleDelete:', err))
    //     this.fetchComments();
    //     this.fetchFavorites();
    // }

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

    // handleCommentDelete(id, array){
    //     console.log('this is delete comment', id);
    //     fetch(`http://localhost:3000/comments/${id}`, {
    //         method: 'DELETE'
    //     })
    //     .then(data => {
    //         console.log("It's been deleted, trust me");
    //         this.removeFromComments(array, id)
    //     }).catch( err => console.log('this is error from handleDelete:', err))
    //     this.fetchFavorites();
    // }

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

    //======================
    //HEROKU FETCH REQUESTS
    //======================

    fetchFavorites(){
        fetch('https://pick4me-api.herokuapp.com/favorites')
            .then(data => data.json())
        .then(jData => {
            this.setState({
                favorites: jData
            })
            console.log(this.state.favorites);
        })
    }

    fetchComments(){
        fetch('https://pick4me-api.herokuapp.com/comments')
            .then(data => data.json())
        .then(jData => {
            this.setState({
                comments: jData
            })
            console.log("this is jData in comment fetch:", jData);
        })
    }

    //=====================
    // LOCAL FETCH REQUESTS
    //=====================

    // fetchFavorites(){
    //     fetch('http://localhost:3000/favorites')
    //         .then(data => data.json())
    //     .then(jData => {
    //         this.setState({
    //             favorites: jData
    //         })
    //     })
    // }
    //
    // fetchComments(){
    //     fetch('http://localhost:3000/comments')
    //         .then(data => data.json())
    //     .then(jData => {
    //         this.setState({
    //             comments: jData
    //         })
    //         console.log("this is jData in comment fetch:", jData);
    //     })
    // }

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
                <header>
                    <h1 className="mainTitle">Pick-4-Me!</h1>
                </header>
                <Container >
                <div className="searchForm">
                <Card onSubmit={this.handleSearch}>
                    <CardContent>
                    <h3>Please Fill Out & Submit These Two Fields:</h3>
                    <form className="initialForm">
                        <FormControl className="locationInput">
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
                        <FormControl className="priceInput">
                        <InputLabel>How Expensive?</InputLabel>
                        <Input
                            id='cost'
                            type='text'
                            onChange={this.handleChange}
                            placeholder='Price Point: 1, 2, 3, or 4'
                            value={this.state.cost}
                        />
                        <br/>
                        <br/>
                        </FormControl>
                        <div className="formButton">
                        <Button type='submit' variant="outlined" color="inherit" className="formSubmit" onClick={this.infoSubmitted}>Submit Info</Button>
                        </div>
                    </form>
                    </CardContent>
                    {this.state.submitted ?
                        <CardContent>
                            <Typography varaint="h5" component="h2" className="resultsTitle">This is the location you submitted:</Typography> <h3>{this.state.currentCity}</h3>
                            <Typography varaint="h5" component="h2" className="resultsTitle">This is the price point you submitted:</Typography> <h3>{this.state.dollar}</h3>
                        </CardContent>
                        : ''
                    }
                </Card>
                <br />
                <Button onClick={this.handleSubmit} variant="contained" color="primary" size="medium">Get Data</Button>
                </div>
                </Container>
                <div>
                    {this.state.results ?
                        <Card className="searchResults">
                            <CardContent>
                            <Typography varaint="h5" component="h2" className="resultsTitle">Name of Restaurant: </Typography>
                            <h1 className="searchResult">{this.state.venue.name}</h1>
                            <Typography varaint="h5" component="h2">Style of Food:</Typography> <h3>{this.state.venue.categories[0].name}</h3>
                            <Typography varaint="h5" component="h2">Location:</Typography>
                            <h3><a className="locationLink" href={`https://www.google.com/maps/place/+${this.state.venue.location.address},+ ${this.state.currentCity}`}>{this.state.venue.location.address}, {this.state.currentCity}</a></h3>
                            <Button variant="contained" color="primary" onClick={this.handleCreateFavorite} className="searchButton">Add to Favorites</Button>
                            <br/>
                            </CardContent>
                        </Card>
                        : ''
                    }
                </div>
                <div className="favoriteComponent">
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
                <footer>
                    <a className="footerInfo" href="https://github.com/MattyTamale/Pick4Me-App/blob/master/README.md">About</a>
                </footer>
            </div>
        )
    }
}

export default App;
