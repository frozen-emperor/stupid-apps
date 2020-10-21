"use strict";
$(document).ready(function () {
    //console.log(`document load state : ${this.readyState}`);

     getRandomUsers(3);

    $('#search-form').on('submit', (event) => {
        let inputUsername = $('#search-form #username-input').val();
        //console.log(inputUsername);

        searchUserByUsername(inputUsername);

        //stop form from reseting input as usual
        event.preventDefault();
    });

    function getRandomUsers(n) {
        let ids = [];
        while (ids.length < n) {
            let i = Math.floor(Math.random() * 100) + 1;
            if (ids.indexOf(i) === -1) ids.push(i);
        }
        console.log(ids);

        ids.forEach((id) => {
            $.get(`https://api.github.com/users/${id}`, function (userObject) {
                console.log(userObject);

                if (userObject) {
                    let user = loadUserDataHtml(userObject);
                    console.log(user);
                    $('#user-list').append(user);
                }

            }).fail(function (err) {
                console.log("user not found");
            });
        });
    }

    function searchUserByUsername(username) {
        //console.log(username);
        $('.user-data,#error').remove();

        $.get(`https://api.github.com/users/${username}`, function (userObject) {
            console.log(userObject);

            if (userObject) {
                let user = loadUserDataHtml(userObject);
                console.log(user);
                $('#user-list').append(user);
                $('#result-heading').html('Searched user is :');
            }

        }).fail(function (err) {
            let errorHtml = generateErrorHtml();
            $('#user-list').append(errorHtml);
            console.log("user not found");
        });
    }

    function generateErrorHtml() {
        let _url = "./images/error.png";
        return `
            <img id="error" class="error mb-3 d-block img-fluid mx-auto border border-dark" src="${_url}"
                alt="">`;
    }

    function loadUserDataHtml(userObject) {
        //let person = new Object();
        let avatar_url = userObject.avatar_url || "no image";
        let username = userObject.login || "no username";
        let profile_url = userObject.html_url;
        let public_repos = userObject.public_repos || 0;
        let id = userObject.id;
        let dateOfCreation = userObject.created_at.slice(0, 10);
        let userHtmlDiv =
        `
        <div class="user-data p-3 border border-dark rounded mb-3">
                <div class="row">
                    <div class="col-sm-2">
                        <img class="img-thumbnail" alt="..."
                            src="${avatar_url}">
                    </div>
                    <div class="col-sm-4">
                        <ul>
                            <li>
                                <p class="mb-0">
                                    <span class="font-weight-bold">
                                        User id :
                                    </span>
                                    ${id}
                                </p>
                            </li>
                            <li>
                                <p class="mb-0">
                                    <span class="font-weight-bold">
                                        Username :
                                    </span>
                                    ${username}
                                </p>
                            </li>
                            <li>
                                <p class="mb-0">
                                    <span class="text-dark font-weight-bold">
                                        Number of public repos :
                                    </span>
                                    ${public_repos}
                                </p>
                            </li>
                            <li>
                                <p class="mb-0">
                                    <span class="font-weight-bold">
                                        Created at :
                                    </span>
                                    ${dateOfCreation}
                                </p>
                            </li>
                            <li>
                                <a href="${profile_url}" class="stretched-link">
                                    <span class="text-dark font-weight-bold">Profile : </span>
                                    view my profile on github</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
        return userHtmlDiv;
    }
});