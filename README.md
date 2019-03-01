# Readable Project

This is the second project for Udacity's React Developer Nanodegree and combine React and Redux. 


## Installing the project

* install api-server dependencies with `npm install` on api-server directory
* install frontend dependencies with `npm install` on frontend directory
* run api-server project with `npm start`, to allow access categories, posts and comments data.
* run frontend project with `npm start`. A browser window will automatically open and load Readable aplication.

## How Readable Works

### Main Page / List

On the main page, the application shows a list of posts, where the user can access the post details. It is also possible to give the post the thumbs up or down on the list.

There are two buttons to define the post list order, by the most recent (default list) or by the best voting posts.

The posts can also be listed by its category, through the nav bar.

### New Post Page
Where the user adds a new post to the database, anonymously.

### Post Detail Page
Shows the complete post information, including all comments related to the it, and the same thumbs up/down engine existing on the main page.

The user can add a new comment to the page, filling in and submiting the form.

There are two buttons at the top: DELETE, that removes the post from database, and EDIT, that redirects to a page to edit the post information.

Each comment has a button group which allows the user to edit, delete and vote the comment.

### Edit Post Page
Where the user edits the post information.

### Edit Comment Page
Where the user edits the comment information.
