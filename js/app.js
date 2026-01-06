let bugs = [];

document.getElementById('addBug').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  //const li = document.createElement('li');
  //li.textContent = `${title}: ${description}`;

  //document.getElementById('bugList').appendChild(li);
  const now = new Date();
  const bug = { 
    id:Date.now(),
    title, 
    description,
    status:'Open',
    // Valores numéricos (útiles para ordenar/filtrar)
    fecha: now.toISOString().split('T')[0],  // "2025-01-06"
    hora: `${now.getHours()}:${now.getMinutes()}`,  // "14:35"
    
    // Valores de texto (para mostrar al usuario)
    fechaTexto: now.toLocaleDateString(),    // "1/6/2025"
    horaTexto: now.toLocaleTimeString(),     // "2:35:45 PM"
  };
  bugs.push(bug);

  localStorage.setItem('bugs', JSON.stringify(bugs));
  renderBugs();
});

const savedBugs = localStorage.getItem('bugs');
if (savedBugs) {
  bugs = JSON.parse(savedBugs);
  renderBugs();
}

function renderBugs() {
  const container = document.getElementById('bugList');
  container.innerHTML = '';

  bugs.forEach(bug => {
    const div = document.createElement('div');
    const btn = document.createElement('button');

    btn.textContent = 'Resolver'
    div.textContent = `${bug.title} - ${bug.description} -${bug.fechaTexto} ${bug.horaTexto} [${bug.status}]`;

    if (bug.status === 'Completado') {
      div.style.textDecoration = 'line-through';
      btn.disabled = true;
      }

    btn.addEventListener('click', () => {
      bug.status = 'Completado';
      localStorage.setItem('bugs', JSON.stringify(bugs));
      renderBugs();
    });

    container.appendChild(div);
    container.appendChild(btn);

    
  });

}