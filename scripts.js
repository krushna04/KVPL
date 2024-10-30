// Define player data for each team
const teamsData = {
    KalpataruSiegeEngine: [
        { name: 'Abhishek Salve', img: 'images/profile.png' },
        { name: 'Shiva Rao', img: 'images/profile.png' },
        { name: 'Nikhil Salve', img: 'images/profile.png' },
        { name: 'Bhushan', img: 'images/profile.png' },
        { name: 'Funde Sir', img: 'images/profile.png' },
        { name: 'Pravin Ingle', img: 'images/profile.png' },
        { name: 'Swayam Byahar', img: 'images/profile.png' }
    ],
    UnityWarriors: [
        { name: 'Pawan Deshmukh', img: 'images/profile.png' },
        { name: 'Raju Balpande', img: 'images/profile.png' },
        { name: 'Roshan Poduval', img: 'images/profile.png' },
        { name: 'Ajay Mohite', img: 'images/profile.png' },
        { name: 'Prashant Khangar', img: 'images/profile.png' },
        { name: 'Vicky Bhoyar', img: 'images/profile.png' },
        { name: 'Niraj Jain', img: 'images/profile.png' }
    ],
    WehrmachtArmy: [
        { name: 'Tejomay Bhagwat', img: 'images/profile.png' },
        { name: 'Vipul Namewar', img: 'images/profile.png' },
        { name: 'Mangesh Gawande', img: 'images/profile.png' },
        { name: 'Narendra Korde', img: 'images/profile.png' },
        { name: 'Shubham Korke', img: 'images/profile.png' },
        { name: 'Mahesh Bante', img: 'images/profile.png' },
        { name: 'Rajan Bhajipale', img: 'images/profile.png' }
    ],
    TeamX: [
        { name: 'Pankaj Kurhade', img: 'images/profile.png' },
        { name: 'Subodh Atkare', img: 'images/profile.png' },
        { name: 'Amol Sasankar', img: 'images/profile.png' },
        { name: 'Jitendra Manekar', img: 'images/profile.png' },
        { name: 'Akshay Ambadkar', img: 'images/profile.png' },
        { name: 'Shekhar Thekale', img: 'images/profile.png' },
        { name: 'Karan Dhapodkar', img: 'images/profile.png' }
    ],
    VmsEagles: [
        { name: 'Devendra Thakre', img: 'images/profile.png' },
        { name: 'Shubham Kawre', img: 'images/profile.png' },
        { name: 'Shivendra Bhaiyya', img: 'images/profile.png' },
        { name: 'Ayush Shirpurkar', img: 'images/profile.png' },
        { name: 'Vikram Korke', img: 'images/profile.png' },
        { name: 'Vedang Korde', img: 'images/profile.png' },
        { name: 'Shrikant Kaka', img: 'images/profile.png' }
    ],
    ZeroMileFighters: [
        { name: 'Waman Kondekar', img: 'images/profile.png' },
        { name: 'Om Kondekar', img: 'images/profile.png' },
        { name: 'Krushnakant Moundekar', img: 'images/krushnakant.png' },
        { name: 'Kishor Shaniware', img: 'images/profile.png' },
        { name: 'Ishan Mahendra', img: 'images/profile.png' },
        { name: 'Sandeep Kadam', img: 'images/profile.png' },
        { name: 'Sachin Mane', img: 'images/profile.png' }
    ]
};

// Function to display players based on team selection
function showPlayers(teamId) {
    
    const playerListDiv = document.getElementById('player-list');
    playerListDiv.innerHTML = '';  

    // Create HTML for players of the selected team
    const players = teamsData[teamId];
    if (players) {
        let playerGrid = '<div class="player-grid">';
        players.forEach(player => {
            playerGrid += `
                <div class="player-card">
                    <img src="${player.img}" alt="${player.name}">
                    <h4>${player.name}</h4>
                </div>
            `;
        });
        playerGrid += '</div>';

        playerListDiv.innerHTML = playerGrid;
        playerListDiv.style.display = 'block';  
    } else {
        playerListDiv.style.display = 'none';  
    }
}

function showTab(year) {
    // Hide all tab content
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });

    // Show the selected tab content
    const selectedContent = document.getElementById(year);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

// Show 2024 tab content by default
window.onload = function() {
    showTab('2024');
};

function zmfvskse() {
    window.location.href = 'zmfvskse.html';
}

function wavsuw() {
    window.location.href = 'wavsuw.html';
}

function txvsvms() {
    window.location.href = 'txvsvms.html';
}
