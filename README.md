
## Project Plan

### Goals

Upon completing this project I will have

- [ ]  Developed static and dynamic routes with an Express router
    
- [ ]  Use a model to handle core API-related logic (with Facebook API) and data management
    
- [ ] Define custom classes to communicate errors from API to client-side application
    
- [ ]  Handle all data persistence through a database (with Parse)
    
- [ ]  Built multiple responsive React web pages and components facilitating social networking
    
- [ ]  Created a ranking and filtering algorithm for search results, popular projects, and “feed” for app scalability
    
- [ ]  Researched and implemented practices for user privacy
    
- [ ]  Integrates open source software (TBD) for creating wikis
    

### Wireframe

Complete project with a view of almost all features including stretch goals can be seen here:

[https://excalidraw.com/#json=l_PpuI0_q0Xczao0vDmuH,NiNphyGSSLZMAJvYTTPebg](https://excalidraw.com/#json=l_PpuI0_q0Xczao0vDmuH,NiNphyGSSLZMAJvYTTPebg)

### Core Features

Upon completing this project the following specifications should be met

Skeleton essentials

- [ ]  Displays the following sections: Navigation header bar, sidebar, footer, search bar, card for post, project grid.
    

API

- [ ]  Express routes user to different web pages fetching and posting dynamic web content with many endpoints
    
- [ ]  Firebase is set up to store user information
    

Making an account

- [ ]  Users can log in with their Facebook account and log out
    
- [ ]  User submits form to set up their account with a username and other optional profile information including their email, a blurb, and portfolio to display to other users
    
- [ ]  User information saves in Firebase
    

Home

- [ ]  On initial page load, display the projects user is interested in (contributed to or has upvoted before) on sidebar
    
- [ ]  Display posts from project feeds that user is interested in
    
- [ ]  Users can comment or vote on these posts
    
- [ ]  Users can view what others have commented or voted
    

Project Wiki

- [ ]  Displays a wiki page
    
- [ ]  Users can edit page, with changes displayed publicly
    
- [ ]  Users can add to page, with additions displayed publicly
    

- [ ]  Users can add text with basic text styling (header, bold, italics etc.)
    
- [ ]  Users can add files (audio files, or images)
    
- [ ]  When users add, they fill out a description form which is posted publicly to project feeds
    

- [ ]  Page records how many users have seen the page
    

Project Feed (Not on wireframe - [ ]similar to Home page but see posts for a specific wiki)

- [ ]  User can switch to project feed tab on each wiki page to view recent updates (contribution posts)
    

Account

- [ ]  Users can see their account information including username, blurb, portfolio, and email, profile picture, date joined
    
- [ ]  Users can see other’s account information
    
- [ ]  Users can have different privacy settings to keep information private from other users
    
- [ ]  Users can edit their account information (except username and date joined)
    

Starting new project

- [ ]  Users can create a new project wiki by submitting information into a form
    
- [ ]  Displays information inputted into an empty Wiki page template
    
- [ ]  Wiki page information is saved in database
    
- [ ]  New project is linked in account profile
    

Searching

- [ ]  Users can search for projects or profiles
    
- [ ]  Results are ranked by relevance (using point system)
    

Finish

- [ ]  Styled with CSS library - [ ]Tailswift?
    
- [ ]  Deploy website!
    

### Stretch Features

With stretch features my app may have met these specifications:

  

Chat

- [ ]  Users can send messages to other users with FB messenger API by clicking on a button on a user profile
    
- [ ]  Chat shows messages of that who you recently messaged
    

  

Account information

- [ ]  Display activity log linking to the posted activity
    

  

Searching

- [ ]  Users can filter by categories (genre, project type, profile or project etc.) either from sidebar or on results page
    
- [ ]  Users can choose different sorting methods (sort by new or by least upvoted etc.)
    
- [ ]  Users can search within a specific project wiki for profiles or key terms
    

  

Teams

- [ ]  Display a team tab on each wiki project to request to join a team or start a team or request more members
    
- [ ]  Users are put into a group chat with other team members
    
- [ ]  Display teams section on account profile
    

  

Explore page

- [ ]  Users can find information and links to new, popular, or random projects on one page
    

  

Chat

- [ ]  Show new message notification on nav bar
    

  

Wiki media

- [ ]  Users can sketch in excalidraw directly in the website
    
- [ ]  Users can view images or listen to audio in custom media viewer
    

  

Project Wiki

- [ ]  Users can upvote or downvote pages and contributions
    
- [ ]  Displays who has ever contributed to this wiki and links to profile
    

  

### Timeline

I want to finish MVP by end of week 6, using week 7 as breathing/wiggle room in case there are unexpected roadblocks or otherwise, as with the rest of the internship time, work towards stretch features

  

#### Week 4

- [ ]  Create and set up Github repo with basic folder structure and dependencies
    
- [ ]  “commit a SUPER BASIC web page that is a skeleton for your project (no major features needed)”
    

Skeleton ^

- [ ]  Displays the following sections: Navigation header bar, sidebar, footer, search bar, card for post, project grid.
    

#### Week 5

API & Database set up for account information

- [ ]  Express is set up with endpoints to route to, post, and display user information
    
- [ ]  Firebase is set up to store user information
    

Making an account

- [ ]  Users can log in with their Facebook account and log out
    
- [ ]  User submits form to set up their account with a username and other optional profile information including their email, a blurb, and portfolio to display to other users
    
- [ ]  User information saves in Firebase
    

Account

- [ ]  Users can see their account information including username, blurb, portfolio, and email, profile picture, date joined
    
- [ ]  Users can see other’s account information
    
- [ ]  Users can have different privacy settings to keep information private from other users
    
- [ ]  Users can edit their account information (except username and date joined)
    

Integrate basic Project Wiki software

- [ ]  Displays a wiki page
    
- [ ]  Users can edit page, with changes displayed publicly
    
- [ ]  Users can add to page, with additions displayed publicly
    

- [ ]  Users can add text with basic text styling (header, bold, italics etc.)
    
- [ ]  Users can add files (audio files, or images)
    
- [ ]  When users add, they fill out a description form which is posted publicly to project feeds
    

API & Database set up for project information

- [ ]  Express is set up with endpoints to route to, post, and display wiki projects
    
- [ ]  Firebase is set up to store wiki information and contribution posts
    

#### Week 6

Project Feed (Not on wireframe - [ ]similar to Home page but see posts for a specific wiki)

- [ ]  User can switch to project feed tab on each wiki page to view recent updates (contribution posts)
    

Home

- [ ]  On initial page load, display the projects user is interested in (contributed to or has upvoted before) on sidebar
    
- [ ]  Display posts from project feeds that user is interested in
    
- [ ]  Users can comment or vote on these posts
    
- [ ]  Users can view what others have commented or voted
    

Starting new project

- [ ]  Users can create a new project wiki by submitting information into a form
    
- [ ]  Displays information inputted into an empty Wiki page template
    
- [ ]  Wiki page information is saved in database
    
- [ ]  New project is linked in account profile
    

Searching

- [ ]  Users can search for projects or profiles
    
- [ ]  Results are ranked by relevance (using point system)
    

Finish

- [ ]  Styled with CSS library - [ ]Tailswift?
    
- [ ]  Deploy website!
    

#### Week 7:

- [ ]  Wrap up MVP
    
- [ ]  Populate with dummy data
    
- [ ]  Plan out more in depth which stretch features to work on and develop timeline for that
    
- [ ]  Start stretch features
    

  

#### Week 8-10:

- [ ]  Stretch
