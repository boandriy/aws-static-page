/*global Diaries _config*/

var Diaries = window.Diaries || {};
Diaries.map = Diaries.map || {};

(function myDiaryWrapper($) {
    let diaryField = document.getElementById('diaryInput');
    let diaryButton = document.getElementById("diaryButton");
    let getDiaryButton = document.getElementById("getDiaryInput");

    diaryButton.onclick = function() {
        if(diaryField.value === '' || diaryField.value.length < 3){
            alert('please fill in the diary input field. At least one word');
        }else{
            // alert("calling some awsome function! also clearring the field for you ;)");
            putTheDiaryInput(diaryField.value);
            diaryField.value = '';
        }
    };

    getDiaryButton.onclick = function() {
        getDiaryInputs();
    };

    var authToken;
    Diaries.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
            getDiaryInputs();
        } else {
            window.location.href = '/index.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/index.html';
    });

    function putTheDiaryInput(input){
        $.ajax({
            method: 'POST',
            url: _config.api.diaryInput + '/diary',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                diaryInput: {
                    inputValue: input,
                    dateTime: new Date().toISOString(),
                }
            }),
            contentType: 'application/json',
            success: completeDiaryRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error : ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('Post error occured :\n' + jqXHR.responseText);
            }
        });
    }
    function completeDiaryRequest (result){
        console.log('Response received from API: ', result);
        getDiaryInputs();
    }


    function getDiaryInputs(){
        $.ajax({
            method: 'GET',
            url: _config.api.diaryInput + '/diary',
            headers: {
                Authorization: authToken
            },
            success: completeDiaryGetRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error : ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                // alert('Post error occured :\n' + jqXHR.responseText);
            }
        });
    }
    function completeDiaryGetRequest (result){
        $( ".fetchedData" ).remove();
        let resultArray = result.response.Items;
        resultArray.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.RequestTime) - new Date(a.RequestTime);
        });
        resultArray.forEach((record) => {
            console.log('record',record);
            displayUpdate(record.RequestTime, record.User, record.DiaryInput);
        })
    }





    // Register click handler for #request button
    $(function onDocReady() {
        $('#request').click(handleRequestClick);
        $('#signOut').click(function() {
            Diaries.signOut();
            alert("You have been signed out.");
            window.location = "index.html";
        });

        Diaries.authToken.then(function updateAuthMessage(token) {
            if (token) {
                // displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                // $('.authToken').text(token);
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });

    function handleRequestClick(event) {
        var pickupLocation = Diaries.map.selectedPoint;
        event.preventDefault();
        requestUnicorn(pickupLocation);
    }


    function formatDate(date) {
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' +  hour + ':' + minutes + ':' + seconds;
    }

    function displayUpdate(requestTime,username, diaryInput) {
        let parsedUsername = username.substr(0, username.indexOf('@'));
        let formattedTime = formatDate(new Date(requestTime));

        $('#diaryNotes').append($('<li class="fetchedData">' +
            '<span class="date-field">' + formattedTime +'</span>' +
            '<span class="user-field">' + parsedUsername + '</span>' +
            '<span class="diary-field">' + diaryInput + '</span>' +
            '</li>'));
    }

}(jQuery));
