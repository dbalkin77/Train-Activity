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
// Variables to store user input
var trainName = "";
var trainDestination = "";
var firstTrainTime = 0;
var trainFrequency = 0;

// Functions ///////////////////////////////////////////////////
$("#button").on("click", function () {
	event.preventDefault();

 trainName = $("#train-name").val().trim();
 trainDestination = $("#train-destination").val().trim();
 firstTrainTime = $("#first-train-time").val().trim();
 trainFrequency = $("#train-frequency").val().trim();

	console.log(trainName);
	console.log(trainDestination);
	console.log(firstTrainTime);
	console.log(trainFrequency);

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
	console.log(childSnapshot.val().firstTrainTime);
	console.log(childSnapshot.val().trainFrequency);

// Add output to table

$("#name-output").append("<tr>" + "<td>" + childSnapshot.val().trainName + "</td>" + "</tr>");
$("#destination-output").append("<tr>" + "<td>" + childSnapshot.val().trainDestination + "</td>" + "</tr>");
$("#frequency-output").append("<tr>" + "<td>" + childSnapshot.val().trainFrequency + "</td>" + "</tr>");
// $("#name-output").append("<tr>" + "<td>" + childSnapshot.val().trainFrequency + "</td>" + "</tr>");

}); 

// 