
let session = JSON.parse(localStorage.getItem('lakersNewzSession')) ||
              JSON.parse(sessionStorage.getItem('lakersNewzSession')) || null;

document.addEventListener('DOMContentLoaded', () => {
  if (!session || !session.isLoggedIn) {
    window.location.href = 'connexion.html';
    return;
  }

  const pseudo = session.pseudo || session.nom || session.prenom || 'Utilisateur';
  const solde = (session.solde || 0).toFixed(2).replace('.', ',') + ' €';

  document.getElementById('profilPseudo').textContent = pseudo;
  document.getElementById('profilSolde').textContent = solde;

  document.getElementById('infoCivilite').textContent = session.civilite || 'Monsieur';
  document.getElementById('infoNom').textContent = session.nom || '—';
  document.getElementById('infoPrenom').textContent = session.prenom || '—';
  document.getElementById('infoDdn').textContent = session.dateNaissance || '—';
  document.getElementById('infoLieu').textContent = session.lieuNaissance || '—';
  document.getElementById('infoEmail').textContent = session.email || '—';
  document.getElementById('infoTel').textContent = session.telephone || '—';
});

document.getElementById('deposerBtn')?.addEventListener('click', () => {
  window.location.href = 'deposer.html';
});

document.getElementById('retirerBtn')?.addEventListener('click', () => {
  window.location.href = 'retirer.html';
});

document.getElementById('infoPersoBtn')?.addEventListener('click', () => {
  document.getElementById('profilView').style.display = 'none';
  document.getElementById('infoPersoView').style.display = 'block';
});

document.getElementById('backBtn')?.addEventListener('click', () => {
  document.getElementById('infoPersoView').style.display = 'none';
  document.getElementById('profilView').style.display = 'block';
});

document.getElementById('deconnecterBtn')?.addEventListener('click', () => {
  localStorage.removeItem('lakersNewzSession');
  sessionStorage.removeItem('lakersNewzSession');
  window.location.href = 'index.html';
});

document.getElementById('clotureBtn')?.addEventListener('click', () => {
  document.getElementById('clotureOverlay').style.display = 'flex';
});

document.getElementById('clotureCancelBtn')?.addEventListener('click', () => {
  document.getElementById('clotureOverlay').style.display = 'none';
});

document.getElementById('clotureConfirmBtn')?.addEventListener('click', () => {
  localStorage.removeItem('lakersNewzSession');
  sessionStorage.removeItem('lakersNewzSession');
  window.location.href = 'inscription.html';
});