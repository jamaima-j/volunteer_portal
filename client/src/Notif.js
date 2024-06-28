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
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(tabName).style.display = "block";

    // Add an active class to the button that opened the tab
    evt.currentTarget.style.backgroundColor = "#777";
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
    background-color: #f1f1f1;
}

.tablink {
    background-color: #555;
    color: white;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
    transition: 0.3s;
}

.tablink:hover {
    background-color: #777;
}

.tabcontent {
    display: none;
    padding: 20px;
    border: 1px solid #ccc;
    border-top: none;
}

.tabcontent h3 {
    margin-top: 0;
}

.tabcontent form {
    display: flex;
    flex-direction: column;
}

.tabcontent form input[type="text"],
.tabcontent form input[type="date"],
.tabcontent form textarea,
.tabcontent form select {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
}

.tabcontent form input[type="submit"] {
    padding: 10px;
    font-size: 16px;
    background-color: #555;
    color: white;
    border: none;
    cursor: pointer;
}

.tabcontent form input[type="submit"]:hover {
    background-color: #777;
}

.notification {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
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
    animation: popup 0.5s forwards;
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

// Load notifications from a JSON file
fetch('notif.json')
    .then(response => response.json())
    .then(data => {
        data.notifications.forEach(notification => {
            addNotification(notification.type, notification.message);
        });
    })
    .catch(error => console.error('Error loading notifications:', error));
