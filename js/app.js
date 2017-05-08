(function() {
  "use strict";

  ///////////////////////////////////////////
  // CONSTRUCT // GLOBALS
  ///////////////////////////////////////////
  const ProjectTable = function() {
    // GLOBALS
    const search = document.getElementById('search'); // search button
    const newBtn = document.querySelector('.btn__new'); // new button
    const addBtn = document.querySelector('.btn__add'); // add item button
    const cancelBtn = document.querySelector('.btn__cancel'); // cancel button
    const searchInput = document.getElementById('search-input'); // search input
    let databaseResult = [];
    const newDataBtn = document.getElementById('addNewInput'); // submit btn for new appt
    const dateInput = document.getElementById('newDate'); // date input
    const timeInput = document.getElementById('newTime'); // time input
    const descInput = document.getElementById('newDesc'); // desc input
    const updateDisplay = document.querySelector('.form__add'); // form add/hide
    const updateDisplayCancel = document.querySelector('.btn__cancel'); // form add/hide
    const tables = document.getElementsByTagName('table');
    let searchValue = ''; // input value

    ///////////////////////////////////////////
    // EVENT LISTENERS

    // SHOW/HIDE NEW button
    newBtn.addEventListener('click', (event) => { // search button
      event.preventDefault();
      $(updateDisplay).toggleClass('hidden');
      $(newBtn).addClass('hidden');
    });
    // SHOW/HIDE CANCEL button
    updateDisplayCancel.addEventListener('click', (event) => { // search button
      event.preventDefault();
      $(newBtn).removeClass('hidden');
      $(updateDisplay).toggleClass('hidden');
    });

    // ADD NEW DATA BUTTON
    newDataBtn.addEventListener('click', (event) => { // search button
      event.preventDefault();
      const addValue = {
        "date": newDate.value,
        "time": newTime.value,
        "description": newDesc.value
      }
      // push new values to Local Storage to avoid being over written for now
      let addingLS = JSON.parse(localStorage.getItem('databaseResult')) || [];
      console.log('adding ls ', addingLS);
      addingLS.push(addValue);
      localStorage.setItem('databaseResult', JSON.stringify(addingLS));
      console.log('ls ', localStorage.getItem('databaseResult'));

      clearTables();
      createTable();
      addNewDataForm.reset();
    });
    // SEARCH BUTTON
    search.addEventListener('click', (event) => { // search button
      event.preventDefault();
      searchValue = searchInput.value.toLowerCase(); // grab search value
      // console.log('input for search ', searchValue);
      clearTables();
      if (searchValue) {
        // console.log('searching...');
        createTable();
        searchTable();
      } else {
        createTable();
        // console.log('no search value');
      }
      searchDataForm.reset();
    });

    ///////////////////////////////////////////
    // Other

    // simple time picker - to keep to a format.
    $(timeInput).timepicker();

    // date validation
    $(document).ready(function() {
      $('#newDate').attr('min', todayDate());
    });

    function clearTables() {
      while (tables.length > 0) {
        tables[0].parentNode.removeChild(tables[0]);
      };
    }

    ///////////////////////////////////////////
    // FUNCTION : GET APPOINTMENTS
    ///////////////////////////////////////////

    function getAppointments(arg) {
      const http = new XMLHttpRequest();
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
          const resultData = JSON.parse(http.response);
          // console.log('response', resultData);
          databaseResult = resultData;
          localStorage.setItem('databaseResult', JSON.stringify(databaseResult));
          createTable();
        }
      };
      http.open('GET', `../data/dummy.json`, true);
      http.send();
    }
    // pl version // in progress
    // function getAppointments(arg) {
    //   const http = new XMLHttpRequest();
    //   http.onreadystatechange = function() {
    //     if (http.readyState === 4 && http.status === 200) {
    //       const resultData = JSON.parse(http.response);
    //       // console.log('response', resultData);
    //       databaseResult = resultData;
    //       localStorage.setItem('databaseResult', JSON.stringify(databaseResult));
    //       createTable();
    //     }
    //   };
    //   http.open('GET', `../cgi-bin/test-dbi.pl`, true);
    //   http.send();
    // }
    ///////////////////////////////////////////
    // FUNCTION : SEARCH TABLE
    ///////////////////////////////////////////
    function searchTable() {
      $('tr').show();
      if (searchValue.length === 0) {
        $('tr').show();
        return true;
      } else {
        let table__cells = document.querySelectorAll('td');
        for (let i = 0; i < table__cells.length; i++) {
          let thisCell = table__cells[i];
          if (thisCell.innerHTML.toLowerCase().indexOf(searchValue) === -1) {
            $(thisCell).parent().toggle();
          }
        }
      }
    }

    ///////////////////////////////////////////
    // FUNCTION : CREATE TABLE
    ///////////////////////////////////////////
    function createTable() {
      const myTable = document.createElement('table'),
        tableRow = document.createElement('tr'),
        tableHead = document.createElement('th'),
        tableCell = document.createElement('td');

      // Builds the HTML Table out of json data
      function buildHtmlTable(arr) {
        const table = myTable.cloneNode(false),
          columns = addAllColumnHeaders(arr, table);
        for (let i = 0, maxi = arr.length; i < maxi; ++i) {
          const tr = tableRow.cloneNode(false);
          for (let j = 0, maxj = columns.length; j < maxj; ++j) {
            const td = tableCell.cloneNode(false);
            const cellValue = arr[i][columns[j]];
            td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }
        return table;
      }

      // Adds a header row to the table and returns the set of columns.
      function addAllColumnHeaders(arr, table) {
        const columnSet = [],
          tr = tableRow.cloneNode(false);
        for (let i = 0, l = arr.length; i < l; i++) {
          for (let key in arr[i]) {
            if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
              columnSet.push(key);
              const th = tableHead.cloneNode(false);
              th.appendChild(document.createTextNode(key));
              tr.appendChild(th);
            }
          }
        }
        table.appendChild(tr);
        return columnSet;
      }
      // // Retrieve the object from storage
      let getLocalStorage = localStorage.getItem('databaseResult');

      document.body.appendChild(buildHtmlTable(JSON.parse(getLocalStorage)));
      // use json obj returned from ajax call
    }
    ///////////////////////////////////////////
    // FUNCTION : TODAYS DATE VALIDATION
    ///////////////////////////////////////////
    function todayDate() {
      let today = new Date(); // get the current date
      let dd = today.getDate(); //get the day from today.
      let mm = today.getMonth() + 1; //get the month from today +1 because january is 0!
      let yyyy = today.getFullYear(); //get the year from today
      //if day is below 10, add a zero before (ex: 9 -> 09)
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      // join yyyy mm and dd with a "-" between then
      return yyyy + '-' + mm + '-' + dd;
    }

    // init
    function init() {} // end of init

    return {init: init};
  };
  ///////////////////////////////////////////
  // THE END & run functions
  ///////////////////////////////////////////

  const tableApp = ProjectTable();
  tableApp.init();
})();
