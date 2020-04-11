
/* data objects */

this.profile = {
    name: "shmulikknoll",
    id: "@GuildHead",
    bio: "some bio",
    location: "Tel-Aviv",
    backgroundImgSrc: "myTwitter/resources/picture.jpg",
    profileImgSrc: "myTwitter/resources/shmul.webp",
};

class Tweet {

    constructor(tweetId, timestamp, userName, userId, tweetContent, isLiked=false) {
        this.tweetId = tweetId === "" ? createNextTweetId() : tweetId;
        this.timestamp = timestamp;
        this.userName = userName;
        this.userId = userId;
        this.tweetContent = tweetContent;
        this.isLiked = isLiked;
    }

    static fromJson(json) {
        return new Tweet(json.tweetId, json.timestamp, json.userName, json.userId, json.tweetContent, json.isLiked);
    }
}

class TweetList {

    constructor(tweets) {
        this.tweets = tweets;
    }

    static fromJson(json) {
        return json.length === 0 ? new TweetList([]) : new TweetList(json.map(tweet => Tweet.fromJson(tweet)));
    }

    addTweet(tweet) {
        this.tweets.splice(0, 0, tweet);
    }

    getTweetById(tweetId) {
        return this.tweets.filter(tweet => tweet.tweetId === tweetId)[0];
    }

    removeTweetById(tweetId) {
        this.tweets = this.tweets.filter(tweet => tweet.tweetId !== tweetId);
    }
}

class TweetAPI {
    static getTweet = () => {
        return new Promise(((resolve, reject) => {
            try {
                let tweetData = localStorage.getItem("tweets");
                resolve(JSON.parse(tweetData))
            }
            catch (e) {
                reject(err);
            }
        }))
    }
}


/* on-load functions */

function onLoad() {
    createTweetIdEnumerator();
    createTweetList();

    // setInterval(loadTweets(), 4000);
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
        localStorage.setItem("tweetList", JSON.stringify([]));
    }
}

function loadTweets() {

    removeCurrentDisplayedTweets();

    let jsonTweetList = JSON.parse(localStorage.getItem("tweetList"));
    let tweetList = TweetList.fromJson(jsonTweetList);

    tweetList.tweets.forEach( (currTweet, index) => {
        let tweetTemplate = document.getElementById("tweet-template");
        let newTweetToDisplay = tweetTemplate.content.cloneNode(true);
        let tweetsDiv = document.getElementById("tweets");
        // tweetsDiv.prepend(newTweetToDisplay);
        tweetsDiv.appendChild(newTweetToDisplay);

        document.getElementsByClassName("tweet")[index].id= currTweet.tweetId;
        document.getElementById(currTweet.tweetId).getElementsByClassName("tweet-who-img")[0].setAttribute("src", "myTwitter/resources/virus.svg");
        document.getElementById(currTweet.tweetId).getElementsByClassName("tweet-who-name")[0].innerHTML=currTweet.userName;
        document.getElementById(currTweet.tweetId).getElementsByClassName("tweet-who-id")[0].innerHTML=currTweet.userId;
        document.getElementById(currTweet.tweetId).getElementsByClassName("tweet-content")[0].innerHTML=currTweet.tweetContent;
        if (currTweet.isLiked) {
            document.getElementById(currTweet.tweetId).getElementsByClassName("tweet-action-bar-button")[2].classList.add("liked");
            // document.getElementById(currTweet.tweetId).getElementsByClassName("tweet-action-bar-button-img")[2].setAttribute("data", "myTwitter/resources/heart-full.svg");
        }

    });
}

function removeCurrentDisplayedTweets() {
    let tweetsDiv = document.getElementById("tweets");
    let first = tweetsDiv.firstElementChild;
    while (first) {
        first.remove();
        first = tweetsDiv.firstElementChild;
    }
}


function resetLocalStorageData() {
    loadTweets();
    // localStorage.clear();
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

function tweet() {
    let newTweetContent = document.getElementById("user-tweet-input").value;
    let newTweetObject = new Tweet("", Date.now(), this.profile.name, this.profile.id, newTweetContent);

    saveTweetToMemory(newTweetObject);
    addTweetToDisplay(newTweetObject);
}

function saveTweetToMemory(newTweetObject) {
    let jsonTweetList = JSON.parse(localStorage.getItem("tweetList"));
    let tweetList = TweetList.fromJson(jsonTweetList);
    tweetList.addTweet(newTweetObject);
    localStorage.setItem("tweetList", JSON.stringify(tweetList.tweets));
}

function addTweetToDisplay(newTweetObject) {
    let tweetTemplate = document.getElementById("tweet-template");
    let newTweetToDisplay = tweetTemplate.content.cloneNode(true);
    let tweetsDiv = document.getElementById("tweets");
    tweetsDiv.prepend(newTweetToDisplay);
    document.getElementsByClassName("tweet")[0].id= newTweetObject.id;
    document.getElementById(newTweetObject.id).getElementsByClassName("tweet-who-img")[0].setAttribute("src", this.profile.profileImgSrc);
    document.getElementById(newTweetObject.id).getElementsByClassName("tweet-who-name")[0].innerHTML=this.profile.name;
    document.getElementById(newTweetObject.id).getElementsByClassName("tweet-who-id")[0].innerHTML=this.profile.id;
    document.getElementById(newTweetObject.id).getElementsByClassName("tweet-content")[0].innerHTML=newTweetObject.tweetContent;
}

function createNextTweetId() {
    let nextTweetId = parseInt(localStorage.getItem("idEnumerator"), 10) + 1;
    localStorage.setItem("idEnumerator", nextTweetId.toString());
    return "#tweet-" + nextTweetId;
}

function likeTweet(event) {
    let jsonTweetList = JSON.parse(localStorage.getItem("tweetList"));
    let tweetList = TweetList.fromJson(jsonTweetList);
    let tweet = tweetList.getTweetById(event.target.closest(".tweet").getAttribute("id"));
    tweet.isLiked = !tweet.isLiked;
    // tweet.isLiked ? event.target.children[0].classList.add("liked") : event.target.children[0].classList.remove("liked");
    tweet.isLiked ? event.target.classList.add("liked") : event.target.classList.remove("liked");
    // event.target.children[0].setAttribute("data", "myTwitter/resources/"+ (tweet.isLiked ? "heart-full.svg" : "heart.svg"));
    localStorage.setItem("tweetList", JSON.stringify(tweetList.tweets));
}