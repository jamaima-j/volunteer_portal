// JavaScript for tab functionality
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the specific tab content
    document.getElementById(tabName).style.display = "block";

    // Add an active class to the button that opened the tab
    evt.currentTarget.classList.add("active");
}

// Default open the first tab
document.getElementsByClassName("tablink")[0].click();

// Function to inject CSS styles dynamically
function injectStyle(css) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
}

// CSS styles
const css = `
body {
    font-family: Arial, sans-serif;
}

.tabs {
    overflow: hidden;
    background-color: #2e3a56;
    color: white;
    height: 100vh;
    width: 250px;
    position: fixed;
}

.tabs button {
    display: block;
    background-color: #555;
    color: white;
    width: 100%;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
    transition: 0.3s;
    text-align: left;
}

.tabs button:hover, .tabs button.active {
    background-color: #777;
}

.tabcontent {
    margin-left: 250px;
    padding: 20px;
    border-top: none;
    height: 100vh;
    overflow: auto;
}

.tabcontent h3 {
    margin-top: 0;
}

.card {
    background-color: #252a41;
    border: 1px solid #444c6b;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card h3 {
    font-size: 22px;
    margin-bottom: 20px;
}

.card label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.card input[type="text"],
.card textarea,
.card select,
.card input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #444c6b;
    border-radius: 5px;
    background-color: #1b1e2f;
    color: white;
    box-sizing: border-box;
}

.card input[type="submit"] {
    background-color: #555;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.card input[type="submit"]:hover {
    background-color: #777;
}

.notification {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #444c6b;
    border-radius: 5px;
    background-color: #252a41;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.notification.new-event {
    background-color: #e7f3fe;
    border-left: 6px solid #2196F3;
}

.notification.reminder {
    background-color: #fff3cd;
    border-left: 6px solid #ffeb3b;
}

.popup {
    display: none;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #444c6b;
    background-color: #252a41;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 1000;
    border-radius: 5px;
    animation: popup 0.5s forwards;
}

.popup .close-btn {
    background-color: #555;
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 16px;
    transition: 0.3s;
    border-radius: 5px;
}

.popup .close-btn:hover {
    background-color: #777;
}

@keyframes popup {
    from { transform: scale(0); }
    to { transform: scale(1); }
}
`;

// Inject the CSS styles
injectStyle(css);

// Function to add notifications
function addNotification(type, message) {
    const notificationsDiv = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    if (type === 'reminder') {
        notification.classList.add('popup');
    } else if (type === 'new-event') {
        notification.onclick = () => {
            notification.style.backgroundColor = 'transparent';
            notification.style.borderLeft = 'none';
        };
    }

    notificationsDiv.appendChild(notification);
}

// Function to show popup
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Function to close popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Function to check if all tasks are checked off
function checkTasks() {
    const urgentMessages = document.getElementById('urgentMessages').getElementsByTagName('input');
    for (let i = 0; i < urgentMessages.length; i++) {
        if (!urgentMessages[i].checked) {
            return false;
        }
    }
    return true;
}

// Function to update the popup based on task checkboxes
function updatePopup() {
    if (checkTasks()) {
        closePopup();
    } else {
        showPopup();
    }
}

// Dynamically add urgent messages with checkboxes
function addUrgentMessage(message) {
    const urgentMessagesDiv = document.getElementById('urgentMessages');
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = message;
    checkbox.onchange = updatePopup;  // Add onchange event to update the popup

    const label = document.createElement('label');
    label.htmlFor = message;
    label.textContent = message;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    urgentMessagesDiv.appendChild(listItem);
}

// Example of adding urgent messages
addUrgentMessage("Urgent 1: Immediate action required.");
addUrgentMessage("Urgent 2: Urgency task pending.");

// Load notifications from a JSON file
fetch('notif.json')
    .then(response => response.json())
    .then(data => {
        data.notifications.forEach(notification => {
            addNotification(notification.type, notification.message);
        });
    })
    .catch(error => console.error('Error loading notifications:', error));
