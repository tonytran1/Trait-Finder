var currentTest;
var coreId;
var careerId;
var persuasianId;
var introExtroId;
var superHeroId;
var moviesId;

var publicKey = "Your API publicKey";
var privateKey = "Your API privateKey";

$( document ).ready (function() {
  $(".nav a").on("click", function() {
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });

  $(".restart-btn").on("click", function () {
    getAsessment(currentTest, 1)
  });
});

function getAsessment(testName, restart) {
  currentTest = testName;
  if (idExist(testName) && !restart) {
    loadAssessment(idExist(testName));
    return;
  }
  $.ajax({
    url: 'https://api-sandbox.traitify.com/v1/assessments',
    type: "POST",
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(privateKey));
    },
    data: '{"deck_id": "'+testName+'"}',
    dataType: 'json',
    contentType: 'application/json',

    success: function (result) {
      loadAssessment(result.id, testName);
    },
    error: function () {
      alert("Cannot get data");
    }
    });
}

function idExist(name) {
  switch (name) {
    case 'core':
      if (coreId)
        return coreId;
      break;
    case 'career-deck':
      if (careerId)
        return careerId;
      break;
    case 'persuasion':
      if (persuasianId)
        return persuasianId;
      break;
    case 'super-hero':
      if (superHeroId)
        return superHeroId;
      break;
    case 'introvert-extrovert':
      if (introExtroId)
        return introExtroId;
      break;
    case 'movies':
      if (moviesId)
        return moviesId;
      break;
  }
  return false;
}

function saveId(id, name) {
  switch (name) {
    case 'core':
      coreId = id;
      break;
    case 'career-deck':
      careerId = id;
      break;
    case 'persuasion':
      persuasianId = id;
      break;
    case 'super-hero':
      superHeroId = id;
      break;
    case 'introvert-extrovert':
      introExtroId = id;
      break;
    case 'movies':
      moviesId = id;
  }
}

function loadAssessment(assessmentId, testName) {
  if (testName)
    saveId(assessmentId, testName);
  Traitify.setPublicKey(publicKey);
  Traitify.setHost("https://api-sandbox.traitify.com");
  Traitify.setVersion("v1");
  Traitify.ui.load(assessmentId, ".assessment");
  $(".restart-btn").show();
}
