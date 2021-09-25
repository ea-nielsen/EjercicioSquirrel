fetch(
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"
)
  .then((response) => response.json())
  .then((data) => {
    let tbodyRef = document.getElementById("contenidoT1");
    let tbodyRef2 = document.getElementById("contenidoT2");
    let dict = {};
    for (let i = 0; i < data.length; i++) {
      let newRow = tbodyRef.insertRow(i);
      let cel1 = newRow.insertCell(0);
      cel1.style.fontWeight = "bold";
      let cel2 = newRow.insertCell(1);
      let cel3 = newRow.insertCell(2);
      cel1.innerHTML = i + 1;
      let events = "";
      for (let j = 0; j < data[i].events.length; j++) {
        if (j == data[i].events.length - 1) {
          events += data[i].events[j];
        } else {
          events += data[i].events[j] + ", ";
        }
        if (!(data[i].events in dict)) {
          dict[data[i].events[j]] = { TP: 0, TN: 0, FP: 0, FN: 0 };
        }
      }
      cel2.innerHTML = events;
      cel3.innerHTML = data[i].squirrel;
      if (data[i].squirrel == true) {
        newRow.style.background = "#ffc4cc";
      }
    }
    for (let i = 0; i < data.length; i++) {
      for (const key in dict) {
        let encontrado = false;
        for (let j = 0; j < data[i].events.length; j++) {
          if (key == data[i].events[j]) {
            encontrado = true;
            if (data[i].squirrel == true) {
              dict[key]["TP"] = dict[key]["TP"] + 1;
            } else {
              dict[key]["FN"] = dict[key]["FN"] + 1;
            }
          }
        }
        if (encontrado == false) {
          if (data[i].squirrel == true) {
            dict[key]["FP"] = dict[key]["FP"] + 1;
          } else {
            dict[key]["TN"] = dict[key]["TN"] + 1;
          }
        }
      }
    }
    console.log(dict);

    for (let i = 0; i < Object.keys(dict).length; i++) {
      let newRow = tbodyRef2.insertRow(i);
      let cel1 = newRow.insertCell(0);
      let cel2 = newRow.insertCell(1);
      let cel3 = newRow.insertCell(2);
      let eventActual = Object.keys(dict)[i];
      cel2.innerHTML = eventActual;
      let arriba =
        dict[eventActual]["TP"] * dict[eventActual]["TN"] -
        dict[eventActual]["FP"] * dict[eventActual]["FN"];
      let abajo = Math.sqrt(
        (dict[eventActual]["TP"] + dict[eventActual]["FP"]) *
          (dict[eventActual]["TP"] + dict[eventActual]["FN"]) *
          (dict[eventActual]["TN"] + dict[eventActual]["FP"]) *
          (dict[eventActual]["TN"] + dict[eventActual]["FN"])
      );
      let mcc = arriba / abajo;
      console.log(mcc);
      cel3.innerHTML = mcc;
      cel1.innerHTML = i + 1;
      if (i == Object.keys(dict).length - 1) {
        sortTableByColumn(document.querySelector("table2"), 2, false);
      }
    }
    function sortTableByColumn(table, column, asc = true) {
      const dirModifier = asc ? 1 : -1;
      const tBody = document.getElementById("contenidoT2");
      const rows = Array.from(tBody.querySelectorAll("tr"));

      const sortedRows = rows.sort((a, b) => {
        const aColText = a
          .querySelector(`td:nth-child(${column + 1})`)
          .textContent.trim();
        const bColText = b
          .querySelector(`td:nth-child(${column + 1})`)
          .textContent.trim();

        return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
      });

      while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
      }
      tBody.append(...sortedRows);
    }
    for (let i = 0; i < Object.keys(dict).length; i++) {
    let tBody = document.getElementById("contenidoT2");
    tBody.rows[i].cells[0].innerHTML = i+1;
    }
  });
