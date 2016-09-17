var publicKey;
var privateKey;

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
  window.currentTest = testName;
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
      return localStorage.getItem('coreId');
    case 'career-deck':
      return localStorage.getItem('careerId');
    case 'persuasion':
      return localStorage.getItem('persuasianId');
    case 'super-hero':
      return localStorage.getItem('superHeroId');
    case 'introvert-extrovert':
      return localStorage.getItem('introExtroId');
    case 'movies':
      return localStorage.getItem('moviesId');
    default:
      return false;
  }
}

function saveId(id, name) {
  switch (name) {
    case 'core':
      localStorage.setItem('coreId', id);
      break;
    case 'career-deck':
      localStorage.setItem('careerId', id);
      break;
    case 'persuasion':
      localStorage.setItem('persuasianId', id);
      break;
    case 'super-hero':
      localStorage.setItem('superHeroId', id);
      break;
    case 'introvert-extrovert':
      localStorage.setItem('introExtroId', id);
      break;
    case 'movies':
      localStorage.setItem('moviesId', id);
  }
}

function loadAssessment(assessmentId, testName) {
  if (testName) {
    saveId(assessmentId, testName);
  }
  Traitify.setPublicKey(publicKey);
  Traitify.setHost("https://api-sandbox.traitify.com");
  Traitify.setVersion("v1");
  Traitify.ui.load(assessmentId, ".assessment");
  $(".restart-btn").show();
}
