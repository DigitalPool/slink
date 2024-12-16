
let myLinks = []
let uList = document.getElementById("your-list")
let leadsLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

function render(links)
{
	uList.innerHTML = ""
	for (let i = 0; i < links.length; i++) {
		uList.innerHTML += `<li><a target="_blank" href="${links[i]}">${links[i]}</a></li>`
	}
}
if (leadsLocalStorage)
	{
		myLinks = leadsLocalStorage
		render(myLinks)
	}
else{
	myLinks = []
	uList.innerHTML = ""
}

function saveLink() {
	let inputLink = document.querySelector("#input-el").value.trim();

	if (!inputLink) {
		alert("Please enter a valid link.")
		return
	}

	if (!inputLink.startsWith("http://") && !inputLink.startsWith("https://")) {
		inputLink = "http://" + inputLink
	}

	myLinks.push(inputLink)
	document.querySelector("#input-el").value = ""
	localStorage.setItem("myLinks", JSON.stringify(myLinks))
	render(myLinks)
}

document.querySelector("#input-el").addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		event.preventDefault()
		saveLink()
	}
});


function deleteLink() {
	localStorage.clear()
	myLinks = []
	render(myLinks)
	uList.innerHTML = ""
}

function addLink() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		let currentTabURL = tabs[0].url;
		myLinks.push(currentTabURL);
		localStorage.setItem("myLinks", JSON.stringify(myLinks));
		render(myLinks);
	});
}

document.getElementById("save-btn").addEventListener("click", saveLink);
document.getElementById("add-btn").addEventListener("click", addLink);
document.getElementById("del-btn").addEventListener("click", deleteLink);

// saveLead()
