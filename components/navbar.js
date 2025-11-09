document.addEventListener('DOMContentLoaded', function() {
	const header = document.createElement('header');
	const nav = document.createElement('nav');
	const logo = document.createElement('div');
	logo.classList.add('logo');
	logo.className = "logo";
	const logoImg = document.createElement('img');
	logoImg.src = "../assets/favicon/apple-touch-icon.png";
	logoImg.alt = "Lènoir Lane logo";
	logo.appendChild(logoImg);
	const logoText = document.createElement('span');
	logoText.textContent = 'Lènoir Lane';
	logo.appendChild(logoText);
	nav.appendChild(logo);
	logo.src = "../assets/favicon/apple-touch-icon.png";
	nav.appendChild(logo);

	const ul = document.createElement('ul');
	const li = document.createElement('li');
	const a = document.createElement('a');
	a.href = '#home';
	a.textContent = 'Home';
	const b = document.createElement('a');
	b.href = '#about';
	b.textContent = 'About';
	const c = document.createElement('a');
	c.href = '#contact';
	c.textContent = 'Contact';
	const d = document.createElement('a');
	d.href = '#log-in';
	d.textContent = 'Log In';
	li.appendChild(a);
	li.appendChild(b);
	li.appendChild(c);
	li.appendChild(d);
	ul.appendChild(li);
	nav.appendChild(ul);
	header.appendChild(nav);

	document.body.prepend(header);
});

