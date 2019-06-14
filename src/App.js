import React, { Component } from 'react';
// import './App.css';


//Set the limit of results to 50 that way the results can be randomized and
//shown to the user using math.random() and show/hide methods

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            baseURL: 'https://api.foursquare.com/v2/',
            search: 'venues/search?',
            location: 'near=',
            radius: '&radius=250',
            code: 200,
            limit: '&limit=50',
            client_id: '&client_id=FAKQIEROR2HUJGJXALMHBCNMLM5HSIULTXO21UKSNS1IVN13',
            client_secret: '&client_secret=MEC1NRC3Z0EYTO41JTP5HCBYCBLSGNP3KHBY3P1INKWUPEBY',
            query: '&query=restaurant',
            v: '&v=20191231',
            searchURL: '',
            currentCity: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //============================
    //PROPER FOURSQUARE URL SETUP
    //============================
    //https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD


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
        this.setState({
            location: `near=${area}`
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
        searchURL: this.state.baseURL + this.state.search + this.state.location + this.state.radius + this.state.query + this.state.limit + this.state.client_id + this.state.client_secret + this.state.v
      }, () => {
        console.log(this.state.searchURL)
        fetch(this.state.searchURL)
          .then(response => {
            return response.json()
          }).then(json => console.log(json),
            err => console.log(err))
      })
    }

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
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default App;
