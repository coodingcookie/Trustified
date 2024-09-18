document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light-mode';

    // Apply the saved theme on page load
    document.body.classList.add(currentTheme);
    themeToggleBtn.innerHTML = currentTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
        themeToggleBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Sample data (replace with your actual data)
    const medicines = [
        { name: 'Aspirin', components: 'Acetylsalicylic Acid' },
        { name: 'Paracetamol', components: 'Acetaminophen' },
        { name: 'Ibuprofen', components: 'Ibuprofen' },
        { name: 'Cetrizine', components: 'Paracetamol' }
        // Add more medicines and components here
    ];

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = ''; // Clear previous results

        if (query) {
            const filteredMedicines = medicines.filter(medicine =>
                medicine.name.toLowerCase().includes(query) ||
                medicine.components.toLowerCase().includes(query)
            );

            if (filteredMedicines.length > 0) {
                searchResults.style.display = 'block';
                filteredMedicines.forEach(medicine => {
                    const li = document.createElement('li');
                    li.textContent = `${medicine.name} - ${medicine.components}`; // Use backticks for template literals
                    li.addEventListener('click', () => {
                        window.location.href = `medicine-details.html?name=${encodeURIComponent(medicine.name)}`; // Use backticks for template literals
                    });
                    searchResults.appendChild(li);
                });
            } else {
                searchResults.style.display = 'none';
            }
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Hide search results when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
});
