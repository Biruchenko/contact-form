const formField = document.querySelector('.form-contact');
const userFirstName = document.getElementById('first-name');
const userLastName = document.getElementById('last-name');
const userEmail = document.getElementById('email');
const userMsg = document.getElementById('message');
const queryType = document.querySelectorAll('input[name="user-query-type"]');
const consent = document.getElementById('consent');
const formBtn = document.querySelector('.form-contact__btn');
const successMsg = document.querySelector('.success-msg');

if (formField) {
	function validateFirstName() {
		const firstNameValue = userFirstName.value.trim();
		const nameRegex = /^[a-zA-Z\s]{2,50}$/;
		if (!nameRegex.test(firstNameValue) || firstNameValue === '') {
			showError(userFirstName.closest('.form-contact__item'));
			return null;
		}
		return firstNameValue;
	}

	function validateLastName() {
		const lastNameValue = userLastName.value.trim();
		const nameRegex = /^[a-zA-Z\s]{2,50}$/;
		if (!nameRegex.test(lastNameValue) || lastNameValue === '') {
			showError(userLastName.closest('.form-contact__item'));
			return null;
		}
		return lastNameValue;
	}

	function validateEmail() {
		const emailValue = userEmail.value.trim();
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(emailValue) || emailValue === '') {
			showError(userEmail.closest('.form-contact__item'));
			return null;
		}
		return emailValue;
	}

	function validateMsg() {
		const msg = userMsg.value.trim();
		const msgRegex = /^[a-zA-Z0-9\s.,!?'-]+$/;
		if (!msgRegex.test(msg) || msg.length < 10) {
			showError(userMsg.closest('.form-contact__item'));
			return null;
		}
		return msg;
	}

	function validateQueryType() {
		const isChecked = Array.from(queryType).some(query => query.checked);

		if (!isChecked) {
			showError(queryType[0].closest('.form-contact__item'));
			return null;
		}
		return isChecked;
	}

	function validateConsent() {
		if (!consent.checked) {
			showError(consent.closest('.form-contact__consent'));
			return null;
		}
		return true;
	}

	function showError(el) {
		el.classList.add('error');
		const input = el.querySelector('input, textarea');
		if (input) input.setAttribute('aria-invalid', 'true');
	}

	function resetErrors(els) {
		if (els && typeof els.forEach === 'function') {
			els.forEach(el => {
				el.classList.remove('error');
				const input = el.querySelector('input, textarea');
				if (input) input.setAttribute('aria-invalid', 'false');
			});
		} else if (els) {
			els.classList.remove('error');
			const input = els.querySelector('input, textarea');
			if (input) input.setAttribute('aria-invalid', 'false');
		}
	}

	userFirstName.addEventListener('input', () => resetErrors(userFirstName.closest('.form-contact__item')));
	userLastName.addEventListener('input', () => resetErrors(userLastName.closest('.form-contact__item')));
	userEmail.addEventListener('input', () => resetErrors(userEmail.closest('.form-contact__item')));
	userMsg.addEventListener('input', () => resetErrors(userMsg.closest('.form-contact__item')));

	queryType.forEach(radio => {
		radio.addEventListener('change', () => resetErrors(radio.closest('.form-contact__item')));
	});

	consent.addEventListener('change', () => resetErrors(consent.closest('.form-contact__consent')));

	formField.addEventListener('submit', e => {
		e.preventDefault();
		resetErrors(document.querySelectorAll('.form-contact__item'));

		const firstName = validateFirstName();
		const lastName = validateLastName();
		const email = validateEmail();
		const msg = validateMsg();
		const query = validateQueryType();
		const consent = validateConsent();

		if (firstName && lastName && email && msg && query && consent) {
			successMsg.classList.add('show');
			setTimeout(() => {
				formField.reset();
				successMsg.classList.remove('show');
				resetErrors(document.querySelectorAll('.form-contact__item'));
				resetErrors(document.querySelectorAll('.form-contact__consent'));
			}, 3000);
		}
	});
}
