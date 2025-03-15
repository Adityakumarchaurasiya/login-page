
const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

// Error elements
const errorElements = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    dob: document.getElementById('dobError'),
    exam: document.getElementById('examError'),
    examDate: document.getElementById('examDateError'),
    terms: document.getElementById('termsError')
};

// Validation functions
const validators = {
    name: (value) => value.trim().length >= 3,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    dob: (value) => {
        const dob = new Date(value);
        const today = new Date();
        return dob < today;
    },
    exam: (value) => value !== '',
    examDate: (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    },
    terms: (checked) => checked
};

// Error messages
const errorMessages = {
    name: 'Please enter a valid name (at least 3 characters)',
    email: 'Please enter a valid email address',
    dob: 'Please enter a valid date of birth',
    exam: 'Please select an exam',
    examDate: 'Exam date must be in the future',
    terms: 'You must agree to the terms and conditions'
};

// Show error message
function showError(field, message) {
    errorElements[field].textContent = message;
    errorElements[field].style.display = 'block';
}

// Clear error message
function clearError(field) {
    errorElements[field].textContent = '';
    errorElements[field].style.display = 'none';
}

// Validate field
function validateField(field, value) {
    let isValid = true;
    
    if (field === 'terms') {
        isValid = validators[field](document.getElementById(field).checked);
    } else {
        isValid = validators[field](value);
    }

    if (!isValid) {
        showError(field, errorMessages[field]);
    } else {
        clearError(field);
    }
    return isValid;
}

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Validate all fields
    const fields = ['name', 'email', 'dob', 'exam', 'examDate', 'terms'];
    fields.forEach(field => {
        const value = field === 'terms' ? 
            document.getElementById(field).checked : 
            document.getElementById(field).value;
        
        if (!validateField(field, value)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        successMessage.textContent = 'Registration successful! Redirecting...';
        successMessage.style.display = 'block';
        form.reset();
        
        // Simulate API call
        setTimeout(() => {
            successMessage.textContent = 'Registration completed successfully!';
        }, 2000);
    }
});

// Real-time validation
document.getElementById('full-name').addEventListener('input', (e) => {
    validateField('name', e.target.value);
});

document.getElementById('email').addEventListener('input', (e) => {
    validateField('email', e.target.value);
});

document.getElementById('dob').addEventListener('change', (e) => {
    validateField('dob', e.target.value);
});

document.getElementById('exam').addEventListener('change', (e) => {
    validateField('exam', e.target.value);
});

document.getElementById('exam-date').addEventListener('change', (e) => {
    validateField('examDate', e.target.value);
});

document.getElementById('terms').addEventListener('change', (e) => {
    validateField('terms', e.target.checked);
});
