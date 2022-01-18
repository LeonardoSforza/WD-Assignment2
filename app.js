const populateTable = (table, data) => {
  table.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const row = `<tr>
                            <td>${data[i].brand}</td>
                            <td>${data[i].model}</td>
                            <td>${data[i].os}</td>
                            <td>${data[i].screensize}</td>
                            <td>
                                <img src="${data[i].image}">
                            </td>
                        </tr>`;
    table.innerHTML += row;
  }
};

let tableContent = [
  {
    brand: "apple",
    model: "iPhone 13",
    os: "ios",
    screensize: "6.68",
    image:
      "https://www.notebookcheck.nl/uploads/tx_nbc2/AppleiPhone13ProMax.jpg",
  },
  {
    brand: "apple",
    model: "iPad Pro",
    os: "ios",
    screensize: "12.9",
    image:
      "https://static.iphoned.nl/orca/products/9569/apple-ipad-pro-2021.jpg",
  },
  {
    brand: "Samsung",
    model: "Samsung Galaxy Z Flip3",
    os: "Android",
    screensize: "6.7",
    image:
      "https://www.mytrendyphone.nl/images/Samsung-Galaxy-Z-Flip3-5G-256GB-Phantom-Black-8806092563636-19082021-01-p.jpg",
  },
  {
    brand: "apple",
    model: "MacBook Pro",
    os: "ios",
    screensize: "16",
    image: "https://static.iphoned.nl/orca/products/9402/apple-macbook-pro.jpg",
  },
];

const table = document.getElementById("first-tbody");

populateTable(table, tableContent);

$("th").on("click", function () {
  const column = $(this).data("column");
  const order = $(this).data("order");

  if (order == "desc") {
    $(this).data("order", "asc");
    tableContent = tableContent.sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
  } else {
    $(this).data("order", "desc");
    tableContent = tableContent.sort((a, b) =>
      a[column] < b[column] ? 1 : -1
    );
  }

  populateTable(table, tableContent);
});
