document.addEventListener('DOMContentLoaded',function(){
  var btn=document.querySelector('.mobile-menu-button'),nav=document.getElementById('main-nav');
  if(btn&&nav){btn.addEventListener('click',function(){var o=nav.classList.toggle('active');btn.setAttribute('aria-expanded',o)});
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('active')})});}
  var pop=document.getElementById('calendly-popup'),close=document.getElementById('close-calendly');
  document.querySelectorAll('.schedule-button').forEach(function(b){b.addEventListener('click',function(e){if(!pop)return;e.preventDefault();pop.style.display='flex';document.body.style.overflow='hidden'})});
  function hide(){pop.style.display='none';document.body.style.overflow=''}
  if(pop){if(close)close.addEventListener('click',hide);pop.addEventListener('click',function(e){if(e.target===pop)hide()});}
  document.querySelectorAll('form[action*="formsubmit.co"]').forEach(function(f){f.addEventListener('submit',function(e){
    var hp=f.querySelector('input[name="website"], input[name="company_url"], input[name="_honey"]');if(hp&&hp.value.trim()!==''){e.preventDefault();return false}})});
});
