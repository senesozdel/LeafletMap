
// 38. enlem , 30. boylamı gösteren bir leaflef hatisaı oluştur.

var map = L.map('map').setView([38, 30], 5);

// Oluşturulan haritaya özellikler ekle 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// bir state tanımla

var dataState;

// Varolan verileri geitrmek için metot yaz ve fetch kullan. Gelen veriyi state'te tutmak için callback kullan.

function getData(callbackFunction) {
    fetch("https://localhost:7277/api/Location").then(res => res.json()).then(data => callbackFunction(data))

}

// Haritada bulunan merkez noktasını veri tabanına gönderir. 

function postData(par) {
    console.log(par)
    fetch('https://localhost:7277/api/Location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(par)
    }).then(res => res.json()).then(data => console.log(data))

    //Metot çalıştıktan sonra sayfa render olur.

    location.reload()
   

}

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hour = String(currentDate.getHours()).padStart(2, '0');
    const minute = String(currentDate.getMinutes()).padStart(2, '0');
    const second = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;

    return formattedDate;
}


function getMapCenter() {
    let data;
    var addedDate = getCurrentDate();

    var centerPoint = map.getCenter();

    var circle = L.circle([centerPoint.lat, centerPoint.lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100500
    }).addTo(map);



    data = { lat: `${centerPoint.lat}`, lng: `${centerPoint.lng}`, datetime: `${addedDate}` }

    setTimeout(function(){
        postData(data)
    },700)


}


// yeni kayıt edilen konumları dinamik olarak listelemek için kullanılır. 

function listElements(dataState) {
    var dataList = document.getElementById("dataList")

    //Gelen verinin her bir key değeri döndürülerek liste oluşturulur ve append edilir.

    for (let i = 0; i < dataState.length; i++) {

        const list = document.createElement("ul")
        list.className = "d-flex  gap-2 flex-column border p-2 m-0 bg-info-subtle"
        list.id = i
        for (let key in dataState[i]) {
            console.log(key)
            const value = dataState[i][key];
            const listcontent = document.createTextNode(`${key}: ${value}`);
            const listItem = document.createElement("li");
            listItem.className = "list-unstyled"
            listItem.appendChild(listcontent)
            list.appendChild(listItem)
        }

        const btnWrapper = document.createElement("div")
        btnWrapper.className = "d-flex gap-2 justify-content-center"

        const gotoButtonText = document.createTextNode("Mark the Point")
        const gotoButton = document.createElement("button")
        gotoButton.className = "btn btn-success "

        var marker;
        var markers = [];

        //Mark the point butonuna basıldığında eğer auynı konumu gösteren bir marker varsa o kaldırlır yoksa haritaya yeni marker eklenir.
       
        gotoButton.onclick = function () {
            const latitude = dataState[i].lat;
            const longitude = dataState[i].lng;
            marker = L.marker([latitude, longitude]);
        
            let markerExists = false;
        
            // markers dizisindeki her marker'ı kontrol et
            for (let k = 0; k < markers.length; k++) {
                if (markers[k].getLatLng().lat === marker.getLatLng().lat && markers[k].getLatLng().lng === marker.getLatLng().lng) {
                    // Eğer marker zaten varsa, haritadan kaldır ve markers dizisinden çıkar
                    map.removeLayer(markers[k]);
                    markers.splice(k, 1); // markers dizisinden k. elemanı çıkar
                    markerExists = true;
                    break; // Döngüyü sonlandır
                }
            }
        
            if (!markerExists) {
                // Eğer marker yoksa, haritaya ekle ve markers dizisine ekle
                marker.addTo(map);
                markers.push(marker);
            }
        };
        
        console.log(markers)

        const deleteButtonText = document.createTextNode("Delete")
        const deleteButton = document.createElement("button")
        deleteButton.className = "btn btn-danger "

        // Delete butonuna tıklayınca marker haritadan kaldırılır ve listeden seçilen eleman kaldırılır
        deleteButton.onclick = function () {
            list.className = "d-none"
            map.removeLayer(marker)

        }

        gotoButton.appendChild(gotoButtonText)
        btnWrapper.appendChild(gotoButton)
        deleteButton.appendChild(deleteButtonText)
        btnWrapper.appendChild(deleteButton)
        list.appendChild(btnWrapper)
        dataList.appendChild(list)
    }

}

// kayıt edilen verileri indirmek için kullanılır

function downloadJSON(data, filename) {
    var json = JSON.stringify(data);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}


//sayfa render olunca çalışcak metotlar bulunmaktadır

window.onload = getData(function (data) {
    dataState = data;
    console.log(dataState);
    listElements(dataState)
    document.getElementById("downloadButton").addEventListener("click", function() {
        downloadJSON(dataState, "locationData.json");
    });

});


