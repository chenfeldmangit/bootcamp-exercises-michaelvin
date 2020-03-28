this.profile = {
    name: "shmulikknoll",
    id: "@GuildHead",
    bio: "some bio",
    location: "Tel-Aviv",
    backgroundImgSrc: "myTwitter/resources/picture.jpg",
    profileImgSrc: "myTwitter/resources/shmul.webp",
};

function goToProfile() {
    let showProfile = document.body.getElementsByClassName("show-profile");
    if (showProfile.length > 0) {
        document.body.removeChild(showProfile[0]);
    }

    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.body.insertBefore(clon, document.body.children[2]);
    // document.body.removeChild(document.body.children[1])
    document.getElementById("center-container").style.display = "none";

    document.getElementById("profile-background").setAttribute("src", this.profile.backgroundImgSrc);
    document.getElementById("profile-img").setAttribute("src", this.profile.profileImgSrc);

    document.getElementsByClassName("profile-name")[0].innerHTML = this.profile.name;
    document.getElementsByClassName("profile-name")[1].innerHTML = this.profile.name;
    document.getElementById("profile-id").innerHTML = this.profile.id;
    document.getElementById("profile-bio").innerHTML = this.profile.bio;
    document.getElementById("profile-location").innerHTML = this.profile.location;
}

function goBackToMainPage() {
    // var temp = document.getElementById("center-container")[0];
    // var clon = temp.content.cloneNode(true);
    // document.body.insertBefore(clon, document.body.children[2]);
    document.body.removeChild(document.body.children[2]);
    document.getElementById("center-container").style.display = "flex";

}

function editProfile() {
    document.getElementsByClassName("edit-profile")[0].open = true;
    document.getElementsByClassName("dialog")[0].setAttribute("style", "display:block;");

    document.getElementById("edit-profile-profile-background").setAttribute("src", this.profile.backgroundImgSrc);
    document.getElementById("edit-profile-profile-img").setAttribute("src", this.profile.profileImgSrc);

    document.getElementById("edit-profile-name").placeholder = this.profile.name;
    document.getElementById("edit-profile-bio").placeholder = this.profile.bio;
    document.getElementById("edit-profile-location").placeholder = this.profile.location;
}

function updateProfile(name, bio, location) {

    if (document.getElementById(name).value.length > 0) { this.profile.name = document.getElementById(name).value; }
    if (document.getElementById(bio).value.length > 0) { this.profile.bio = document.getElementById(bio).value; }
    if (document.getElementById(location).value.length > 0) { this.profile.location = document.getElementById(location).value; }

    goBackFromEditProfileDialogToProfile();
}

function goBackFromEditProfileDialogToProfile() {
    document.getElementsByClassName("dialog")[0].setAttribute("style", "display:none;");
    document.getElementsByClassName("edit-profile")[0].open = false;
    goToProfile();
}

function validateNumberOfCharacters(elementOutput, elementId) {
    document.getElementById(elementOutput).innerText = document.getElementById(elementId).value.length.toString() + "/" + document.getElementById(elementId).getAttribute("maxlength");
}

function preventRefresh() {
    return false;
}