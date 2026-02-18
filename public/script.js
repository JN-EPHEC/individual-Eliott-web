document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    async function loadUsers() {
        try {
            const response = await fetch('/api');
            const data = await response.json();
            
            userList.innerHTML = '';

            // Sécurité : on vérifie que data est bien un tableau
            const users = Array.isArray(data) ? data : [];

            users.forEach(user => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm';
                li.innerHTML = `
                    <span>${user.firstName} ${user.lastName}</span>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Supprimer</button>
                `;
                userList.appendChild(li);
            });
        } catch (error) {
            console.error("Erreur UI:", error);
        }
    }

    window.deleteUser = async (id) => {
        if (!confirm("Supprimer ?")) return;
        await fetch(`/api/${id}`, { method: 'DELETE' });
        loadUsers();
    };

    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value
        };

        const response = await fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            userForm.reset();
            loadUsers();
        } else {
            const err = await response.json();
            alert(err.error);
        }
    });

    loadUsers();
});