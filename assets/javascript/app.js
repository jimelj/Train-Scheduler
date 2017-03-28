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
  // console.log(currentTime);
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




$('input').val('');
// ask about if this is the best way to to empty
});

database.on("child_added", function(Snapshot){
  var db = Snapshot.val();

// intresting code..........take it apart
  var firstTimeConverted = moment(db.firstTrain, "hh:mm").subtract(1, "years");
  console.log('FIRSTTIMECONVERTED', firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % db.frequency;
  console.log('TREMAINDER', tRemainder);

  var minutesAway = db.frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesAway);

  var nextTrain = moment().add(minutesAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));






var tr = $('<tr>');
var tcss = db.trainName.replace(/ /g,'').toLowerCase();
console.log('TCSS', tcss);
tr.addClass(tcss);
tr.append('<th>' + db.trainName + '</th>');
tr.append('<th>' + db.destination + '</th>');
tr.append('<th>' + db.frequency + '</th>');
console.log('DB.FREQUENCY', db.frequency);
tr.append('<th>' + moment(nextTrain).format("hh:mm") + '</th>');
tr.append('<th>' + minutesAway  + '</th>');

$("#trainInfo").append(tr);





// console.log(db.firstTrain);
// var fTrain = moment(db.firstTrain).format('HH:mm');
// console.log('FIRSTTRAIN',fTrain);
});
