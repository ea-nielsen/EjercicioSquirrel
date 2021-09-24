 fetch('https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json')
.then(response => response.json())
.then(data => {    
    let trTag;
    for (let i = 0; i < data.length; i++) {
        trTag = document.createElement("tr");
        thIndex = document.createElement("th");
        thIndex.textContent = i;
        let events = "";
        for (let j = 0; j < data[i].events.length; j++) {
            events += data[i].events[j] +",";
        }
        console.log(events);
    }
  
});