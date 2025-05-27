window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', function () {
      const title = btn.getAttribute('data-title');
      const description = btn.getAttribute('data-description');
      const image = btn.getAttribute('data-image');
      const details = btn.getAttribute('data-details') || '';
      const price = btn.parentElement.querySelector('.snipcart-add-item').getAttribute('data-item-price');
      const slug = btn.parentElement.querySelector('.snipcart-add-item').getAttribute('data-item-id');
      // Sprawdź czy modal już istnieje
      if(document.getElementById('product-modal')) return;
      document.body.classList.add('modal-open');
      const modal = document.createElement('div');
      modal.id = 'product-modal';
      modal.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" id="modal-overlay">
          <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onclick="event.stopPropagation()">
            <button class="absolute top-4 right-4 focus:outline-none" aria-label="Zamknij" onclick="closeModal()" style="background:none;border:none;">
              <svg width="28" height="28" viewBox="0 0 28 28" stroke="#232946" stroke-width="2"><line x1="7" y1="7" x2="21" y2="21"/><line x1="21" y1="7" x2="7" y2="21"/></svg>
            </button>
            <img src="${image}" alt="${title}" class="w-full h-48 object-cover rounded-xl mb-4 shadow" />
            <h3 class="text-2xl font-semibold mb-2 text-[#232946]">${title}</h3>
            <p class="text-base text-gray-700 mb-4">${description}</p>
            ${details ? `<div class="text-sm text-gray-600 border-t pt-2 mb-4">${details}</div>` : ''}
            <button class="snipcart-add-item btn w-full"
              data-item-id="${slug}"
              data-item-price="${price}"
              data-item-url="/"
              data-item-description="${description}"
              data-item-image="${image}"
              data-item-name="${title}">
              Dodaj do koszyka
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      window.closeModal = function() {
        document.body.classList.remove('modal-open');
        document.getElementById('product-modal')?.remove();
      }
      document.getElementById('modal-overlay').onclick = window.closeModal;
    });
  });
});
