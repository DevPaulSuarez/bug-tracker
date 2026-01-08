

let currentFilter = 'all';

const bugListContainer = document.getElementById('bugList');

document.getElementById('addBug').addEventListener('click', () => {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title || !description) return alert('Debes poner título y descripción');

  // POST al backend
  fetch('http://localhost:3000/bugs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  })
  .then(res => res.json())
  .then(() => {
    // Limpiar inputs
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';

    // Refrescar lista de bugs desde backend
    renderBugs();
  })
  .catch(err => console.error('Error creando bug:', err));
});

function renderBugs() {
  bugListContainer.innerHTML = '';

  // GET del backend
  fetch('http://localhost:3000/bugs')
    .then(res => res.json())
    .then(bugs => {
      // Filtrar según currentFilter
      const filteredBugs = bugs.filter(bug => {
        if (currentFilter === 'all') return true;
        return bug.status === currentFilter;
      });

      filteredBugs.forEach(bug => {
        const div = document.createElement('div');
        const btn = document.createElement('button');

        div.textContent = `${bug.title} - ${bug.description} [${bug.status}]`;
        btn.textContent = 'Resolver';

        if (bug.status === 'resolved') {
          div.style.textDecoration = 'line-through';
          btn.disabled = true;
        }

        btn.addEventListener('click', () => {
          fetch(`http://localhost:3000/bugs/${bug.id}`, {
            method: 'PATCH'
          })
          .then(() => renderBugs())
          .catch(err => console.error('Error resolviendo bug:', err));
        });

        bugListContainer.appendChild(div);
        bugListContainer.appendChild(btn);
      });
    })
    .catch(err => console.error('Error cargando bugs:', err));
}

// Filtros
document.getElementById('filterAll').onclick = () => {
  currentFilter = 'all';
  renderBugs();
};

document.getElementById('filterOpen').onclick = () => {
  currentFilter = 'open';
  renderBugs();
};

document.getElementById('filterResolved').onclick = () => {
  currentFilter = 'resolved';
  renderBugs();
};

// Al cargar la página, renderizamos bugs
renderBugs();
