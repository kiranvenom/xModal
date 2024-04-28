import React, { useState, useRef, FormEvent, MouseEvent } from 'react';

interface Props {}

const App: React.FC<Props> = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const dobRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLDivElement>(null);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
		if (formRef.current && !formRef.current.contains(e.target as Node)) {
			setModalOpen(false);
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!usernameRef.current ||
			!emailRef.current ||
			!phoneRef.current ||
			!dobRef.current
		) {
			return;
		}

		const username = usernameRef.current.value;
		const email = emailRef.current.value;
		const phone = phoneRef.current.value;
		const dob = dobRef.current.value;

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
							<button type='submit' className='submit-button'>
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
