### Getting started

Run the server locally with `yarn dev` it will run on `localhost:3100`
Elastic search needs to be running with `elasticsearch`

Run the client locally with `yarn dev`

Client requests are proxied to localhost


##### static.json

Configuration file for the static file heroku buildpack. Is used to deliver the index html file to the client no matter which url location is landed on. Additionally it removes the `.html` extension. And it is able to proxy any network requests on the /api/ root to the server heroku app.

##TODO
Post images and video and links.
Grid view mode.
Reply to threads.
Post using tripcode.