// Initialize Firebase
var config = {
    apiKey: "AIzaSyBNIB1JTWPWEnyzyjLkksD9Phd0w-IjsVw",
    authDomain: "nyctrains-2de45.firebaseapp.com",
    databaseURL: "https://nyctrains-2de45.firebaseio.com",
    storageBucket: "nyctrains-2de45.appspot.com",
    messagingSenderId: "799888527423"
};
firebase.initializeApp(config);

var database = firebase.database().ref();
var nextArrival;
var mAway = nextArrival - currentTime;
var currentTime;




function update() {
  currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log(currentTime);
  $('.cTime').html(currentTime);
}
setInterval(update, 1000);


$('#submitTrain').on('click', function() {
    event.preventDefault();

    var trainName = $('#name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrain = $('#firstTrain').val().trim();
    var frequency = $('#frequency').val().trim();

    console.log(trainName);
    database.push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency

    });

});

database.on("child_added", function(Snapshot){
  var db = Snapshot.val();
var tr = $('<tr>');
tr.append('<th>' + db.trainName + '</th>');
tr.append('<th>' + db.destination + '</th>');
tr.append('<th>' + db.frequency + '</th>');
tr.append('<th>' + "" + '</th>');
tr.append('<th>' + ""  + '</th>');

$("#trainInfo").append(tr);

});
