document.getElementById('addBug').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const li = document.createElement('li');
  li.textContent = `${title}: ${description}`;

  document.getElementById('bugList').appendChild(li);
});