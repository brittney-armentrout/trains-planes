// Initialize Firebase
var config = {
    apiKey: "AIzaSyCSHUksPPwvQ6KpTTfdr7JMMWscOUwRGGc",
    authDomain: "train-time-5ccb6.firebaseapp.com",
    databaseURL: "https://train-time-5ccb6.firebaseio.com",
    projectId: "train-time-5ccb6",
    storageBucket: "train-time-5ccb6.appspot.com",
    messagingSenderId: "649822591902"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Global Values
var name = "";
var destination = "";
var firstTrain = 0;
var frequency = "";
var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(firstTrainConverted);

var currentTime = moment();
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
var remainder = diffTime % frequency;
var minAway = frequency - remainder;
var nextArrival = moment().add(minAway, "minutes");


$("#submit-button").on("click", function(event){
    event.preventDefault();

    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    //Clears inputs
    $("#name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");


    database.ref().push( {
        name: name, 
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

    database.ref().on("child_added", function(childSnapshot) {
        $("#name-display").append("<div><span class='member-name'>" +
          childSnapshot.val().name);      
          $("#destination-display").append("<div><span class='member-name'>" +
          childSnapshot.val().destination);   
          $("#freq-display").append("<div><span class='member-name'>" +
          childSnapshot.val().frequency);    
          $("#arrival-display").append("<div><span class='member-name'>" +
          childSnapshot.val().nextArrival);  
          $("#minaway-display").append("<div><span class='member-name'>" +
          childSnapshot.val().minAway);      
});    
});


