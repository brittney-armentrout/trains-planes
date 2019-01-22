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

//Variables
var name = "";
var destination = "";
var firstTrain = "";
var frequency = 0;


$(document).ready(function () {

    $("#submit-button").on("click", function (event) {
        event.preventDefault();

        //Grab values from user input
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        //Clears inputs
        $("#name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");

        //Push data to Firebase database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });

        //Train Confirmation Pop-up
        $("#trainAdded").modal("show");
        setTimeout(function () {
            $("#trainAdded").modal("hide");
        }, 2500);



        database.ref().on("child_added", function (childSnapshot) {
            name = childSnapshot.val().name;
            destination = childSnapshot.val().destination;
            firstTrain = childSnapshot.val().firstTrain;
            frequency = childSnapshot.val().frequency;

            var timeFormat = "HH:mm";
            var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
            console.log(firstTrainConverted);

            var currentTime = moment();
            var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
            console.log("Diff in Time: " + diffTime);

            var remainder = diffTime % frequency;
            console.log("Remainder: " + remainder);

            var minAway = frequency - remainder;
            console.log("min away: " + minAway);

            var nextArrival = moment().add(minAway, "minutes").format("HH:mm");
            console.log("Next Train: " + nextArrival);
            
            
            var tableRow = $("<tr>");
            var tableDataName = $("<td>").text(name);
            var tableDataDestination = $("<td>").text(destination);
            var tableDataFrequency = $("<td>").text(frequency);
            var tableDataNext = $("<td>").text(nextArrival);
            var tableDataMinutesAway = $("<td>").text(minAway);
            tableRow.append(tableDataName);
            tableRow.append(tableDataDestination);
            tableRow.append(tableDataFrequency);
            tableRow.append(tableDataNext);
            tableRow.append(tableDataMinutesAway);
            $("#table-body").append(tableRow);
        });

    });

});