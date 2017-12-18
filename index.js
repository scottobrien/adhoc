(function() {
  var elAge = document.getElementsByName('age');
  var elRel = document.getElementsByName('rel');
  var elSmoker = document.getElementsByName('smoker');
  var elDebug = document.getElementsByClassName('debug')[0];
  var btnSubmit = document.querySelectorAll('button[type=submit]')[0];
  var btnAdd = document.getElementsByClassName('add')[0];

  btnAdd.setAttribute('disabled', true);
  btnSubmit.setAttribute('disabled', true);

  var person = {};
  var people = [];

  var elList = document.createElement('ul');
  document.body.insertBefore(elList, elDebug);

  // Reg Number validation
  function regNum(str) {
    var regExp =  /^[1-9][0-9]*$/;
    return regExp.test(str);
  }
  // Event Age validation
  elAge[0].addEventListener('blur', function(e) {
    if (regNum(e.target.value) && (elRel[0].value !== undefined && elRel[0].value !== '')) {
      btnAdd.removeAttribute('disabled');
      return;
    } 
    btnAdd.setAttribute('disabled', true);
  });
  // Event Rel validation
  elRel[0].addEventListener('change', function(e) {
    if (regNum(elAge[0].value) && (e.target.value !== undefined && e.target.value !== '')) {
      btnAdd.removeAttribute('disabled');
      return;
    }
    btnAdd.setAttribute('disabled', true);
  });
  // Submit validation
  function submitEnableDisable() {
    if (people.length) {
      btnSubmit.removeAttribute('disabled');
      return;
    }
    btnSubmit.setAttribute('disabled', true);
  }

  // Events add/submit
  btnAdd.addEventListener('click', addPerson);
  btnSubmit.addEventListener('click', submitPeople);

  function addPerson(e) {
    e.preventDefault();
    person.id = uid();
    person.age = elAge[0].value;
    person.rel = elRel[0].value;
    person.smoker = elSmoker[0].checked;
    people.push(person);
    submitEnableDisable();
    listBuilder(person);
    resetForm();
  }

  function submitPeople(e) {
    e.preventDefault();
    elDebug.innerHTML = JSON.stringify(people);
    elDebug.style.display = 'inline-block';
  }

  function listBuilder(obj) {
    obj.smoker = (obj.smoker) ? 'smoker' : 'non-smoker'; // make more legible
    var elPerson = document.createElement('li');
    var elRemoveLink = document.createElement('a');
    elRemoveLink.setAttribute('href', '');
    elRemoveLink.id = obj.id;
    elRemoveLink.innerHTML = 'remove';
    elPerson.innerHTML = obj.age + ', ' + obj.rel + ', ' + obj.smoker + ' | ';
    elPerson.appendChild(elRemoveLink);
    elList.appendChild(elPerson);
    elRemoveLink.addEventListener('click', removePerson);
  }

  function resetForm() {
    elAge[0].value = '';
    elRel[0].selectedIndex = 0;
    elSmoker[0].checked = false;
    person = {};
    btnAdd.setAttribute('disabled', true);
  }

  function removePerson(e) {
    e.preventDefault();
    for (var i = 0; i < people.length; i++) { // remove from arr
      if (people[i].id === e.target.id) {
        people.splice(i, 1);
      }
    }
    e.target.parentNode.parentNode.removeChild(e.target.parentNode); // remove from dom
    submitEnableDisable();
  }

  // Create unique id:
  function uid() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
})();
