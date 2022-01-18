// function comparer(index) {
//   return function (a, b) {
//     var valA = getCellValue(a, index),
//       valB = getCellValue(b, index);
//     return $.isNumeric(valA) && $.isNumeric(valB)
//       ? valA - valB
//       : valA.toString().localeCompare(valB);
//   };
// }
// function getCellValue(row, index) {
//   return $(row).children("td").eq(index).text();
// }

// $("#screensize").click(function () {
//   var table, rows, switching, i, x, y, shouldSwitch;
//   table = document.getElementById("first-table");
//   switching = true;

//   while (switching) {
//     switching = false;
//     rows = table.rows;

//     for (i = 1; i < rows.length - 4; i++) {
//       shouldSwitch = false;
//       x = rows[i].getElementsByTagName("td")[0];
//       y = rows[i + 1].getElementsByTagName("td")[0];
//       if (Number(x.innerHTML) > Number(y.innerHTML)) {
//         shouldSwitch = true;
//         break;
//       }
//     }
//     if (shouldSwitch) {
//       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//       switching = true;
//     }
//   }
//   console.log("hi");
// });

//   var table = $(this).parents("table").eq(0);
//   var rows = table
//     .find("tr:gt(0)")
//     .toArray()
//     .sort(comparer($(this).index()));

// function sort_age() {
//     var table = $("#mytable");
//     var tbody = $("#table1");

//     tbody
//       .find("tr")
//       .sort(function (a, b) {
//         if ($("#age_order").val() == "asc") {
//           return $("td:last", a).text().localeCompare($("td:last", b).text());
//         } else {
//           return $("td:last", b).text().localeCompare($("td:last", a).text());
//         }
//       })
//       .appendTo(tbody);

//     var sort_order = $("#age_order").val();
//     if (sort_order == "asc") {
//       document.getElementById("age_order").value = "desc";
//     }
//     if (sort_order == "desc") {
//       document.getElementById("age_order").value = "asc";
//     }
//   }
