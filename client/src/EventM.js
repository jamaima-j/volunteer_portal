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
`;

// Inject the CSS styles
injectStyle(css);

// Form validation for Event Management
function validateEventForm() {
    const eventName = document.getElementById('eventName').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const location = document.getElementById('location').value;
    const requiredSkills = document.getElementById('requiredSkills').selectedOptions;
    const urgency = document.getElementById('urgency').value;
    const eventDate = document.getElementById('eventDate').value;

    if (eventName.length < 100) {
        alert('Event Name must be minimum 100 characters.');
        return false;
    }
    if (!eventName || !eventDescription || !location || requiredSkills.length === 0 || !urgency || !eventDate) {
        alert('Please fill out all required fields.');
        return false;
    }
    return true;
}
