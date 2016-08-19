// server.js


var express    = require('express');        
var fs = require('fs');
var notesJson = require('./notes.json');
var XMLHttpRequest = require('XMLHttpRequest').XMLHttpRequest
var app        = express();                 
var bodyParser = require('body-parser');
const util = require('util');

var port = process.env.PORT || 8080;       

var router = express.Router();            
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function sendNumberedNote(noteId)
{
	//var configFile = fs.readFileSync('./notes.json');
	var config = getReadableFileThatsFresh()
	return config[noteId-1]
}

function getReadableFileThatsFresh()
{
	var configFile = fs.readFileSync('./notes.json');
	return JSON.parse(configFile);
}

function addNewNote(body)
{
	var thisId = 0
	var configFile = fs.readFileSync('./notes.json');
	var config = JSON.parse(configFile);
	thisId = config.length+1
	note = 
	{
		"id" : thisId,
		"body" : body
	}
	config.push(note)
	var configJSON = JSON.stringify(config);
	fs.writeFileSync('./notes.json', configJSON);
	return note
}

function Get(yourUrl)
{
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;
}

function parseJsonForWantedData(hugeData)
{
	var result = {};
	var issues = [];
	result.issues = issues
	for (var i = 0; i < hugeData.length; i++)
	{
		var loginName = hugeData[i].user.login
		var title = hugeData[i].title
		var assigneName = hugeData[i].assignee
		
		if (!assigneName || 0 === assigneName.length)
		{
			assigneName = "No one assigned"
		}
		else
		{
			assigneName = hugeData[i].assignee.login
		}
		issue = 
		{
			"title" : title,
			"creatorLoginName" : loginName,
			"assigneeLoginName": assigneName
		}
		result.issues.push(issue)
	}
	return JSON.stringify(result)
}

function sevenDaysAgo()
{
	var d = new Date()
	d.setDate(d.getDate() - 7)
	return d
}

router.get('/notes/:id', function(req, res)
{
	var nId = req.params.id
	res.send(sendNumberedNote(nId))
});

router.get('/notes', function(req, res)
{
	var config = getReadableFileThatsFresh()
	res.send(config)
});

router.post('/notes', function(req, res)
{
	var responseWillBe = addNewNote(req.body.body)
	res.send(responseWillBe)
});

router.get('/angularIssues', function(req, res) 
{
var thisURL = 'https://api.github.com/repos/angular/angular/issues?sort=created'
var weekPast = sevenDaysAgo();
var dateFormat = require('dateformat')
thisURL += '&since=' + dateFormat(weekPast, "isoDateTime");
var bigData = JSON.parse(Get(thisURL))
res.send(parseJsonForWantedData(bigData))
});

app.use('/api', router);

app.listen(port);
console.log('Listening on port: ' + port);
