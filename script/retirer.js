let session = JSON.parse(localStorage.getItem('lakersNewzSession')) ||
              JSON.parse(sessionStorage.getItem('lakersNewzSession')) || null;

let solde = session?.solde || 0;
let montantSelectionne = 0;

function updateSoldeBadge() {
  const badge = document.getElementById('soldeBadge');
  if (badge) badge.textContent = solde.toFixed(2).replace('.', ',') + ' €';
}

function saveSolde() {
  if (!session) return;
  session.solde = solde;
  if (localStorage.getItem('lakersNewzSession')) {
    localStorage.setItem('lakersNewzSession', JSON.stringify(session));
  } else {
    sessionStorage.setItem('lakersNewzSession', JSON.stringify(session));
  }
}

document.querySelectorAll('.dep-preset').forEach(btn => {
  btn.addEventListener('click', () => {
    montantSelectionne = parseInt(btn.dataset.amount);
    document.getElementById('montantInput').value = montantSelectionne;
    document.querySelectorAll('.dep-preset').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.getElementById('montantInput')?.addEventListener('input', e => {
  montantSelectionne = parseFloat(e.target.value) || 0;
  document.querySelectorAll('.dep-preset').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.dep-preset').forEach(b => {
    if (parseInt(b.dataset.amount) === montantSelectionne) b.classList.add('active');
  });
});

document.getElementById('retirerBtn')?.addEventListener('click', () => {
  const montant = parseFloat(document.getElementById('montantInput')?.value) || 0;

  if (montant <= 0) {
    alert('Veuillez saisir un montant.');
    return;
  }

  if (solde < 10 || montant > solde) {
    document.getElementById('soldeInsuffisantOverlay').style.display = 'flex';
    return;
  }

  if (montant < 10) {
    alert('Le montant minimum de retrait est de 10 €.');
    return;
  }

  // Retrait validé
  solde -= montant;
  saveSolde();
  updateSoldeBadge();

  const confirmMontant = document.getElementById('confirmMontant');
  if (confirmMontant) confirmMontant.textContent = montant.toFixed(2).replace('.', ',') + ' €';

  document.getElementById('retraitConfirmeOverlay').style.display = 'flex';
});

document.getElementById('okInsuffisantBtn')?.addEventListener('click', () => {
  document.getElementById('soldeInsuffisantOverlay').style.display = 'none';
});

document.getElementById('confirmOkBtn')?.addEventListener('click', () => {
  window.location.href = 'paris.html';
});

document.getElementById('closeBtn')?.addEventListener('click', () => {
  window.location.href = 'paris.html';
});

document.addEventListener('DOMContentLoaded', () => {
  if (!session || !session.isLoggedIn) {
    window.location.href = 'connexion.html';
    return;
  }
  updateSoldeBadge();
});