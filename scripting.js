// For table 2

// This allowes user to click on the heading of the second table to re-order content
$(".tableTwoClickable").on("click", function () {
  const column = $(this).data("column");
  const order = $(this).data("order");

  if (order == "desc") {
    $(this).data("order", "asc");
    shippingContent = shippingContent.sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
  } else {
    $(this).data("order", "desc");
    shippingContent = shippingContent.sort((a, b) =>
      a[column] < b[column] ? 1 : -1
    );
  }
  populateTableTwo(tableTwo, shippingContent);
});

// This functional is called to add content on the second table
const populateTableTwo = (a, b) => {
  tableTwo.innerHTML = "";
  for (let i = 0; i < b.length; i++) {
    const row = `<tr>
                    <td>${b[i].country}</td>
                    <td>${b[i].cost}</td>
                    <td>${b[i].time}</td>
                  </tr>`;
    a.innerHTML += row;
  }
};

const tableTwo = document.getElementById("second-tbody");

// This is the content which will be inserted in the second table.
let shippingContent = [
  {
    country: "Europe",
    cost: 5,
    time: 1,
  },
  {
    country: "UK",
    cost: 8,
    time: 2,
  },
  {
    country: "America",
    cost: 12,
    time: 5,
  },
  {
    country: "Australia",
    cost: 15,
    time: 8,
  },
  {
    country: "Asia",
    cost: 20,
    time: 3,
  },
];

populateTableTwo(tableTwo, shippingContent);

//  ***************************************************************************
// For table 1

const resetInputValue = () => {
  document.getElementById("Brand").value = "";
  document.getElementById("Model").value = "";
  document.getElementById("OS").value = "";
  document.getElementById("Screensize").value = "";
  document.getElementById("Image").value = "";
};

const startProcess = () => {
  table.innerHTML = "";
  addedContent = [];
  outputContent = [];
  for (let i = 0; i < tableContent.length; i++) {
    outputContent.push(tableContent[i]);
  }
  getData(addedContent);
};

const populateTable = (table, data) => {
  for (let i = 0; i < data.length; i++) {
    const row = `<tr>
                      <td class="text-lower">${data[i].brand}</td>
                      <td class="text-lower">${data[i].model}</td>
                      <td class="text-lower">${data[i].os}</td>
                      <td>${data[i].screensize}</td>
                      <td>
                          <img src="${data[i].image}">
                      </td>
                  </tr>`;
    table.innerHTML += row;
  }
};

const pushData = (store) => {
  for (let i = 0; i < store.length; i++) {
    outputContent.push(store[i]);
  }
};

// Function to get data from the server and add it to the table
const getData = (store) => {
  $.get("https://wt.ops.labs.vu.nl/api22/d8873618", function (data) {
    for (let i = 0; i < data.length; i++) {
      store.push({
        brand: data[i].brand.toLowerCase(),
        model: data[i].model.toLowerCase(),
        os: data[i].os.toLowerCase(),
        screensize: data[i].screensize,
        image: data[i].image,
      });
    }
  }).done(function () {
    for (let i = 0; i < store.length; i++) {
      outputContent.push(store[i]);
    }
    populateTable(table, outputContent);
  });
};

const table = document.getElementById("first-tbody");

// this variable contains content which will be inserted into the table on top of the server content
let tableContent = [
  {
    brand: "apple",
    model: "iphone 13",
    os: "ios",
    screensize: 6.68,
    image:
      "https://www.notebookcheck.nl/uploads/tx_nbc2/AppleiPhone13ProMax.jpg",
  },
  {
    brand: "apple",
    model: "ipad pro",
    os: "ios",
    screensize: 12.9,
    image:
      "https://static.iphoned.nl/orca/products/9569/apple-ipad-pro-2021.jpg",
  },
  {
    brand: "samsung",
    model: "samsung galaxy z flip3",
    os: "android",
    screensize: 6.7,
    image:
      "https://www.mytrendyphone.nl/images/Samsung-Galaxy-Z-Flip3-5G-256GB-Phantom-Black-8806092563636-19082021-01-p.jpg",
  },
  {
    brand: "apple",
    model: "macBook pro",
    os: "ios",
    screensize: 16,
    image: "https://static.iphoned.nl/orca/products/9402/apple-macbook-pro.jpg",
  },
];

let addedContent = [];
let outputContent = [];

startProcess();

// Allows user to send information they inserted into the text-fields and update the content in table 1.
$("#submit-btn").on("click", function () {
  const inputValues = {
    brand: document.getElementById("Brand").value,
    model: document.getElementById("Model").value,
    os: document.getElementById("OS").value,
    screensize: document.getElementById("Screensize").value,
    image: document.getElementById("Image").value,
  };
  $.ajax({
    url: "https://wt.ops.labs.vu.nl/api22/d8873618",
    method: "POST",
    data: inputValues,
    dataType: "json",
  }).done(function () {
    const inputValuesList = [];
    inputValuesList.push(inputValues);
    addedContent.push(inputValues);
    outputContent.push(inputValues);
    populateTable(table, inputValuesList);
    resetInputValue();
  });
});

// Gives the reset button functionality
$("#reset-btn").on("click", function () {
  $.ajax({
    url: "https://wt.ops.labs.vu.nl/api22/d8873618/reset",
    method: "GET",
  }).done(function () {
    startProcess();
  });
});

// Allows user to sort table 1 by clicking on the headers
$(".tableOneClickable").on("click", function () {
  const column = $(this).data("column");
  const order = $(this).data("order");

  if (order == "desc") {
    $(this).data("order", "asc");
    outputContent = outputContent.sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
  } else {
    $(this).data("order", "desc");
    outputContent = outputContent.sort((a, b) =>
      a[column] < b[column] ? 1 : -1
    );
  }
  table.innerHTML = "";
  populateTable(table, outputContent);
});
