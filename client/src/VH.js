// Injecting CSS
const style = document.createElement('style');
style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
        background-color: #1e1e2f; /* Dark background color */
        color: white; /* White text color */
    }
    .tabs {
        overflow: hidden;
        background-color: #333; /* Darker background for tabs */
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
    .tablink.active {
        background-color: #1e293b;
    }
    .tabcontent {
        display: none;
        padding: 20px;
        border: 1px solid #444c6b; /* Slightly lighter border */
        border-top: none;
        background-color: #2e2e3e; /* Darker background for tab content */
        border-radius: 5px;
        margin-top: -1px;
        color: white; /* Ensure text is white */
    }
    .tabcontent h3 {
        margin-top: 0;
        color: white; /* Ensure headings are white */
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        color: white; /* Ensure table text is white */
    }
    table, th, td {
        border: 1px solid #444c6b; /* Slightly lighter border */
    }
    th {
        background-color: #333; /* Darker background for table headers */
        color: white; /* White text for headers */
    }
    th, td {
        padding: 12px;
        text-align: left;
    }
    td {
        background-color: #555; /* Darker background for table cells */
    }
    .edit-button, .save-button, .add-button, .delete-button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
    }
    .save-button, .delete-button {
        background-color: #f44336; /* Red */
    }
    .add-button {
        background-color: #2196F3; /* Blue */
    }
    .button-group {
        margin-top: 20px;
        text-align: right;
    }
`;
document.head.appendChild(style);

// JavaScript for handling tab switching and editing
document.addEventListener('DOMContentLoaded', function () {
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

    // Enable editing for each row
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const row = button.parentElement.parentElement;
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                if (cell.querySelector('button')) return; // Skip cells with buttons
                const input = document.createElement('input');
                input.type = 'text';
                input.value = cell.innerText;
                cell.innerText = '';
                cell.appendChild(input);
            });
            button.style.display = 'none';
            row.querySelector('.save-button').style.display = 'inline-block';
        });
    });

    // Save edited row
    document.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', function () {
            const row = button.parentElement.parentElement;
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                if (cell.querySelector('button')) return; // Skip cells with buttons
                const input = cell.querySelector('input');
                cell.innerText = input.value;
            });
            button.style.display = 'none';
            row.querySelector('.edit-button').style.display = 'inline-block';
        });
    });

    // Add new row
    document.getElementById('addRow').addEventListener('click', function () {
        const table = document.querySelector('.tabcontent.active table tbody');
        const newRow = document.createElement('tr');

        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            cell.appendChild(input);
            newRow.appendChild(cell);
        }

        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <button class="edit-button" style="display: none;">Edit</button>
            <button class="save-button">Save</button>
            <button class="delete-button">Delete</button>
        `;
        newRow.appendChild(actionsCell);
        table.appendChild(newRow);

        // Attach event listeners to new row buttons
        newRow.querySelector('.save-button').addEventListener('click', function () {
            const row = newRow;
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                if (cell.querySelector('button')) return; // Skip cells with buttons
                const input = cell.querySelector('input');
                cell.innerText = input.value;
            });
            row.querySelector('.save-button').style.display = 'none';
            row.querySelector('.edit-button').style.display = 'inline-block';
        });

        newRow.querySelector('.delete-button').addEventListener('click', function () {
            newRow.remove();
        });
    });

    // Delete existing rows
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            button.parentElement.parentElement.remove();
        });
    });
     // Event listener for generating PDF report
     document.getElementById('generatePDF').addEventListener('click', function () {
        window.open('http://localhost:5000/admin/reporting/report/pdf', '_blank');
    });

    // Event listener for generating CSV report
    document.getElementById('generateCSV').addEventListener('click', function () {
        window.open('http://localhost:5000/admin/reporting/report/csv', '_blank');
    });
});
