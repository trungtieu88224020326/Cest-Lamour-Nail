
import React from 'react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom py-3">
      <div className="container-xl">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <div className="bg-primary rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', boxShadow: '0 4px 6px -1px rgb(37 99 235 / 0.2)' }}>
            <i className="fas fa-chart-line text-white fs-5"></i>
          </div>
          <span className="fw-bold tracking-tight text-dark h5 mb-0">
            Cest Lamour Nail<span className="text-primary">. Manager</span>
          </span>
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dashboardNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="dashboardNavbar">
          <ul className="navbar-nav gap-lg-2 mt-3 mt-lg-0">
            {NAV_ITEMS.map((item) => (
              <li key={item} className="nav-item">
                <button 
                  className={`nav-link border-0 fw-bold px-3 py-2 rounded-2 transition-all ${item === 'MONTH' ? 'bg-light-blue text-primary' : 'text-muted'}`}
                  style={{ fontSize: '0.8rem' }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
