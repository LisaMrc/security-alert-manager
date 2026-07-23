import samLogo from '../assets/sam_logo.svg'
import './Navbar.css'

export function Navbar() {
  return (
    <header className="navbar">
      <img src={samLogo} alt="SAM" className="navbar-logo" />

      <nav className="navbar-breadcrumb" aria-label="Breadcrumb">
        <a href="#" className="navbar-link">SAM</a>
        <span className="navbar-separator">/</span>
        <a href="#" className="navbar-link navbar-link--active">YOUR ALERTS</a>
      </nav>
    </header>
  )
}