// script.js

// Navigate to the match details page
function navigateToMatchDetails() {
    window.location.href = 'match-details.html';
}

// Placeholder function for adding a tournament
function addTournament() {
    alert('This feature is under construction.');
}

// Save the match details and navigate to the players page
function saveMatchDetails() {
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    const sets = document.getElementById('sets').value;
    const pointsPerSet = document.getElementById('points-per-set').value;
    const difference = document.querySelector('input[name="difference"]:checked').value;
    const termination = document.querySelector('input[name="termination"]:checked').value;

    // Save data to localStorage
    localStorage.setItem('matchDetails', JSON.stringify({
        team1, team2, sets, pointsPerSet, difference, termination
    }));

    // Navigate to the players page
    window.location.href = 'players_a.html';
    return false; // Prevent form submission
}

// Save player names and navigate to the live scoring page
function savePlayers() {
    const team1Players = [];
    const team2Players = [];

    // Collect Team 1 player names
    for (let i = 1; i <= 7; i++) {
        const player = document.getElementById(`team1-player${i}`).value.trim();
        if (player) {
            team1Players.push(player);
        }
    }

    // Collect Team 2 player names
    for (let i = 1; i <= 7; i++) {
        const player = document.getElementById(`team2-player${i}`).value.trim();
        if (player) {
            team2Players.push(player);
        }
    }

    // Save to localStorage
    localStorage.setItem('team1Players', JSON.stringify(team1Players));
    localStorage.setItem('team2Players', JSON.stringify(team2Players));

    // Navigate to the live scoring page
    window.location.href = 'live_scoring.html';
}

// Manage the live scoring page functionality
function loadLiveScoring() {
    let matchDetails = JSON.parse(localStorage.getItem('matchDetails'));
    const team1Players = JSON.parse(localStorage.getItem('team1Players'));
    const team2Players = JSON.parse(localStorage.getItem('team2Players'));

    if (matchDetails && team1Players && team2Players) {
        // Assign player names to the positions
        document.getElementById('lifterA').textContent = team1Players[0] || 'Lifter';
        document.getElementById('aceA').textContent = team1Players[1] || 'Ace';
        document.getElementById('smasherA').textContent = team1Players[2] || 'Smasher';
        document.getElementById('centreA').textContent = team1Players[3] || 'Centre';
        document.getElementById('defence1A').textContent = team1Players[4] || 'Defence 1';
        document.getElementById('defence2A').textContent = team1Players[5] || 'Defence 2';

        document.getElementById('lifterB').textContent = team2Players[0] || 'Lifter';
        document.getElementById('aceB').textContent = team2Players[1] || 'Ace';
        document.getElementById('smasherB').textContent = team2Players[2] || 'Smasher';
        document.getElementById('centreB').textContent = team2Players[3] || 'Centre';
        document.getElementById('defence1B').textContent = team2Players[4] || 'Defence 1';
        document.getElementById('defence2B').textContent = team2Players[5] || 'Defence 2';
    }

    let scoreA = 0;
    let scoreB = 0;
    let currentSet = 1;
    let setResults = [];
    let pointDetails = [];

    function scorePoint(team, player) {
        const scoreElement = document.getElementById(`score${team}`);
        let currentScore = parseInt(scoreElement.textContent);

        if (team === 'A') {
            scoreA++;
        } else {
            scoreB++;
        }

        // Log the point details
        pointDetails.push({
            set: currentSet,
            team: team === 'A' ? matchDetails.team1 : matchDetails.team2,
            player: player,
            point: team === 'A' ? scoreA : scoreB
        });

        // Update the score display
        scoreElement.textContent = currentScore + 1;

        // Check if the set is won
        if (scoreA >= matchDetails.pointsPerSet && (scoreA - scoreB) >= matchDetails.difference) {
            setResults.push({ set: currentSet, winner: matchDetails.team1, score: `${scoreA}-${scoreB}` });
            startNextSet();
        } else if (scoreB >= matchDetails.pointsPerSet && (scoreB - scoreA) >= matchDetails.difference) {
            setResults.push({ set: currentSet, winner: matchDetails.team2, score: `${scoreB}-${scoreA}` });
            startNextSet();
        }
    }

    function startNextSet() {
        if (currentSet < matchDetails.sets) {
            currentSet++;
            scoreA = 0;
            scoreB = 0;
            document.getElementById('scoreA').textContent = '0';
            document.getElementById('scoreB').textContent = '0';
            alert(`Starting Set ${currentSet}`);
        } else {
            endMatch();
        }
    }

    function endMatch() {
        localStorage.setItem('setResults', JSON.stringify(setResults));
        localStorage.setItem('pointDetails', JSON.stringify(pointDetails));
        window.location.href = 'match_summary.html';
    }

    // Attach event listeners to player elements
    document.querySelectorAll('.player').forEach(player => {
        player.addEventListener('click', function() {
            scorePoint(this.id.charAt(this.id.length - 1), this.textContent);
        });
    });

    document.querySelector('.end-match').addEventListener('click', endMatch);
}

// Function to load the match summary
function loadMatchSummary() {
    const setResults = JSON.parse(localStorage.getItem('setResults'));
    const pointDetails = JSON.parse(localStorage.getItem('pointDetails'));

    const summaryTable = document.getElementById('summary-table');

    setResults.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.winner}</td>
            <td>${result.set}</td>
            <td>${result.score}</td>
        `;
        summaryTable.appendChild(row);
    });
    const summaryTables = document.getElementById('summary-tables');
    pointDetails.forEach(detail => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${detail.team}</td>
            <td>${detail.set}</td>
            <td>${detail.player}</td>
            <td>${detail.point}</td>
        `;
        summaryTables.appendChild(row);
    });

    const playerPoints = {};
    pointDetails.forEach(detail => {
        if (!playerPoints[detail.player]) {
            playerPoints[detail.player] = 0;
        }
        playerPoints[detail.player] += detail.point;
    });

    // Display total points for each player in summary-table1
    for (const player in playerPoints) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player}</td>
            <td>${playerPoints[player]}</td>
        `;
        summaryTable1.appendChild(row);
    }
}

// Initialize the page based on its context
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('live_scoring.html')) {
        loadLiveScoring();
    } else if (path.includes('match_summary.html')) {
        loadMatchSummary();
    }
});

document.getElementById('playerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        team1_player1: formData.get('team1_player1'),
        team1_player2: formData.get('team1_player2'),
        team1_player3: formData.get('team1_player3'),
        team2_player1: formData.get('team2_player1'),
        team2_player2: formData.get('team2_player2'),
        team2_player3: formData.get('team2_player3')
    };

    try {
        const response = await fetch('save_players.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        document.getElementById('responseMessage').textContent = result.message;
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'Error saving players.';
    }
});

