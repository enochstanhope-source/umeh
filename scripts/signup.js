// Firebase should be initialized by firebase-init.js
const auth = firebase.auth();

// Check auth state - if already signed in, redirect to logged-in homepage
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		window.location.href = 'index.html';
	}
});// Signup logic
document.addEventListener('DOMContentLoaded', function() {
	const signupForm = document.getElementById('signupForm');
	if (signupForm) {
			signupForm.addEventListener('submit', function(e) {
				e.preventDefault();
				const email = document.getElementById('email').value;
				const password = document.getElementById('password').value;
				const confirmPassword = document.getElementById('confirm-password').value;
				if (password !== confirmPassword) {
					alert('Passwords do not match!');
					return;
				}
				// Show loader modal
				if (typeof showSignupLoader === 'function') showSignupLoader();
				auth.createUserWithEmailAndPassword(email, password)
					.then((userCredential) => {
						// Hide loader modal
						if (typeof hideSignupLoader === 'function') hideSignupLoader();
						// Create success overlay
						let successOverlay = document.createElement('div');
						successOverlay.id = 'accountSuccessOverlay';
						successOverlay.innerHTML = `
							<div class="account-success-overlay">
								<div class="account-success-container">
									<div class="account-success-animations">
										<div class="account-success-spinner">
											<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
 												<circle cx="24" cy="24" r="20" stroke="#044bbd" stroke-width="6" opacity="0.12"/>
 												<circle cx="24" cy="24" r="20" stroke="#1e88e5" stroke-width="6" stroke-dasharray="100" stroke-dashoffset="60" style="animation:spinSvg 1s linear infinite;"/>
											</svg>
										</div>
										<div class="account-success-check">
											<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="#044bbd" stroke-width="3" fill="#fff"/><path d="M15 26.5L22 33L33 19" stroke="#044bbd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
										</div>
									</div>
									<div class="account-success-label">Account Created Successfully!</div>
								</div>
							</div>
						`;
						document.body.appendChild(successOverlay);
						// Add styles for overlay
															if (!document.getElementById('accountSuccessStyle')) {
																const style = document.createElement('style');
																style.id = 'accountSuccessStyle';
																style.innerHTML = `
																	.account-success-overlay {
																		position: fixed;
																		top: 0; left: 0;
																		width: 100vw; height: 100vh;
																		background: rgba(3, 37, 76, 0.55);
																		z-index: 99999;
																		display: flex;
																		align-items: center;
																		justify-content: center;
																		backdrop-filter: blur(8px) saturate(140%);
																	}
																		.account-success-container {
																		background: rgba(255,255,255,0.04);
																		border-radius: 20px;
																		box-shadow: 0 12px 44px rgba(2,48,97,0.16);
																		padding: 36px 44px;
																		min-width: 320px;
																		display: flex;
																		flex-direction: column;
																		align-items: center;
																		border: 1px solid rgba(13,71,161,0.12);
																		animation: popCheck 0.9s cubic-bezier(.22,1,.36,1);
																	}
																	.account-success-animations {
																		display: flex;
																		align-items: center;
																		justify-content: center;
																		gap: 14px;
																		margin-bottom: 18px;
																	}
																	.account-success-spinner {
																		width: 62px;
																		height: 62px;
																		display: flex;
																		align-items: center;
																		justify-content: center;
																		background: #ffffff;
																		border-radius: 50%;
																		box-shadow: 0 6px 18px rgba(2,48,97,0.12);
																	}
																	.account-success-check {
																		width: 62px;
																		height: 62px;
																		display: flex;
																		align-items: center;
																		justify-content: center;
																		background: #ffffff;
																		border-radius: 50%;
																		box-shadow: 0 6px 20px rgba(2,48,97,0.12);
																		animation: popCheck 0.9s cubic-bezier(.22,1,.36,1);
																	}
																	.account-success-label {
																		font-size: 1.25rem;
																		font-weight: 700;
																		color: #044bbd;
																		letter-spacing: 0.6px;
																		text-shadow: 0 2px 6px rgba(4,75,189,0.06);
																	}
																	@keyframes popCheck {
																		0% {transform: scale(0.5); opacity:0;}
																		80% {transform: scale(1.06); opacity:1;}
																		100% {transform: scale(1); opacity:1;}
																	}
																	@keyframes spinSvg {
																		100% { stroke-dashoffset: 0; transform: rotate(360deg); }
																	}
																`;
																document.head.appendChild(style);
															}
										// Remove overlay after 2.5s then redirect to logged-in homepage
										setTimeout(() => {
											if (successOverlay) successOverlay.remove();
											window.location.href = 'index.html';
										}, 2500);
								})
								.catch((error) => {
										alert(error.message);
								});
		});
	}
});
