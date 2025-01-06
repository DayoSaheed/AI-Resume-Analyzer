document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value
        };

        try {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success message
            alert('Message sent successfully!');
            contactForm.reset();
        } catch (error) {
            alert('Failed to send message. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            const submitButton = contactForm.querySelector('button');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
});