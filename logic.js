
$( document ).ready(function() {
	

	console.log("began");

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCqgAeGjn6uZFMeHasMb98VpE_eU8eSYH0",
    authDomain: "train-scheduler-2cc86.firebaseapp.com",
    databaseURL: "https://train-scheduler-2cc86.firebaseio.com",
    projectId: "train-scheduler-2cc86",
    storageBucket: "train-scheduler-2cc86.appspot.com",
    messagingSenderId: "272262690015"
  };
  firebase.initializeApp(config);
  var database=firebase.database();

  var name="";
  var destination="";
  var first="";
  var freq=0;

$("#submit").on("click", function(event) {
	console.log("clicked");
	//event.preventDefault();

	name=$("#name").val().trim();
	destination=$("#destination").val().trim();
	first=$("#first").val().trim();	
	freq=$("#freq").val().trim();

	database.ref().push({
		name: name,
		destination: destination,
		first: first,
		freq: freq,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

	
});

database.ref().on("child_added", function(snapshot){
	var sv=snapshot.val();

	var lastObj=sv;

	console.log(lastObj.name);
	console.log(lastObj.destination);
	console.log(lastObj.first);
	console.log(lastObj.freq);

	//Calculate times
	var firstTrain = moment(lastObj.first, "HH:mm");
	var frequency = moment(lastObj.freq, "mm");
	var frequencyInt=lastObj.freq;
	var diffTime = moment().diff(firstTrain, "minutes");	

	//Find time until next train
	var next=diffTime%frequencyInt;	

	//Add to current time to get next time
	var nextTime=moment().add(next, "m").format("HH:mm");

	//Append
	$("#table").append("<tr><td>"+lastObj.name+"</td><td>"+lastObj.destination+"</td><td>"+lastObj.freq+"</td><td>"+nextTime+"</td><td>"+next+"</td></tr>");


}, function(errorObject){
	console.log("Errors handled: " +errorObject.code);
});


});

