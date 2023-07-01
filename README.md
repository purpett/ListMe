# ListMe

## Description

ListMe is a React-based web application that has been developed as the second project of General Assembly's Software Engineering Intensive program. 
It allows users to create and edit lists of things. API calls provide the first 5 suggested items for a list based on the category selected by the user. Users can also create, edit, and delete individual items and groups within the lists.

## Deployment link

Get organised! [listme.michelabicocchi.com/](https://listme.michelabicocchi.com/)

## Getting started 

Copy the snippets of code below and paste them in your terminal:

`$ git clone https://github.com/purpett/list-app`

`$ npm install` or `$ yarn install`

Then run the following to start the server and see the changes as you go: 
`$ npm start` 

The app should open automatically in your browser. In case it doesn't, just paste this in the address bar: `localhost: 3000`. 

## Timeframe & Working Team

The timeframe provided for this project was 7 days. The app was developed independently.

## Technologies

- External APIs:
    - Movies: [TMDB Documentation](https://developers.themoviedb.org/3/movies/get-top-rated-movies)
    - Books: [NYTimes Documentation](https://developer.nytimes.com/docs/books-product/1/routes/lists/best-sellers/history.json/get)
    - Recipes: [Buzzfeed Tasty API by RapidApi](https://rapidapi.com/apidojo/api/tasty)
    - Testing APIs: [Postman](https://www.postman.com/). Platform to design, build, test and iterate APIs.
- Framework and Libraries
    - React
    - React Modal
    - React Router
- Languages
    - HTML
    - CSS
    - JavaScript
    - JSX (JavaScript XML)
- Code version control
    - Git: Local machine tool that tracks changes in the application.
    - GitHub: Online service for hosting repositories that uses Git.
- Code and debugging
    - Command line.
    - Visual Studio Code: code editor.
    - Google Chrome Developer Tools.
- Design
    - Freeform: digital whiteboarding app for Apple devices. Used to create wireframe.
- Media
    - [Pictogrammers - Material Design Icons](https://pictogrammers.com/library/mdi/): used for icons throughout the page.
    - [FFmpeg](https://ffmpeg.org/): open-source command line tool to handle processing of video and audio files.

## Brief

### General requirements:
* Build a web application from scratch, without a starter codebase. * Must be your own work.
* Use React with `create-react-app` to build your application.
* Plan your application using wireframes and user stories.
* Craft a README.md file that explains your app to the world.
* Deploy your app online, where the rest of the world can access it.

### Technical requirements:
* Select a Project Idea of your own. But the user must be able to:
* Add a new item to a list.
* Mark the item as complete/favourite/(watch, read, listen) later/flag/etc.
* Edit an item from a list.
* Remove an item from a list.
* Clear/delete all items.
* Clear/delete only marked items.
* Fetch data from at least one 3rd party API using Axios or fetch.
* Make frequent Git commits with descriptive messages, explaining your commit.
* Use React Router to handle multiple pages/views.

### Deployment:
* Your React app must be deployed to GitHub Pages, Surge, or any hosting service. Applications that are not deployed will be considered incomplete.

### Bonus:
* Incorporate another API in your application.
* Use `React.Context` to pass props down to your children.
* Make the app Responsive.
* Save the data to localStorage or an API.
* Use 1 or more 3rd party libraries.
* Use a React component library like Ant Design, Bootstrap React, or Material UI.
* Use a CSS library like Bootstrap.
* Add User Sign Up, Sign In, and Sign Out with Firebase and React Authentication (can be very challenging).

## Planning

1. I started the project by thinking about what I wanted the app to do and look like. I used the Freeform app to sketch the wireframes, which contain all the key components of the app homepage and list page (some minor elements are no longer as they show below):

![Homepage wireframe](/public/images/homepage.PNG)
<sub>Homepage wireframe</sub>

![List page wireframe](/public/images/list-page.PNG)
<sub>List page wireframe</sub>

2. Then I made plans of all the features I wanted to implement by creating a list of user stories:

![User stories screenshot](/public/images/listme-user-stories.png)
<sub> List of user stories </sub>

3. Then I followed this [Thinking in React tutorial](https://react.dev/learn/thinking-in-react) to figure out the next steps:
    - I divided the structure of the UI into components and gave them a hierarchy to follow
    - I created a basic, static version of my list app (no state, no interactivity)
    - I then decided what the representation of the state was going to look like:

        ![State structure](/public/images/list%20state.png) 
    - I identified a place to store the state, the closest common parent of all the components using the state - App.js.

## Build/Code Process

1. In the App.js file, I created the initial state to store the data structure of the entire app. It consists of an array of lists, where each list contains a name, category, and items array. Additionally, I utilised useState hooks to manage states for a new list modal and mobile sidebar, and implemented functions to store and load the state from localStorage.

    ![states](/public/images/states.png)

2. I wrote all the functions regarding a single list. The `createList` function adds a new list to the existing lists array. The `editListName` function updates the name of a specific list based on the provided index. Finally, the deleteList function removes a list from the array using the given index.

    ![Code screenshot of functions about creating/editing/deleting a list](/public/images/list-functions.png)

3. The `updateList` function updates the state of the lists variable by replacing the list at `listIndex` with `newList`. It is called at the end of state-modifying functions to ensure consistent state updates.

    ![updateList function](/public/images/state-update.png)

4. I wrote all the functions regarding list items.
    * The `createListItem` function adds a new item to a specific list by retrieving the existing items array, appending the `newItem`, and calling `updateList` with the modified list. This ensures proper state update with the new item added to the desired list.

        ![create-list-item-function](/public/images/create-list-item.png)
    
    * The `editListItem` function modifies the text of an item within a list by mapping over the existing items array, replacing the text property with `newText` while preserving the completed status. It then calls `updateList` with the modified list to ensure proper state update.

        ![edit-list-item-function](/public/images/edit-list-item.png)

    * The `deleteListItem` function removes a single item from a list by filtering out the item with the provided index from the existing items array. It then calls `updateList` with the modified list to update the state without the deleted item.

        ![delete-list-item-function](/public/images/delete-list-item.png)

    * The `deleteAllItems` function clears all items from a given list identified by its index. It calls the `updateList` function, passing the list index and an updated list object with an empty items array. This effectively removes all items from the specified list, ensuring that the state reflects the empty list of items.

        ![delete-all-items](/public/images/delete-list-items.png)
    
    * The `deleteCompletedItems` function removes completed items from a list by filtering out the items with a completed property set to true from the existing items array. It then calls `updateList` with the modified list, effectively updating the state to remove the completed items.

        ![delete-completed-items](/public/images/delete-completed-items.png)

    * The `toggleItem` function toggles the completion status of an item within a list by mapping over the existing items array, toggling the completed property when the item indices match, and then calling `updateList` with the modified list. This ensures the state reflects the toggled completion status of the item.

        ![toggle-item-function](/public/images/toggle-checked.png)
    
5. After choosing and testing the selected APIs, I wrote one function per category: Movies, Books, and Recipes. These return Promises, which made working on the API results other than within the functions. 
6. I wrote a function that selects 5 random elements from an array. This function gets called in all 3 functions that make API calls for the different categories:

    ![get-random-items-function](/public/images/shuffle.png)

7. I wrote a function that calls one of the 3 API functions depending on which category the user has chosen for a list. If a user chooses 'Other', the function returns a Promise with an empty array, so the new list doesn't have any suggestions:

    ![Code snippet of a function that makes API calls depending on category chosen](/public/images/make-api-call.png)

8. I connected all the different components and parts of the code.
9. Once I had a well-functioning application, I wrote my CSS per component (instead of a single file) to style the UI.
10. Finally, I worked on fixing bugs and improving the user experience as much as I could. I also worked on responsiveness.

## Challenges

- Using React independently for the first time, with only basic knowledge of the topic. I spent a lot of time researching and following tutorials to get the project to where I imagined.
- Reading React errors on the browser and locating the issue on the code.
- Navigating and updating the state. 
- Facing the structural characteristics of React, like understanding when things are happening and in what order, when the state is getting updated and when the page is about to rerender. This was specifically hard when I tried to add multiple items to the state at once. But I did eventually find out how this logic works under the hood. 
- Getting three different API calls to output the same thing: 5 strings per API call. Every API is unique, which was a challenge in itself. They have different methods, different key/value formatting and they output different things.
- Adding media queries to several CSS files, that are divided according to the components. The output was almost never what I expected.


## Wins

- I'm quite proud that my project works just like I envisioned. The features I added work perfectly fine, the API calls return suggestions just like I wanted, and users can have multiple lists! 
- Although I accidentally planned a state structure that was more complex than required, I managed to work it out. 
- Using a framework I was not very familiar with. 
- I really like the design of the UI. I am quite happy about the UX too. Buttons have animations, paragraphs don't move too much when a form opens to edit text, the delete button appears when a user hovers over a list item but it does not move the text, and there is a collapsible menu on smaller screens. 

## Key learnings

This project has led me to research, learn, and implement a great deal of things:
- React Modal: I have discovered and used React Modal to create responsive and customizable modal dialogs.
- React Router: To create routing patterns in my web application, enabling users to navigate easily between different pages and components.
- Dynamic routing: Allowed me to create more flexible and customizable routes based on specific parameters or data. I used it to dynamically create a route with a newly created list in the path. 
- useNavigate: The useNavigate hook has proven to be a powerful tool for programmatic navigation, allowing me to easily redirect users to different routes and pages when a list gets created or deleted.
- useParams: By using the useParams hook, I have learned to extract dynamic parameters from the URL, making it easier to pass this information to children components (e.g., list index).
- useEffect: I feel more confident using this hook to manage state changes, rerendering, routing, and more side effects of other actions.
- React Context: It has allowed me to pass information to children components without props drilling (using intermediate components only to pass to final components).
- I now better understand the state and how to manage it.

## Future improvements

* Look into User Authentication with Firebase.
* Add modal to ask for confirmation when trying to delete something (list item, multiple items, a list).
* Add more ways to mark the item (favorite, watch, read, etc.).
* Implement a light/dark mode with a toggle switch.
* On mobile, allowing users to delete items by swiping left on the item. 
