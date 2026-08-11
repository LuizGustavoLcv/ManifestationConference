// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// ===== Ticket modal (Sympla Grid de Ingressos) =====
// Troque o eid abaixo pelo ID do seu evento. Para pegar: painel do evento na Sympla > aba "Divulgue" > Grid de Ingressos (o link do widget tem o eid na URL).
const SYMPLA_GRID_URL = 'https://www.sympla.com.br/tickets-grid-widget?eid=3533806&lang=pt';

const ticketModal = document.getElementById('ticketModal');
const symplaGrid = document.getElementById('symplaGrid');

function openTicketModal(){
  if(!symplaGrid.src) symplaGrid.src = SYMPLA_GRID_URL;
  ticketModal.classList.add('open');
  ticketModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}
function closeTicketModal(){
  ticketModal.classList.remove('open');
  ticketModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}
document.querySelectorAll('[data-ticket-open]').forEach(btn => btn.addEventListener('click', openTicketModal));
ticketModal.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeTicketModal));
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && ticketModal.classList.contains('open')) closeTicketModal();
});

// ===== Countdown timer -> set to event date =====
const eventDate = new Date('2026-12-04T18:00:00-03:00').getTime();
function updateCountdown(){
  const now = new Date().getTime();
  const diff = eventDate - now;
  if(diff <= 0){
    document.getElementById('countdown').innerHTML = '<div class="unit"><div class="num">🔥</div><div class="label">O evento começou!</div></div>';
    return;
  }
  const days = Math.floor(diff/(1000*60*60*24));
  const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const mins = Math.floor((diff%(1000*60*60))/(1000*60));
  const secs = Math.floor((diff%(1000*60))/1000);
  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Rising embers behind the hero title =====
const embersContainer = document.getElementById('embers');
const emberCount = 60;
for(let i=0;i<emberCount;i++){
  const ember = document.createElement('div');
  ember.className = 'ember';
  const left = 20 + Math.random()*60; // keep embers roughly centered
  const delay = Math.random()*2;
  const duration = 3 + Math.random()*2.5;
  const drift = (Math.random()*80-40) + 'px';
  const size = 2 + Math.random()*3;
  ember.style.left = left + '%';
  ember.style.width = size + 'px';
  ember.style.height = size + 'px';
  ember.style.setProperty('--drift', drift);
  ember.style.animationDuration = duration + 's';
  ember.style.animationDelay = delay + 's';
  embersContainer.appendChild(ember);
}
