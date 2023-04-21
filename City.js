function getAllCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/listCity",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
<td>${data[i].city}</td>
<td>${data[i].nation}</td>
<td>${data[i].population}</td>
<td>${data[i].area}</td>
<td>${data[i].gdp}</td>
<td>${data[i].description}</td>
<td><button onclick="editCityById(${data[i].id})">Edit</button></td>
<td><button onclick="deleteCityById(${data[i].id})">Delete</button></td>
<td><button onclick="viewById(${data[i].id})">View</button></td>
</tr>`
            }
            document.getElementById("listCity").innerHTML = content;
        }
    })
}

getAllCity();

function CreateCity() {
    event.defaultPrevented;
    let cityName = document.getElementById("cityName").value;
    let nation = document.getElementById("nation").value;
    let population = document.getElementById("population").value;
    let area = document.getElementById("area").value;
    let gdp = document.getElementById("gdp").value;
    let description = document.getElementById("description").value;
    let newCity = {
        city: cityName,
        nation: nation,
        population: population,
        area: area,
        gdp: gdp,
        description: description
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(newCity),
        type: "POST",
        url: "http://localhost:8080/city/create",
        success: function (data) {
            getAllCity();
            alert("Create new city successfully!");
        }
    })
}

function deleteCityById(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/city/delete/" + id,
        success: function (data) {
            getAllCity();
            alert("Delete city successfully!");
        }
    })
}

function viewById(id) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8080/city/find/" + id,
        success: function (data) {
            // console.log(data)
            document.getElementById("viewCity").innerHTML = `<tr>
                                <td>${data.city}</td>
                                <td>${data.nation}</td>
                                <td>${data.population}</td>
                                <td>${data.area}</td>
                                <td>${data.gdp}</td>
                                <td>${data.description}</td>
                            </tr>`;
        }
    })
}

function editCityById(id) {
    event.preventDefault()
    let cityName = document.getElementById("cityName").value;
    let nation = document.getElementById("nation").value;
    let population = document.getElementById("population").value;
    let area = document.getElementById("area").value;
    let gdp = document.getElementById("gdp").value;
    let description = document.getElementById("description").value;
    let newCity = {
        city: cityName,
        nation: nation,
        population: population,
        area: area,
        gdp: gdp,
        description: description
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/city/update/" + id,
        data: JSON.stringify(newCity),
        success: function (data) {
            getAllCity();
            alert("Edit city successfully!");
        }
    })
}