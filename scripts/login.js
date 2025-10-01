// Firebase should already be initialized by firebase-init.js
const auth = firebase.auth();

// Check auth state - redirect already logged-in users
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// User is signed in, redirect to the logged-in homepage
		window.location.href = 'index.html';
	}
});// Login logic
document.addEventListener('DOMContentLoaded', function() {
	const loginForm = document.getElementById('loginForm');
	const loaderContainer = document.querySelector('.loader-container');
	const loader = document.querySelector('.loader');

	function showLoader() {
		loaderContainer.style.display = 'flex';
	}

	function hideLoader() {
		loaderContainer.style.display = 'none';
		loader.classList.remove('success');
	}

	function showSuccessAndRedirect() {
		loader.classList.add('success');
		setTimeout(() => {
			window.location.href = 'index.html';
		}, 3000);
	}

	if (loginForm) {
		loginForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const email = document.getElementById('email').value;
			const password = document.getElementById('password').value;
			
			showLoader();
			
			auth.signInWithEmailAndPassword(email, password)
				.then((userCredential) => {
					showSuccessAndRedirect();
				})
				.catch((error) => {
					hideLoader();
					alert(error.message);
				});
		});
	}
});
