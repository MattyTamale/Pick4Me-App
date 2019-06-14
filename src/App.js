import React, { Component } from 'react';
// import './App.css';


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            baseURL: 'https://api.foursquare.com/v2/',
            search: 'venues/search?ll=40.7,-74',
            code: 200,
            client_id: '&client_id=FAKQIEROR2HUJGJXALMHBCNMLM5HSIULTXO21UKSNS1IVN13',
            client_secret: '&client_secret=MEC1NRC3Z0EYTO41JTP5HCBYCBLSGNP3KHBY3P1INKWUPEBY',
            query: '&query=sushi',
            v: '&v=20191231',
            searchURL: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //============================
    //PROPER FOURSQUARE URL SETUP
    //============================
    //https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD


    //========================
    //FOURSQUARE FETCH METHOD
    //========================
    handleSubmit (event) {
      event.preventDefault()
      this.setState({
        searchURL: this.state.baseURL + this.state.search + this.state.client_id + this.state.client_secret + this.state.v
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
            </div>
        )
    }
}

export default App;
