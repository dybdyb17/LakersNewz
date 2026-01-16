let balance = parseInt(localStorage.getItem('balance')) || 1000;
let bets = JSON.parse(localStorage.getItem('bets')) || [];

const balanceEl = document.getElementById('userBalance');
const matchesEl = document.getElementById('matchesList');
const betsEl = document.getElementById('myBets');
const resetBtn = document.getElementById('resetBalance');

function updateBalance() {
  balanceEl.textContent = balance;
  localStorage.setItem('balance', balance);
}

function saveBets() {
  localStorage.setItem('bets', JSON.stringify(bets));
}

function loadMatches() {
  fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard')
    .then(res => res.json())
    .then(data => {
      const games = data.events || [];
      
      if (games.length === 0) {
        matchesEl.innerHTML = '<p style="text-align: center;">Aucun match aujourd\'hui</p>';
        return;
      }

      matchesEl.innerHTML = games.map(game => {
        const comp = game.competitions[0];
        const team1 = comp.competitors[0];
        const team2 = comp.competitors[1];
        const date = new Date(game.date);

        return `
          <div class="match-card">
            <div class="match-date">${date.toLocaleString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</div>
            <div class="match-teams">
              <div class="team">
                <img src="${team1.team.logo}" class="team-logo">
                <div>${team1.team.shortDisplayName}</div>
              </div>
              <div class="vs">VS</div>
              <div class="team">
                <img src="${team2.team.logo}" class="team-logo">
                <div>${team2.team.shortDisplayName}</div>
              </div>
            </div>
            <div class="bet-actions">
              <button class="bet-choice" onclick="placeBet('${game.id}', '${team1.team.displayName}', '${team2.team.displayName}', '${team1.team.displayName}')">
                ${team1.team.shortDisplayName}
              </button>
              <button class="bet-choice" onclick="placeBet('${game.id}', '${team1.team.displayName}', '${team2.team.displayName}', '${team2.team.displayName}')">
                ${team2.team.shortDisplayName}
              </button>
            </div>
          </div>
        `;
      }).join('');
    })
    .catch(() => {
      matchesEl.innerHTML = '<p style="text-align: center; color: red;">Erreur de chargement</p>';
    });
}

function placeBet(matchId, team1, team2, choice) {
  const amount = parseInt(prompt(`Mise sur ${choice} ?\nMontant (10-${balance} coins):`, '50'));
  
  if (!amount || amount < 10) {
    alert('Mise minimum : 10 coins');
    return;
  }
  
  if (amount > balance) {
    alert('Solde insuffisant !');
    return;
  }
  
  balance -= amount;
  updateBalance();
  
  bets.push({
    id: Date.now(),
    matchId: matchId,
    match: `${team1} vs ${team2}`,
    choice: choice,
    amount: amount,
    date: new Date().toLocaleString('fr-FR')
  });
  
  saveBets();
  showBets();
  alert(`Pari enregistré !\n${choice} : ${amount} coins`);
}

function showBets() {
  if (bets.length === 0) {
    betsEl.innerHTML = '<div class="empty-state"><i class="fa-solid fa-inbox"></i><p>Aucun pari</p></div>';
    return;
  }
  
  betsEl.innerHTML = bets.map((bet, index) => `
    <div class="bet-card">
      <div class="bet-info">
        <div class="bet-match">${bet.match}</div>
        <div class="bet-choice">Choix : ${bet.choice}</div>
        <div class="bet-date">${bet.date}</div>
      </div>
      <div class="bet-amount">${bet.amount} coins</div>
      <button class="delete-bet" onclick="deleteBet(${index})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function deleteBet(index) {
  if (confirm('Supprimer ce pari ?')) {
    bets.splice(index, 1);
    saveBets();
    showBets();
  }
}

resetBtn.addEventListener('click', () => {
  if (confirm('Réinitialiser ? Tous les paris seront effacés.')) {
    balance = 1000;
    bets = [];
    updateBalance();
    saveBets();
    showBets();
  }
});

updateBalance();
loadMatches();
showBets();