// Define a global variable to track the drop-off list visibility
let isDropOffListVisible = false;

// Define the function to fetch and filter drop-off centers by borough
async function filterByBorough(borough) {
    const apiUrl = 'https://data.cityofnewyork.us/resource/wshr-5vic.json';

    try {
        const response = await fetch(`${apiUrl}?$where=borough='${borough}'`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('API Response:', data); // Log API response for inspection

        displayDropOffCenters(data);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

// Define the function to display drop-off centers in the UI
function displayDropOffCenters(centers) {
    const dropOffList = document.getElementById('dropOffList');

    if (!Array.isArray(centers) || centers.length === 0) {
        dropOffList.innerHTML = ''; // Clear the drop-off list content
        dropOffList.textContent = 'No drop-off centers found for this borough.';
        dropOffList.style.display = 'none'; // Hide the drop-off list
        isDropOffListVisible = false;
        return;
    }

    const listItems = centers.map(center => {
        const siteName = center.SiteName || 'N/A';
        const siteAddress = center.SiteAddress || 'N/A';
        const ntaName = center.NTAName || 'N/A';

        return `
            <li>
                <strong>Site Name:</strong> ${siteName}<br>
                <strong>Site Address:</strong> ${siteAddress}<br>
                <strong>NTA Name:</strong> ${ntaName}
            </li>
        `;
    });

    // Set the drop-off list content
    dropOffList.innerHTML = `<ul>${listItems.join('')}</ul>`;

    // Show the drop-off list if it's not currently visible
    if (!isDropOffListVisible) {
        dropOffList.style.display = 'block';
        isDropOffListVisible = true;
    }
}

// Add event listeners to each borough button
const buttons = document.querySelectorAll('#buttons button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const borough = button.textContent.trim(); // Get the borough name from the button text
        filterByBorough(borough); // Filter drop-off centers by the selected borough
    });
});
