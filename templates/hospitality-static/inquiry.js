const form = document.querySelector('#stay-inquiry');
if (form) {
  const status = document.querySelector('#inquiry-status');
  const actions = document.querySelector('#draft-actions');
  const arrival = form.elements.arrival, departure = form.elements.departure;
  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  arrival.min = localDate;
  function clearDraft() { actions.hidden=true; status.textContent=''; departure.setCustomValidity(''); }
  form.addEventListener('input',clearDraft);
  form.addEventListener('change',clearDraft);
  arrival.addEventListener('change',()=>{ departure.min=arrival.value; });
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if (departure.value<=arrival.value) { departure.setCustomValidity('Departure must be after arrival.'); form.reportValidity(); return; }
    if (!form.reportValidity()) return;
    const room = form.elements.room.selectedOptions[0].textContent;
    const draft = `Stay inquiry\n\nName: ${form.elements.name.value.trim()}\nEmail: ${form.elements.email.value.trim()}\nArrival: ${arrival.value}\nDeparture: ${departure.value}\nGuests: ${form.elements.guests.value}\nRoom: ${room}\n\n${form.elements.message.value.trim()}\n\nPlease confirm availability, price and booking terms.`;
    document.querySelector('#email-draft').href=`mailto:${form.dataset.email}?subject=${encodeURIComponent('Stay inquiry')}&body=${encodeURIComponent(draft)}`;
    const whatsapp = document.querySelector('#whatsapp-draft');
    if (whatsapp) whatsapp.href=`https://wa.me/${form.dataset.whatsapp.replace('+','')}?text=${encodeURIComponent(draft)}`;
    actions.hidden=false; status.textContent='Draft prepared. Open your preferred app, review it and send. It has not been sent yet.';
    document.querySelector('#email-draft').focus();
  });
  document.querySelectorAll('[data-room]').forEach(link=>link.addEventListener('click',()=>{form.elements.room.value=link.dataset.room;clearDraft();}));
}
