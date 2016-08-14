# levelsBeynd
Quick assessment of JS

To use this application make sure that you have NodeJS installed. It can be found [here][node].

After Node is installed just navigate to ```../AngularProblems/``` in a command prompt and run the command 
```sh
node server.js
```
If everything is working correctly you should see
```sh
Listening on port: 8080
```

To get a json list of the AngularJS issues from the past seven days you can enter this into your browser
```sh
http://localhost:8080/api/angularIssues
```

To create a note use this format as your POST body
```sh
{
  "body" : "This is my note"
}
```


Make sure to add the Content-Type : application/json to your header. This is the address you POST too
```sh
http://localhost:8080/api/notes
```
If the POST is successful you should see your note as it is saved
```sh
{
  "id" : 1,
  "body" : "This is my note"
}
```

To get all the notes you have taken use send a GET to this address
```sh
http://localhost:8080/api/notes
```

To get a note by the id use this address 
```sh
http://localhost:8080/api/notes/:id
```
[node]: <https://nodejs.org/>
