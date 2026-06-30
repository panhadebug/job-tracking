interface NavbarProps {
  userEmail: string;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userEmail, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-left">
          <button className="menu-toggle-btn" title="Menu" onClick={onLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="navbar-brand-title">Job Application Tracker</span>
        </div>

        <div className="navbar-right">
          <button className="navbar-avatar-btn" title={`Logged in as ${userEmail}`} onClick={onLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
