
    document.getElementById('user-type').addEventListener('change', function() {
        const ownerInput = document.getElementById('owner-input');
        ownerInput.style.display = this.checked ? 'block' : 'none';
    });

