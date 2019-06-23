# Pick4Me-App
Full-Stack Application of cumulative knowledge from GA program.

Built By: Matthew Talamantes

#### Link to app:
https://pick4me-app.herokuapp.com/


## Description

Pick4Me is an app designed with a simple premise in mind: to give people quick food recommendations for their area using
the FourSquare API. Out of all of the technologies that we learned in the General Assembly course I found that I enjoyed 
using Ruby on Rails and React the most and wanted to deepen my knowledge of both. The app uses full CRUD methods when interacting
with the favorites options and comments/notes are linked to each favorite using a one-to-one relationship within rails.

The flow of functionality of the app starts with a form that requests the user to input basic search criteria to receive a recommendation such as the city in which they are looking and the price range they are willing to pay. 
This form, in turn, creates the search url that will pull from the FourSquare API. It is required that the user
fill out the form before getting a recommendation and the user will be shown what inputs they entered for verification.
The results that are displayed will show the name of the location, the category of food it falls within and the address which can be clicked on to open Google Maps for directions. When a user adds a favorite to the list of favorites it will also create a note entry which they can edit upon clicking on the name
of the location. I originally had these two options separated but found that the user flow operated much better when they were connected.
Users can also delete notes as well as delete favorites from their list, which will systematically delete any notes that were aded as
well. The address of the location will also be displayed within the list of favorites and can also be clicked for Google Maps directions.

The app uses and abundace of conditional logic; from displaying stored data to toggling forms and favorites. The original design of
the app had all of the favorites be displayed instantly once a location was added to the list but this became cluttered around the 
time of styling the actual app.

In terms of styling, I used Material UI for React as an additional means of expanding my knowledge of react and making the app 
in general much more interactive. I believe I only scratched the surface when it comes to material ui with react but I am thoroughly
impressed with the results.

This project further improved on my abilities to understand the flow of processes and logic and made me a much better problem solver.
I am a much better React and Rails developer for the skills that I have learned from this project and am deeply satisfied that the app is mobile-ready.

## Technologies Used

Pick4Me was built using JavaScript, Ruby on Rails, React, Postgres, Node.js, HTML, CSS, Heroku, FourSquare API, and Material UI.
The developer tools I used were Github, Atom, Google, FourSquare Documentation, and Material UI Documentation.

## Approach Taken

I created a flowchart that will display the user navigation and data flow for my app in the link below:


## User Stories

Users can submit search criteria through an input form.

Users can receive recommended results from search criteria using FourSquare API.

Users can create a list of favorite recommended results.

Users can click on the name of the location to add/edit a note for future reference.

Users can delete notes as well as favorites from their list.

Users can toggle the list of favorites in order to prevent clutter.

Users can click on the address of the location to be taken to Google Maps for directions.

## Unsolved Problems

- Issues when attempting to add more than one comment on a single favorite.

- Future implementations are problems/features that I would love to implement if given additional time.

## Future Implementations

- I would love to implement user authentication for user-specific favorites as right now the list is completely open-sourced.

- Rather than link the user to Google Maps from the address I would like to add in a different map option within the app that lets the user know where they can find the location.

