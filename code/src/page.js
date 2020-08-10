function loadData() {
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            data = JSON.parse(request.responseText);
            let holder = document.getElementById('holder');
            holder.innerHTML = '';
            data.forEach(element => {
                holder.innerHTML += '<div class="vertical-menu">'+ '<a onclick="select(this.parentElement)">' + element.title + '</a><br>' + '<a> written by : '+element.authors+'</a><br>'+ '<a>  £'
                +element.purchase_price+'</a><br>'+ '<a>Published by : '+element.publisher_name+ "<br>"+element.published_date+'</a><br>'+'<isbn> ISBN :'+element.ISBN+ '</isbn><br></div><br>';
            });
            console.log(data);
        }
    }
    request.open("GET", "/a", true);
    request.send(null);
}
function loadSmall() {
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            data = JSON.parse(request.responseText);
            let holder = document.getElementById('holder');
            holder.innerHTML = '';
            data.forEach(element => {
                holder.innerHTML += '<div class="vertical-menu-small">'+ '<a>' + element.title + '</a><br>' + '<a> written by : '+element.authors+'</a><br></div>';
            });
            console.log(data);
        }
    }
    request.open("GET", "/a", true);
    request.send(null);
}

function requestISBN(isbn) {
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            let rev = document.getElementById('rev');
                        rev.innerHTML = '';
                        data.forEach(element => {
                            rev.innerHTML += '<div>'+ '<a>' + element.rating + ' STARS OUT OF 5!</a><br>' + '<a>'+element.full_name+'</a><br><a>'+element.title+'</a><br><a>'+element.comment+'</a><br><br></div>';
                        });
            console.log(data);
        }
    }
    request.open("GET", "/b/" + isbn, true);
    request.send(null);
}


function select(element) {
    let isbn = element.getElementsByTagName('isbn')[0].innerText;
    isbn = isbn.split(':')[1];
    requestISBN(isbn);
}

