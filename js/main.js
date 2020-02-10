//******************************* SELECTIONS
// Git repo https://github.com/sitowebveloce/cinema-booking

// Select Rows
const rows = document.querySelectorAll(".row");
// Select Total Cost
const costo = document.querySelector(".costo");
// Select seats number
let sedieTotale = document.querySelector(".sedieTotale");
let postoS = document.querySelector(".postoS");
// Select btn acquista
let acquista = document.querySelector(".btnAcquista");
// Select Film selector
let film = document.getElementById("film");
//********** Sedie select and add event listener
const sedie = document.querySelectorAll(".sedia:not(.occupata)");
// Set declare default value for variables
let removeSeat = false;
let seatRow = 0;
let seatNumber = 0;

// Select Rows number and set the innerHtml
let rowNumb = document.querySelectorAll(".rowNumb");
rowNumb.forEach(element => {
  element.innerHTML = `Fila ${element.id}`;
});

//******************** Update values function

const updateValues = (seatNumber, seatRow, removeSeat) => {
  // Seat selected
  let seatSelected = document.querySelectorAll(".row .sedia.selezionata");
  // console.log(seatSelected[0]);

  // Set array for localStorage
  const localStorageSeats = [...seatSelected].map(seat => {
    return [...sedie].indexOf(seat);
  });
  // Save in local storage
  localStorage.setItem("poltrone", JSON.stringify(localStorageSeats));

  // console.log(seatNumber);
  // If seatNumber undefined
  if (seatNumber && seatRow !== undefined) {
    // Add seat number
    if (!removeSeat) {
      // console.log(removeSeat);
      postoS.innerHTML += ` ${+seatNumber}/${+seatRow} -`;
      // Save in local Storage
      localStorage.setItem("S&&F", postoS.innerHTML);
      // postoF.innerHTML += `${+sediaFila}`;
    } else {
      // console.log(postoS.innerHTML.replace(`${sediaNumero}`, ""));
      // console.log(removeSeat);
      postoS.innerHTML = postoS.innerHTML.replace(
        ` ${seatNumber}/${+seatRow} -`,
        ""
      );
      // Save in local Storage
      localStorage.setItem("S&&F", postoS.innerHTML);
    }
  }
  // Set ticket value
  let ticket = film.value;
  // Change seats selected total number
  sedieTotale.innerHTML = seatSelected.length;
  // Change the price
  costo.innerHTML = seatSelected.length * ticket;
};

//************************** Load data from local storage
// Select all occupied
let sedieNotSelected = document.querySelectorAll(".sedia:not(.selezionata)");
const loadData = () => {
  let poltrone = JSON.parse(localStorage.getItem("poltrone"));
  let movie = localStorage.getItem("movie");
  let price = localStorage.getItem("price");
  let occupate = JSON.parse(localStorage.getItem("occupate"));
  // console.log(poltrone);
  // console.log(movie);
  // console.log(price);
  // console.log(occupate);

  // If not empty loop and add class selected to the seats
  if (poltrone !== null && poltrone.length > 0) {
    sedie.forEach((poltrona, index) => {
      //console.log(typeof poltrona);
      if (poltrone.indexOf(index) > -1) {
        poltrona.classList.add("selezionata");
      }
    });
  }

  // If not empty loop and add class occupaied to the seats
  if (occupate !== null && occupate.length > 0) {
    sedieNotSelected.forEach((poltrona, index) => {
      //console.log(typeof poltrona);
      if (occupate.indexOf(index) > -1) {
        poltrona.classList.add("occupata");
      }
    });
  }

  // Select the movie
  let movieSavedIdx = localStorage.getItem("movie");
  if (movieSavedIdx !== null) {
    film.selectedIndex = movieSavedIdx;
  }
  // Update the seats number and price
  updateValues();

  // Populate the seats info
  let seatsInfo = localStorage.getItem("S&&F");
  postoS.innerHTML = seatsInfo;

  // Set seats occupied
};

// Run function
loadData();

//********** Sedie select and add event listener
const sedieReload = document.querySelectorAll(".sedia:not(.occupata)");

sedieReload.forEach(element => {
  // Set seat number
  element.innerHTML = element.id;
  // Add event listener
  element.addEventListener("click", () => {
    seatRow = element.parentElement.id;
    seatNumber = element.id;

    // Toggle class color
    if (element.classList.value == "sedia") {
      //  console.log(element.classList.value == "sedia selezionata");
      element.classList.add("selezionata");
      // Set True remove variable
      removeSeat = false;
      // Update values
      updateValues(seatNumber, seatRow, removeSeat);
    } else {
      element.classList.remove("selezionata");
      removeSeat = true;
      // Update values
      updateValues(seatNumber, seatRow, removeSeat);
    }
  });
});

//******** Event listener for ticket price

film.addEventListener("change", e => {
  // console.log(e.target.value)
  let ticket = parseInt(e.target.value); // change the type of value from string to number using '+' or 'parseInt'
  // Save movie in the local storage
  // console.log(e.target.selectedIndex);
  localStorage.setItem("movie", `${e.target.selectedIndex}`);
  // Save the price of the single movie in the local storage
  localStorage.setItem("price", `${e.target.value}`);
  // Update values
  updateValues();
});

//************** Btn Acquista event listener
acquista.addEventListener("click", () => {
  let sedia = document.querySelectorAll(".sedia.selezionata");
  // console.log(sedia);

  sedia.forEach(element => {
    // console.log(element);
    element.classList.remove("selezionata");
    element.classList.add("occupata");
    // Clear all fields
    element.innerHTML = "";
    sedieTotale.innerHTML = "";
    costo.innerHTML = "";
    postoS.innerHTML = "";
    // Clear local storage
    localStorage.clear();
    // Set Seat occupaied

    let seatBusySelec = document.querySelectorAll(".row .sedia.occupata");
    // console.logconsole.log(seatBusySelec);

    // Set array for localStorage
    const localStorageSeatsOccupied = [...seatBusySelec].map(seat => {
      return [...sedieNotSelected].indexOf(seat);
    });
    // Save in local storage
    localStorage.setItem("occupate", JSON.stringify(localStorageSeatsOccupied));
  });
});
