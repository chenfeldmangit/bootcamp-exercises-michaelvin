this.profile = {
    name: "shmulikknoll",
    id: "@GuildHead",
    bio: "some bio",
    location: "Tel-Aviv",
    backgroundImgSrc: "myTwitter/resources/picture.jpg",
    profileImgSrc: "myTwitter/resources/shmul.webp",
};

class Tweet {

    constructor(timestamp, user, tweetContent) {
        this.timestamp = timestamp;
        this.user = user;
        this.tweetContent = tweetContent;
    }
}

class TweetList {

    constructor(json) {
        console.log(json);
        this.tweets = json === undefined ? [] : json.tweets;
    }

    addTweet(timestamp, user, tweetContent) {
        this.tweets.splice(0, 0, new Tweet(timestamp, user, tweetContent));
    }
}


/* on-load functions */

function onLoad() {
    createTweetIdEnumerator();
    createTweetList();
    // setInterval(loadTweets(), 2000);

    // resetLocalStorageData();
}

function resetLocalStorageData() {
    localStorage.setItem("idEnumerator", "0");
    localStorage.setItem("tweetList", "");
}

function createTweetIdEnumerator() {
    let idEnumerator = localStorage.getItem("idEnumerator");
    if (idEnumerator == null) {
        localStorage.setItem("idEnumerator", "0");
    }
}

function createTweetList() {
    let tweetList = localStorage.getItem("tweetList");
    if (tweetList == null) {
        localStorage.setItem("tweetList", JSON.stringify(new TweetList()));
    }
}

function loadTweets() {

}


/* on-event functions */

function goToProfile() {
    let showProfile = document.body.getElementsByClassName("show-profile");
    if (showProfile.length > 0) {
        document.body.removeChild(showProfile[0]);
    }

    let temp = document.getElementById("profile-container");
    let clone = temp.content.cloneNode(true);
    document.body.insertBefore(clone, document.body.children[2]);
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

function showNumberOfCharactersInserted(elementOutput, elementId) {
    document.getElementById(elementOutput).innerText = document.getElementById(elementId).value.length.toString() + "/" + document.getElementById(elementId).getAttribute("maxlength");
}

function preventRefresh() {
    return false;
}

function addTweet(tweetInputBoxId) {
    let tweetContent = document.getElementById(tweetInputBoxId).value;
    // let newTweetObject = new Tweet(Date.now(), this.profile.id, tweetContent);

    let tweetList = new TweetList(JSON.parse(localStorage.getItem("tweetList")));
    tweetList.addTweet(Date.now(), this.profile.id, tweetContent);

    localStorage.setItem("tweetList", JSON.stringify(tweetList));


    // let newTweetObject = {"timestamp" : Date.now() , "user": this.profile.id, "tweetContent": tweetContent};
    // alert(JSON.stringify(newTweetObject));

    // let a = JSON.parse(tweetContent);

    // let tweetList = JSON.parse(localStorage.getItem("tweetList"));
    // alert(tweetList);
    // tweetList.add(JSON.parse(tweetObject));
    // localStorage.setItem("tweetList", tweetList);


    //
    //
    // let tweetTemplate = document.getElementsByClassName("tweet-template")[0];
    // let clone = tweetTemplate.content.cloneNode(true);
    // let tweetsDiv = document.body.getElementById("center-container").getElementById("tweets");
    // document.body.insertBefore(clone, tweetsDiv[0]);
    //
    // clone.setAttribute("id", createTweetId());
    //
    // document.getElementById("profile-background").setAttribute("src", this.profile.backgroundImgSrc);
    // document.getElementById("profile-img").setAttribute("src", this.profile.profileImgSrc);
    //
    // document.getElementsByClassName("profile-name")[0].innerHTML = this.profile.name;
    // document.getElementsByClassName("profile-name")[1].innerHTML = this.profile.name;
    // document.getElementById("profile-id").innerHTML = this.profile.id;
    // document.getElementById("profile-bio").innerHTML = this.profile.bio;
    // document.getElementById("profile-location").innerHTML = this.profile.location;
}

function createTweetId() {
    let nextTweetId = parseInt(localStorage.getItem("idEnumerator"), 10) + 1;
    localStorage.setItem("idEnumerator", nextTweetId.toString());
    return "#tweet-" + nextTweetId;
}

function likeTweet(tweetInputBoxId) {

}