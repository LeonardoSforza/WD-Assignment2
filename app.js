const populateTable = (table, data) => {
  table.innerHTML = "";
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

const table = document.getElementById("first-tbody");

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

const pushAddedToTable = () => {
  for (let i = 0; i < addedContent.length; i++) {
    tableContent.push(addedContent[i]);
  }
  populateTable(table, tableContent);
  addedContent = [];
};

let getData = $.get(
  "https://wt.ops.labs.vu.nl/api22/d8873618",
  function (data, textStatus, jqXHR) {
    for (let i = 0; i < data.length; i++) {
      addedContent.push({
        brand: data[i].brand.toLowerCase(),
        model: data[i].model.toLowerCase(),
        os: data[i].os.toLowerCase(),
        screensize: data[i].screensize,
        image: data[i].image,
      });
    }
    pushAddedToTable();
  }
);

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

// $("#submit-btn").on("click", function () {
//   $.ajax({
//     url: "https://wt.ops.labs.vu.nl/api22/d8873618",
//     method: "POST",
//     data:
//   });
// });

$("#submit-btn").on("click", function () {
  let addedContent = $.post(
    "https://wt.ops.labs.vu.nl/api22/d8873618",
    function (data, textStatus, jqXHR) {
      for (let i = 0; i < data.length; i++) {
        tableContent.push({
          brand: data[i].brand,
          model: data[i].model,
          os: data[i].os,
          screensize: data[i].screensize,
          image: data[i].image,
        });
      }
      populateTable(table, tableContent);
    }
  );

  console.log(tableContent);
});

$("#reset-btn").on("click", function () {
  $.ajax({
    url: "https://wt.ops.labs.vu.nl/api22/d8873618/reset",
    method: "GET",
    // data: requestData,
    // dataType: "json",
  });
  // $.get("https://wt.ops.labs.vu.nl/api22/d8873618/reset");
});
