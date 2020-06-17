### Getting started

run `yarn dev` to start up elastic, kibana, run the server and the client.

##### static.json

Configuration file for the static file heroku buildpack. Is used to deliver the index html file to the client no matter which url location is landed on. Additionally it removes the `.html` extension. And it is able to proxy any network requests on the /api/ root to the server heroku app.

##TODO
Post images and video.
Grid view mode.
Reply to threads.