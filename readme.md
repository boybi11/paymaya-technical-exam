# Paymaya Technical Exam

## Goals

Build a simple blog. The app will allow a user to:
- create a new post

- update a post

- delete a post

- view a single post

- view all posts (with pagination)

- search for posts via keyword, results must be paginated.

- sort posts via date created / title

At a minimum, a post has a title and content. 
Validations must be present (like post title and content should be required.)
Before deleting a post, a confirm modal should be displayed to warn the user, and ask if he/she wants to continue.
No need for user registration/login. 
Tech Requirements:
1. Must use React and its hooks

2. Use whatever you prefer for styling, UI frameworks, storage, etc. 

3. Push the project to GitHub.

This project includes a API server (json-server) for you to use. To install and run, use the commands below:

- `npm i`
- `npm run dev` // to start both server and react

#### Endpoints & Schema

##### GET `/blogs`

```JSON
[
  blog {
    "title",
    "category",
    "author",
    "content",
    "content_draft",
    "uuid",
    "post_date"
  }
]
```