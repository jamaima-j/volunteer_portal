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

/* Style for multi-select dropdown */
.multi-select {
    width: 100%;
}

.multi-select option {
    padding: 10px;
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
        alert('Event Name must be at least 100 characters.');
        return false;
    }
    if (!eventName || !eventDescription || !location || requiredSkills.length === 0 || !urgency || !eventDate) {
        alert('Please fill out all required fields.');
        return false;
    }
    return true;
}

// Function to dynamically add skills to the dropdown menu
function addSkillOption(skill) {
    const requiredSkillsSelect = document.getElementById('requiredSkills');
    const option = document.createElement('option');
    option.value = skill;
    option.textContent = skill;
    requiredSkillsSelect.appendChild(option);
}

// Example of adding skills to the dropdown menu
addSkillOption('Skill 1');
addSkillOption('Skill 2');
addSkillOption('Skill 3');
addSkillOption('Skill 4');
addSkillOption('Skill 5');
