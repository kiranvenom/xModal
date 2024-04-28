import { useState, useRef } from 'react';

const App = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const usernameRef = useRef(null);
	const emailRef = useRef(null);
	const phoneRef = useRef(null);
	const dobRef = useRef(null);
	const formRef = useRef(null);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleOutsideClick = (e) => {
		if (formRef.current && !formRef.current.contains(e.target)) {
			setModalOpen(false);
		}
	};

	const handleSubmit = (e) => {
		const username = usernameRef.current.value;
		const email = emailRef.current.value;
		const phone = phoneRef.current.value;
		const dob = dobRef.current.value;

		// if (!username || !email || !phone || !dob) {
		//   alert("Please fill in all fields.");
		//   return;
		// }

		if (!email.includes('@')) {
			alert('Invalid email');
			return;
		}

		if (!/^\d{10}$/.test(phone)) {
			alert('Invalid phone number');
			return;
		}

		const today = new Date();
		const selectedDate = new Date(dob);
		if (selectedDate > today) {
			alert('Invalid date of birth');
			return;
		}

		e.preventDefault();
		// If all validations pass, you can perform further actions here
		setModalOpen(false);
	};

	return (
		<div className='App' onClick={handleOutsideClick}>
			<h1>User Details Modal</h1>
			<button
				type='button'
				className='modal-button'
				onClick={handleOpenModal}>
				Open Form
			</button>
			{modalOpen && (
				<div className='modal' onClick={handleOutsideClick}>
					<div className='modal-content' ref={formRef}>
						<form onSubmit={handleSubmit}>
							<h3>Fill Details</h3>
							<label htmlFor='username'>Username:</label>
							<input
								type='text'
								id='username'
								ref={usernameRef}
								required
							/>
							<label htmlFor='email'>Email:</label>
							<input
								type='email'
								id='email'
								ref={emailRef}
								required
							/>
							<label htmlFor='phone'>Phone Number:</label>
							<input
								type='tel'
								id='phone'
								ref={phoneRef}
								required
							/>
							<label htmlFor='dob'>Date of Birth:</label>
							<input type='date' id='dob' ref={dobRef} required />
							<button
								type='submit'
								className='submit-button'
								onClick={handleSubmit}>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
