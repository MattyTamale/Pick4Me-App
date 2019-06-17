import React, { Component } from 'react';
import Favorites from './components/Favorites.js';
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
            cost: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
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


    //=================
    //PREVENT INFINITE
    //=================

    // componentDidMount(){
    //     this.fetchFavorites()
    // }

    render(){
        return (
            <div>
                <h1>Pick-4-Me!</h1>
                <button onClick={this.handleSubmit}>Get Data</button>
                <div onSubmit={this.handleSearch}>
                    <form >
                        <label>Location: </label>
                        <input
                            id='currentCity'
                            type='text'
                            onChange={this.handleChange}
                            placeholder='City, State'
                            value={this.state.currentCity}
                        />
                        <input
                            id='cost'
                            type='text'
                            onChange={this.handleChange}
                            placeholder='Price Point: 1, 2, 3, or 4'
                            value={this.state.cost}
                        />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div>
                    {this.state.results ?
                        <div>
                            <h2>Name of Restaurant: {this.state.venue.name}</h2>
                            <h3>Style of Food: {this.state.venue.categories[0].name}</h3>
                        </div>
                        : ''
                    }
                </div>
                <div>
                    <Favorites />
                </div>
            </div>
        )
    }
}

export default App;
