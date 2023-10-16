const Footer = () => {
	return(
	<footer className = "flex justifyCenter">
    	<nav className = "flex justifyBetween">
        	<ul className = "flex justifyAround">
				<li><a rel="noreferrer" target = "_blank" href="https://twitter.com/choir241" className="fa-brands fa-twitter"><p className = "displayNone">Twitter</p></a></li>

				<li><a rel="noreferrer" target = '_blank' href="https://www.linkedin.com/in/richard-choir/" className="fa-brands fa-linkedin"><p className = 'displayNone'>LinkedIn</p></a></li>

				<li><a rel="noreferrer" target = "_blank"href="https://www.instagram.com/225kh_drw/?hl=en" className="fa-brands fa-instagram"><p className = "displayNone">Instagram</p></a></li>

				<li><a rel="noreferrer" target = "_blank"href="https://github.com/choir27" className="fa-brands fa-github"><p className = "displayNone">Github</p></a></li>
			</ul>

			<small>
            AutoAligners &copy; 2023. All rights are reserved
        	</small>
    	</nav>
  
    </footer>
	)
}

export default Footer