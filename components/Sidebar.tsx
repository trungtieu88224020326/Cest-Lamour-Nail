
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar bg-white d-none d-lg-flex flex-column h-vh-100 sticky-top">
      <div className="p-4 mb-2">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-indigo-600 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
            <i className="fas fa-leaf text-white small"></i>
          </div>
          <span className="fw-800 fs-5 tracking-tighter">FUSE</span>
        </div>
      </div>
      
      <div className="px-3 flex-grow-1">
        <div className="text-muted extra-small fw-bold text-uppercase px-3 mb-2">Navigation</div>
        <a href="#" className="nav-link-fuse active">
          <i className="fas fa-th-large"></i>
          <span>Project</span>
        </a>
        <a href="#" className="nav-link-fuse">
          <i className="fas fa-chart-pie"></i>
          <span>Analytics</span>
        </a>
        <a href="#" className="nav-link-fuse">
          <i className="fas fa-calendar-alt"></i>
          <span>Calendar</span>
        </a>
        <a href="#" className="nav-link-fuse">
          <i className="fas fa-users"></i>
          <span>Team</span>
        </a>

        <div className="text-muted extra-small fw-bold text-uppercase px-3 mb-2 mt-4">Accounting</div>
        <a href="#" className="nav-link-fuse">
          <i className="fas fa-file-invoice-dollar"></i>
          <span>Invoices</span>
        </a>
        <a href="#" className="nav-link-fuse">
          <i className="fas fa-wallet"></i>
          <span>Payroll</span>
        </a>
      </div>

      <div className="p-3 border-top mt-auto">
        <div className="bg-light p-3 rounded-4 d-flex align-items-center gap-3">
          <div className="bg-indigo-600 rounded-circle text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <i className="fas fa-question"></i>
          </div>
          <div>
            <div className="fw-bold small">Help Center</div>
            <div className="text-muted extra-small">Support docs</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
