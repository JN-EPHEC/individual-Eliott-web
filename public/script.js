// On attend que le DOM (le HTML) soit chargé avant de chercher les éléments
document.addEventListener('DOMContentLoaded', () => {
    
    // Éléments du DOM
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');

    console.log("Le script est bien chargé et le HTML est prêt !");

    // --- 1 & 2. Charger les utilisateurs au chargement de la page ---
    async function loadUsers() {
        try {
            // Utilisation de /api comme demandé
            const response = await fetch('/api'); 
            const users = await response.json();
            
            userList.innerHTML = '';

            users.forEach(user => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                
                // Conteneur pour le texte
                const textSpan = document.createElement('span');
                textSpan.textContent = `${user.firstName} ${user.lastName}`;
                
                // --- CRÉATION DU BOUTON SUPPRIMER ---
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'X';
                deleteBtn.className = 'btn btn-danger btn-sm'; // Style Bootstrap rouge
                
                // Action au clic : on passe l'ID à la fonction de suppression
                deleteBtn.onclick = () => deleteUser(user.id);

                li.appendChild(textSpan);
                li.appendChild(deleteBtn);
                userList.appendChild(li);
            });
        } catch (error) {
            console.error("Erreur lors du chargement :", error);
        }
    }

    // --- NOUVELLE FONCTION : Supprimer un utilisateur ---
    async function deleteUser(id) {
        if (confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
            try {
                // On appelle /api/:id pour la suppression
                const response = await fetch(`/api/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    loadUsers(); // On rafraîchit la liste
                } else {
                    alert("Erreur lors de la suppression");
                }
            } catch (error) {
                console.error("Erreur lors du DELETE :", error);
            }
        }
    }

    // --- 3. Intercepter la soumission du formulaire ---
    if (userForm) {
        userForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const userData = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value
            };

            try {
                const response = await fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    firstNameInput.value = '';
                    lastNameInput.value = '';
                    loadUsers(); 
                } else {
                    alert("Erreur lors de l'ajout");
                }
            } catch (error) {
                console.error("Erreur lors du POST :", error);
            }
        });
    }

    // Appel initial au démarrage
    loadUsers();
});