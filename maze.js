// Architecture :THE MAZE PAC MAN 

//Murs (walls) && PacMan && Paths &&& Dots && Fantomes(ghosts)

export const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 1],
    [1, 6, 1, 6, 1, 6, 6, 1, 1, 1, 6, 6, 6, 1, 1, 1, 6, 6, 1, 6, 1, 6, 1],
    [1, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 1],
    [1, 1, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 1],
    [1, 6, 6, 6, 1, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 1],
    [1, 6, 1, 6, 1, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 1, 1, 1, 1],
    [1, 6, 6, 6, 1, 6, 1, 6, 1, 1, 1, 1, 1, 1, 1, 6, 1, 6, 6, 6, 6, 6, 1],
    [1, 1, 1, 1, 1, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1],
    [1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1],
    [1, 6, 6, 1, 1, 1, 1, 6, 1, 1, 6, 6, 6, 1, 1, 6, 1, 1, 1, 1, 6, 6, 1],
    [6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 1, 3, 6, 4, 6, 5, 1, 6, 6, 6, 6, 6, 6, 6, 6],
    [1, 6, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1],
    [1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1],
    [1, 1, 1, 1, 6, 6, 1, 6, 6, 6, 6, 2, 6, 6, 6, 6, 1, 6, 6, 1, 1, 1, 1],
    [1, 6, 6, 1, 6, 6, 1, 6, 1, 1, 1, 1, 1, 1, 1, 6, 1, 6, 6, 1, 6, 6, 1],
    [1, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 1],
    [1, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 1],
    [1, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 1],
    [1, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 1],
    [1, 6, 1, 6, 6, 6, 6, 1, 1, 1, 6, 6, 6, 1, 1, 1, 6, 6, 6, 6, 1, 6, 1],
    [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const table = document.getElementById('maze');

maze.forEach(row => {
    const tr = document.createElement('tr');

    row.forEach(cell => {
        const td = document.createElement('td');

        if (cell === 1) {
            td.classList.add('wall');
        }
        else if (cell === 2) {
            td.classList.add('path');
            const pacContainer = document.createElement('div');
            td.id = 'pacman-container';
            pacContainer.innerHTML = `<img src="jeu.png" alt="Pac-Man">`;
            td.appendChild(pacContainer);
        }
        else if (cell === 3 || cell === 4 || cell === 5) {
            td.classList.add('path', 'ghost-cell');
            const ghost = document.createElement('div');
            ghost.className = 'ghosts-container';
            const imgSrc = cell === 3 ? './assets/jeu (3).png' :
                cell === 4 ? './assets/jeu (4).png' : './assets/jeu (5).png';
            ghost.innerHTML = `<img src="${imgSrc}" alt="Ghost">`;
            td.appendChild(ghost);
        }
        else if (cell === 6) {
            td.classList.add('path', 'dot-cell');
            const dot = document.createElement('div');
            dot.innerHTML = `<svg width="30%" height="30%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="6" fill="#FFEB3B" stroke="#FFD700" stroke-width="1.5"/>
        </svg>
    `;
            dot.className = 'pac-dot';

            td.appendChild(dot);
        }
        else {
            td.classList.add('path');
        }

        tr.appendChild(td);
    });

    table.appendChild(tr);
});
