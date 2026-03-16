booking.js
const appointmentForm = document.getElementById('appointmentForm');
const successMessage = document.getElementById('formSuccessMessage');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent standard page reload

        // Basic validation
        const name = document.getElementById('pName').value.trim();
        const email = document.getElementById('pEmail').value.trim();
        const dept = document.getElementById('pDepartment').value;
        const date = document.getElementById('pDate').value;
        
        if (!name || !email || !dept || !date) {
            alert('Please fill out all required fields.');
            return;
        }

        // Simulate API call processing
        const btn = appointmentForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
        btn.disabled = true;

        setTimeout(() => {
            // Success State
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Hide form, show message
            appointmentForm.reset();
            successMessage.style.display = 'block';

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            // Note: In a real app we would send this data to a backend here.
        }, 1500);
    });
}
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    // This toggles the 'active' class we defined in the CSS above
    navLinks.classList.toggle('active');
    
    // Optional: Change icon from 'bars' to 'times' (X) when open
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});
