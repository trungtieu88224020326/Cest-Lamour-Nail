
import React, { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  type: 'income' | 'expense';
  item: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (item) setFormData(item);
  }, [item]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-dialog modal-dialog-centered modal-sm" style={{ maxWidth: '440px' }}>
        <div className="modal-content border-0 shadow-2xl rounded-5 overflow-hidden">
          <div className="modal-header border-bottom-0 p-5 pb-0 d-flex flex-column align-items-start">
            <div className="text-muted extra-small fw-bold text-uppercase mb-2 tracking-widest">Editor</div>
            <h3 className="modal-title fw-800 text-dark">Update Record</h3>
            <p className="text-muted small mt-1">Modify the financial details for <strong>{item?.item}</strong></p>
          </div>
          
          <div className="modal-body p-5 pt-4 d-flex flex-column gap-4">
            {type === 'income' ? (
              <>
                <div className="form-group">
                  <label className="form-label extra-small fw-800 text-muted text-uppercase tracking-wider mb-2">Credit Card (USD)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 text-muted">$</span>
                    <input 
                      className="form-control form-control-lg bg-light border-0 fw-bold px-3 py-3" 
                      type="number" 
                      value={formData.credit || 0}
                      onChange={(e) => setFormData({ ...formData, credit: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label extra-small fw-800 text-muted text-uppercase tracking-wider mb-2">Cash / Other (USD)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 text-muted">$</span>
                    <input 
                      className="form-control form-control-lg bg-light border-0 fw-bold px-3 py-3" 
                      type="number" 
                      value={formData.cash || 0}
                      onChange={(e) => setFormData({ ...formData, cash: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="form-group">
                <label className="form-label extra-small fw-800 text-muted text-uppercase tracking-wider mb-2">Expense Amount (USD)</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">$</span>
                  <input 
                    className="form-control form-control-lg bg-light border-0 fw-bold px-3 py-3 text-danger" 
                    type="number" 
                    value={formData.amount || 0}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer border-top-0 p-5 pt-0 d-flex gap-3">
            <button 
              type="button" 
              className="btn btn-light px-4 py-2 fw-bold rounded-pill text-muted flex-grow-1" 
              onClick={onClose}
            >
              Discard
            </button>
            <button 
              type="button" 
              className="btn btn-primary bg-indigo-600 border-0 px-4 py-2 fw-bold flex-grow-1 rounded-pill shadow-indigo" 
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
