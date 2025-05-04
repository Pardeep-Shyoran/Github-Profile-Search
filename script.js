let searchBtn = document.querySelector(".search");
let usernameInp = document.querySelector(".usernameinp")
let profileCard = document.querySelector(".profile-card");


function getProfileData(username) {
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if (!raw.ok) throw new Error("User not Found ...");
        return raw.json();
    });
}

function getRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) => {
        if (!raw.ok) throw new Error("Failed to fetch Repository ...");
        return raw.json();
    });
}

function decorateProfileData(details) {
    // console.log(details);
    let isoString = details.created_at;
    let dateOnly = isoString.split("T")[0];

    let data = `<div class="profile-heading">
                <div class="profile-pic">
                    <img src="${details.avatar_url}"
                        alt="Profile Image">
                </div>
                <div class="profile-about">
                    <div class="login">
                        <h2>${details.name}</h2>
                        <p>@${details.login}</p>
                        <p>Active since ${dateOnly}</p>
                    </div>
                    <a class="profile-link" target="_blank" href="${details.html_url}">View Profile</a>
                    <p>Location : ${details.location ? details.location : "N/A"}</p>
                    <p>Blog : ${details.blog ? details.blog : "N/A"}</p>
                    <p>Company : ${details.company ? details.company : "N/A"}</p>
                    <p>${details.bio ? details.bio : "Sorry there is no bio..."}</p>

                    
                </div>
            </div>

            <div class="profile-stats">
                <div class="profile-followers profile-records">
                    <p>Followers</p>
                    <p>${details.followers}</p>
                </div>
                <div class="profile-following profile-records">
                    <p>Following</p>
                    <p>${details.following}</p>
                </div>
                <div class="profile-public-repos profile-records">
                    <p>Public Repository</p>
                    <p>${details.public_repos}</p>
                </div>
            </div>
            </div>`


    profileCard.innerHTML = data;
}

function decorateRepos(repos) {
    console.log(repos);

    let data = `<div class="repos">
                <div class="profile-repos">
                    <div class="repo">
                        <p class="repo-name">RepositoryName</p>
                        <p>Created on :</p>
                        <a class="repo-link" target="_blank" href="">View</a>
                    </div>
                </div>`

    for (let i = 0; i < repos.length; i++) {
        let isoString = repos[i].created_at;
        let dateOnly = isoString.split("T")[0];
        data += `<div class="profile-repos">
                        <div class="repo">
                        <p class="repo-name">${repos[i].name}</p>
                        <p>${dateOnly}</p>
                        <a class="repo-link" target="_blank" href="${repos[i].html_url}">View</a>
                    </div>
                    </div>`
    }

    data += `</div>`;
    profileCard.innerHTML += data;

}



searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let username = usernameInp.value.trim();

    if (username.length > 0) {
        function1(username);
        function2(username);
    } else {
        alert("Please Enter Username ...");
    }
});

function function1(username) {
    getProfileData(username).then((data) => {
        decorateProfileData(data);
    });
}

function function2(username) {
    getRepos(username).then((data) => {
        decorateRepos(data);
    });
}
