// Variables ////////////////////////////////////////////////////


var config = {
    apiKey: "AIzaSyCw8CLQDvv114eFr05CJa605IZ3ZsT2wMo",
    authDomain: "dbalkin77db.firebaseapp.com",
    databaseURL: "https://dbalkin77db.firebaseio.com",
    projectId: "dbalkin77db",
    storageBucket: "dbalkin77db.appspot.com",
    messagingSenderId: "906019419833"
};
// Initialize the database
firebase.initializeApp(config);
// variable that is a reference to the database
var database = firebase.database();
var trainName = "";
var trainDestination = "";
var firstTrainTime = 0;
var trainFrequency = 0;

// Onclick event coinciding witih submit buttion	
$("#button").on("click", function () {
	event.preventDefault();

 trainName = $("#train-name").val().trim();
 trainDestination = $("#train-destination").val().trim();
 trainFrequency = $("#train-frequency").val().trim();

	console.log(trainName);
	console.log(trainDestination);
	console.log(trainFrequency);

	// Convert first-train-time for browser outputs
	firstTrainTime = $("#first-train-time").val().trim();
	console.log(firstTrainTime);

	var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm:").subtract(1, "year");
	console.log(firstTrainTimeConverted);

	// Current Time
	var currentTime = moment();
	console.log ("Current time is: " + moment(currentTime).format("HH:mm"));

	// Difference in Train Times
	var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
	console.log("Difference in time is " + diffTime);

	// Time apart
	var trainRemainder = diffTime % trainFrequency;
	console.log(trainRemainder);

	// Minutes Until Train
	var minutesUntilTrain = trainFrequency - trainRemainder;
	console.log("Minutes until next train: " + minutesUntilTrain);

	// Next Arrival
	var nextArrival = moment().add(minutesUntilTrain, "minutes");
	console.log("Next train arrives at: " + moment(nextArrival).format("HH:mm"));

	$("#next-arrival-output").append("<tr>" + "<td>" + moment(nextArrival).format("HH:mm") + "</td>" + "</tr>");
	$("#minutes-away-output").append("<tr>" + "<td>" + minutesUntilTrain + "</td>" + "</tr>");
	

	// Code for push
	database.ref().push({

		trainName: trainName,
		trainDestination: trainDestination,
		firstTrainTime: firstTrainTime,
		trainFrequency: trainFrequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP,
	});
});

database.ref().on("child_added", function (childSnapshot){
	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().trainDestination);
	console.log(childSnapshot.val().trainFrequency);

// Add output to table

$("#name-output").append("<tr>" + "<td>" + childSnapshot.val().trainName + "</td>" + "</tr>");
$("#destination-output").append("<tr>" + "<td>" + childSnapshot.val().trainDestination + "</td>" + "</tr>");
$("#frequency-output").append("<tr>" + "<td>" + childSnapshot.val().trainFrequency + "</td>" + "</tr>");

	
}); 

