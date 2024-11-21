# login-system-nodeJS-mongoDB
 
## What it does:

This webapp handles a repository of posts. Each posts has the following
information:

-User (that posted the post)
-Title
-Description
-Image

The user may login with their account or register if he has not gone one. Once
logged in they may create a new post or delete existing ones. Note that every
user can only see and delete their own posts.

## Tools Used:

Node.js has been used for the backend alongside with mongoDB for the database.

As for the front end Bootstrap templates have been used.

## Additional Notes:

This should not be interpreted as the most efficient solution for a likewise
problem but rather a possible solution.

One inefficiency can be found when a user creates a new Post. When they do, the
image is stored in a specific directory (public/images/) and the url to said
image is saved at the database entry of the post. The filename is also replaced
by a set of random characters. It has been done this way for investigation
purposes. However, it is nonsensical.
