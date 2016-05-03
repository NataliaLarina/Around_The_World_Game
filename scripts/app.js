console.log('js is reading the page right now');
var answerArray = [];
var myCountries = [];
var country;

var score = 0;
var correct = 0;
var wrong = 0;
var round = 0;

function gameEnd() {
  alert('Game over. Your score is ' + score);
}

function Country(name, capital) {
    console.log('new Country()');
    this.name = name;
    this.capital = capital;
}

function createButton(country) {
  console.log('createButton');
  var button = document.createElement("button");
  button.innerHTML = country;
  button.addEventListener("click", function(){
    console.log('btn is working')
    if ($(this).text() === compare(myCountries)){
      scoreboard()
      correctboard()
      console.log('the if statement hit: ' + score + " this is the score")
    } else  {
      wrongboard()
      console.log('the else statement hit')
    }
  }, false);
  return button;
}

function startNewGameRound() {
  console.log('startNewGameRound()')
  $('.country').empty()
  country = randomCountry();
  console.log(country);
  $('.answers').empty();
}

function shuffleArray(array) {
  console.log('shuffleArray');
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function randomCountry() {
  console.log('randomCountry');
  var countrySelected = myCountries[Math.floor(Math.random() * myCountries.length)];
  return countrySelected;
}


function appendArray(element){
  console.log('appendArray');
  answerArray = [];
  var countryAnswerArray = [];
  for (var i = 0; i < 5; i++) {
    var randomCtry = randomCountry();
    countryAnswerArray.push(randomCtry);
    answerArray.push(createButton(randomCtry.capital));
  }
  var myArray = shuffleArray(answerArray);
  $('.country').text(countryAnswerArray[0].name);
  for (var i = 0; i < 4; i++){
    $(element).append(myArray[i]);
  }
  return answerArray;
}


function randomCapital() {
  console.log('randomCapital');
  var capitalSelected = myCountries[Math.floor(Math.random() * myCountries.length)];
  console.log(capitalSelected)
  return capitalSelected.capital;
}

function scoreboard(){
  console.log('scoreboard()');
  score++;
  $('.score').text(score)
  $('.country').empty()
  $('.answers').empty();
  appendArray($('.answers'));
}

function correctboard(){
  console.log('correctboard()');
  correct++
  $('.correct').text(correct)
}

function wrongboard(){
  console.log('wrongBoard()');
  wrong++;
  $('.wrong').text(wrong)
}

function compare(countries){
  console.log('compare()');

  for (var i = 0; i < myCountries.length; i++) {
    if (countryChosen() == countries[i].name) {
      return countries[i].capital
    }
 }
}

function randomIndex () {
  console.log('randomIndex');
   Math.round(Math.random() * 4)
}

function countryChosen(){
  console.log('countryChosen()');
  return $('.country').text();
}


$(document).ready(function(){
  console.log('document.ready');

  var countries = {
    type: 'get',
    dataType: 'json',
    url: 'https://restcountries.eu/rest/v1/all',
    success: function(countries) {
      console.log('ajax finished');


      countries.forEach(function(country, i) {
        myCountries.push(new Country(country.name, country.capital))
      });
    },

    error: function(error) {
      alert(error);
    }
}

 $.ajax(countries).done(function(data) {

    $('.play').click(function(){
      console.log('.play click');
      $('.country').empty()
      $('.answers').empty();
      appendArray($('.answers'));
      console.log("answerArray")



    var timeLeft = 60;
    var oneSecondInMilliseconds = secondsToMilliseconds(1);

function secondsToMilliseconds(time) {
  return time * 1000;
}

function everySecond() {
    timeLeft--;
    if (timeLeft === 0 || timeLeft <= 0) {
      clearInterval(timer);
      gameEnd();
    } else {

    }
    $('.timer').html(timeLeft);
    console.log(timeLeft);
  }
var timer = setInterval(everySecond, oneSecondInMilliseconds);
});


    $('.next').click(function() {
      console.log('.next click');

      $('.country').empty();
      console.log('empty');

      $('.answers').empty();
      appendArray($('.answers'));
      console.log("answerArray");
    });

  });
});
