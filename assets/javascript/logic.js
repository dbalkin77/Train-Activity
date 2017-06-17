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

// Functions ///////////////////////////////////////////////////
$("#button").on("click", function () {

var trainName = $("#train-name").val().trim();
var trainDestination = $("#train-destination").val().trim();
var firstTrainTime = $("#first-train-time").val().trim();
var trainFrequency = $("#train-frequency").val().trim();

	console.log(trainName);
	console.log(trainDestination);
	console.log(firstTrainTime);
	console.log(trainFrequency);

	database.ref().set({
		trainName: trainName,
		trainDestination: trainDestination,
		firstTrainTime: firstTrainTime,
		trainFrequency: trainFrequency
	});
});

database.ref().on("value", function (snapshot){
	console.log(snapshot.val());
}); 

// 