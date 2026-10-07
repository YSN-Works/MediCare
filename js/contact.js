/* ========================================
   CONTACT PAGE JAVASCRIPT - contact.js
   Specific functionality for contact.html
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    initAppointmentForm();
    initDateRestrictions();
});

// ===== APPOINTMENT FORM =====
function initAppointmentForm() {
    var form = document.getElementById('appointmentForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        var name = document.getElementById('patientName').value.trim();
        var phone = document.getElementById('phoneNumber').value.trim();
        var service = document.getElementById('service').value;
        var doctor = document.getElementById('doctor').value;
        var date = document.getElementById('prefDate').value;
        var time = document.getElementById('prefTime').value;
        var message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !phone) {
            showFormAlert('Please fill in all required fields.', 'error');
            return;
        }

        if (!validatePhone(phone)) {
            showFormAlert('Please enter a valid Pakistani phone number.', 'error');
            return;
        }

        // Build WhatsApp message
        var whatsappMsg = buildWhatsAppMessage(name, phone, service, doctor, date, time, message);

        // Open WhatsApp with pre-filled message
        var whatsappURL = 'https://wa.me/923001234567?text=' + encodeURIComponent(whatsappMsg);

        // Show success animation
        showFormSuccess();

        // Open WhatsApp after delay
        setTimeout(function () {
            window.open(whatsappURL, '_blank');
        }, 1500);
    });
}

function validatePhone(phone) {
    // Pakistani phone number validation
    var regex = /^(03[0-9]{2}[-\s]?[0-9]{7}|042[-\s]?[0-9]{8}|\+92[0-9]{10})$/;
    return regex.test(phone.replace(/\s/g, ''));
}

function buildWhatsAppMessage(name, phone, service, doctor, date, time, message) {
    var msg = '🏥 *New Appointment Request*\n\n';
    msg += '👤 *Patient Name:* ' + name + '\n';
    msg += '📱 *Phone:* ' + phone + '\n';

    if (service) msg += '🩺 *Service:* ' + service + '\n';
    if (doctor) msg += '👨‍⚕️ *Doctor:* ' + doctor + '\n';
    if (date) msg += '📅 *Preferred Date:* ' + formatDate(date) + '\n';
    if (time) msg += '🕐 *Preferred Time:* ' + time + '\n';
    if (message) msg += '💬 *Message:* ' + message + '\n';

    msg += '\n_Sent from MediCare Clinic Website_';

    return msg;
}

function formatDate(dateStr) {
    var date = new Date(dateStr);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-PK', options);
}

function showFormSuccess() {
    var form = document.getElementById('appointmentForm');
    var formWrapper = form.parentElement;

    // Create success message
    var successDiv = document.createElement('div');
    successDiv.className = 'form-success show';
    successDiv.innerHTML = '' +
        '<i class="fas fa-check-circle"></i>' +
        '<h3>Appointment Request Sent!</h3>' +
        '<p>Your request has been sent via WhatsApp. Our team will confirm your appointment within 30 minutes.</p>' +
        '<br>' +
        '<button class="btn btn-primary" onclick="resetForm()"><i class="fas fa-redo"></i> Book Another</button>';

    form.style.display = 'none';
    formWrapper.appendChild(successDiv);
}

function resetForm() {
    var form = document.getElementById('appointmentForm');
    var successDiv = document.querySelector('.form-success');

    if (successDiv) successDiv.remove();
    form.style.display = 'block';
    form.reset();
}

function showFormAlert(message, type) {
    // Remove existing alerts
    var existing = document.querySelector('.form-alert');
    if (existing) existing.remove();

    var alert = document.createElement('div');
    alert.className = 'form-alert ' + type;
    alert.style.cssText = 'background:' + (type === 'error' ? '#FFEBEE' : '#E8F5E9') +
        ';color:' + (type === 'error' ? '#C62828' : '#2E7D32') +
        ';padding:12px 20px;border-radius:8px;margin-bottom:15px;font-size:0.9rem;' +
        'display:flex;align-items:center;gap:8px;animation:fadeInUp 0.3s ease;';
    alert.innerHTML = '<i class="fas fa-' + (type === 'error' ? 'exclamation-circle' : 'check-circle') + '"></i> ' + message;

    var form = document.getElementById('appointmentForm');
    form.insertBefore(alert, form.firstChild);

    setTimeout(function () {
        alert.remove();
    }, 5000);
}

// ===== DATE RESTRICTIONS =====
function initDateRestrictions() {
    var dateInput = document.getElementById('prefDate');
    if (!dateInput) return;

    // Set minimum date to today
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    dateInput.min = yyyy + '-' + mm + '-' + dd;

    // Set maximum date to 30 days from now
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    var maxDd = String(maxDate.getDate()).padStart(2, '0');
    var maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
    var maxYyyy = maxDate.getFullYear();
    dateInput.max = maxYyyy + '-' + maxMm + '-' + maxDd;

    // Disable Sundays
    dateInput.addEventListener('input', function () {
        var selectedDate = new Date(this.value);
        if (selectedDate.getDay() === 0) { // Sunday
            showFormAlert('Clinic is closed on Sundays. Please select another day.', 'error');
            this.value = '';
        }
    });
}

// ===== Input formatting =====
document.addEventListener('DOMContentLoaded', function () {
    var phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            // Auto-format phone number
            var value = this.value.replace(/[^0-9+]/g, '');
            if (value.length > 4 && !value.includes('-') && value.startsWith('03')) {
                value = value.substring(0, 4) + '-' + value.substring(4);
            }
            if (value.length > 12) {
                value = value.substring(0, 12);
            }
            this.value = value;
        });
    }
});