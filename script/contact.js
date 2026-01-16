const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    console.log('Formulaire envoyé :');
    console.log('Nom:', name);
    console.log('Email:', email);
    console.log('Sujet:', subject);
    console.log('Message:', message);
    
    contactForm.style.display = 'none';
    successMessage.classList.add('show');
    
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'flex';
      successMessage.classList.remove('show');
    }, 3000);
  });
}