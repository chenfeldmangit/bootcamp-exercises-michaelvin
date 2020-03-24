
this.profile={
    name: "Shmulik Knoll",
    id: "@GuildHead",
    backgroundImgSrc: "second_day/picture.jpg",
    profileImgSrc: "second_day/shmul.webp"
};

function goToProfile() {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.body.insertBefore(clon, document.body.children[2]);
    // document.body.removeChild(document.body.children[1])
    document.getElementsByClassName("center-container")[0].style.display = "none";

    document.getElementsByClassName("profile-background")[0].setAttribute("src", this.profile.backgroundImgSrc);
    document.getElementsByClassName("profile-img")[0].setAttribute("src", this.profile.profileImgSrc);

    document.getElementsByClassName("name")[0].innerHTML = this.profile.name;
    document.getElementsByClassName("id")[0].innerHTML = this.profile.id;
}

function goBackToMainPage() {
    // var temp = document.getElementsByClassName("center-container")[0];
    // var clon = temp.content.cloneNode(true);
    // document.body.insertBefore(clon, document.body.children[2]);
    document.body.removeChild(document.body.children[2]);
    document.getElementsByClassName("center-container")[0].style.display = "flex";

}