document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', function() {
    const input = this.parentElement.querySelector('input');
    const icon = this.querySelector('i');
    
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye', 'fa-eye-slash');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
});


const inscriptionForm = document.getElementById('inscriptionForm');
const inscriptionCard = document.getElementById('inscriptionCard');
const successCard = document.getElementById('successCard');

if (inscriptionForm) {
  inscriptionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value.trim();
    const pseudo = document.getElementById('pseudo').value.trim();
    const email = document.getElementById('email').value.trim();
    const dateNaissance = document.getElementById('dateNaissance').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const age18 = document.getElementById('age18').checked;
    const conditions = document.getElementById('conditions').checked;
    
    if (!nom || !pseudo || !email || !dateNaissance || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (password.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    if (!age18) {
      alert('Vous devez certifier avoir 18 ans ou plus');
      return;
    }
    
    if (!conditions) {
      alert('Vous devez accepter les conditions d\'utilisation');
      return;
    }
    
    const user = {
      nom: nom,
      pseudo: pseudo,
      email: email,
      dateNaissance: dateNaissance,
      password: password, 
      solde: 0,
      isLoggedIn: true,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('lakersNewzSession', JSON.stringify(user));
    
    inscriptionCard.style.display = 'none';
    successCard.classList.add('show');
  });
}

const connexionForm = document.getElementById('connexionForm');

if (connexionForm) {
  connexionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember')?.checked || false;
    
    if (!email || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    const storedUser = localStorage.getItem('lakersNewzSession');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      
      if (user.email === email && user.password === password) {
        user.isLoggedIn = true;
        
        if (remember) {
          localStorage.setItem('lakersNewzSession', JSON.stringify(user));
        } else {
          sessionStorage.setItem('lakersNewzSession', JSON.stringify(user));
        }
        
        alert('Connexion réussie !');
        window.location.href = 'paris.html';
        return;
      }
    }
    
    const demoUser = {
      nom: 'Utilisateur',
      pseudo: email.split('@')[0],
      email: email,
      password: password,
      solde: 100, 
      isLoggedIn: true,
      createdAt: new Date().toISOString()
    };
    
    if (remember) {
      localStorage.setItem('lakersNewzSession', JSON.stringify(demoUser));
    } else {
      sessionStorage.setItem('lakersNewzSession', JSON.stringify(demoUser));
    }
    
    alert('Connexion réussie ! (Compte créé automatiquement)');
    window.location.href = 'paris.html';
  });
}

function checkAuth() {
  const session = JSON.parse(localStorage.getItem('lakersNewzSession')) || 
                  JSON.parse(sessionStorage.getItem('lakersNewzSession'));
  
  if (session && session.isLoggedIn) {
  
  }
}

