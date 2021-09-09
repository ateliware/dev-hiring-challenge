window.onload = OnLoad;
var languages;
var usedLangueges = new Map();

var nameElement;
var emailElement;
var btnSubmit;

function OnLoad() {
  nameElement = document.getElementById('name');
  nameElement.onchange = ValidadeForm;

  emailElement = document.getElementById('email');
  emailElement.onchange = ValidadeForm;
  btnSubmit = document.getElementById('submit');
    
  var langsPath = "/static/Assets/languagesList.txt"; // This works
  fetch(langsPath).then(response => {
    return response.text();
  }).then(data => {
    languages = data.split(/\r\n|\n/);
    BuildDropDowns();
    SetInitialOptions();
    RefreshDropDownsValues();
    ValidadeForm();
  });
}

function BuildDropDowns() {
  for (var i = 0; i < 5; i++) {
    var id = "languagesOptions" + (i + 1);
    var wrapper = document.getElementById(id);
    wrapper.onchange = OnChangeDropDownSelection;
    var myHTML = '';
    for (var j = 0; j < languages.length; j++) {
      myHTML += '<option>' + languages[j] + '</option>';
    }
    wrapper.innerHTML = myHTML
  }
}

function SetInitialOptions() {
  for (var i = 0; i < 5; i++) {
    var id = "languagesOptions" + (i + 1);
    var wrapper = document.getElementById(id);
    wrapper.value = languages[i];
    usedLangueges.set(id, languages[i]);
  }
}

function OnChangeDropDownSelection(option) {
  usedLangueges.set(option.target.id, option.target.value);
  RefreshDropDownsValues();
}

function RefreshDropDownsValues() {
  var selectedLangs = '';
  for (var i = 0; i < 5; i++) {
    var id = "languagesOptions" + (i + 1);
    var wrapper = document.getElementById(id);
    var myHTML = '';
    for (var j = 0; j < languages.length; j++) {
      if (languages[j] != wrapper.value && Array.from(usedLangueges.values()).includes(languages[j]))
        continue;
      myHTML += '<option>' + languages[j] + '</option>';
    }
    wrapper.innerHTML = myHTML
    wrapper.value = usedLangueges.get(id);
    selectedLangs += wrapper.value + ' ';
  }

  var langInput = document.getElementById('languages');
  langInput.value = selectedLangs;
}

function ValidadeForm(){    
  var enable = nameElement.value.length >= 2 
  && emailElement.value.includes("@")
  && emailElement.value.length >= 3
  && emailElement.value.split("@")[1] != null
  && emailElement.value.split("@")[1].length > 0
  btnSubmit.disabled = !enable;
}
