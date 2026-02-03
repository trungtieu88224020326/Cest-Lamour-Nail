
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
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-sm" style={{ maxWidth: '400px' }}>
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-bottom-0 p-4 pb-0 d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-bold text-dark">Update {type === 'income' ? 'Entry' : 'Expense'}</h5>
            <span className="badge bg-primary-subtle text-primary py-2 px-3 fw-bold rounded-2">
              {item?.item || 'Item'}
            </span>
          </div>
          
          <div className="modal-body p-4 d-flex flex-column gap-4">
            {type === 'income' ? (
              <>
                <div className="form-group">
                  <label className="form-label small fw-bold text-secondary text-uppercase mb-2">Credit Card Portion</label>
                  <input 
                    className="form-control form-control-lg bg-light border-0 fw-semibold" 
                    type="number" 
                    value={formData.credit || 0}
                    onChange={(e) => setFormData({ ...formData, credit: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label small fw-bold text-secondary text-uppercase mb-2">Cash Portion</label>
                  <input 
                    className="form-control form-control-lg bg-light border-0 fw-semibold" 
                    type="number" 
                    value={formData.cash || 0}
                    onChange={(e) => setFormData({ ...formData, cash: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label className="form-label small fw-bold text-secondary text-uppercase mb-2">New Expense Amount</label>
                <input 
                  className="form-control form-control-lg bg-light border-0 fw-semibold" 
                  type="number" 
                  value={formData.amount || 0}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
            )}
          </div>

          <div className="modal-footer border-top-0 p-4 pt-2 gap-2">
            <button 
              type="button" 
              className="btn btn-link text-secondary fw-bold text-decoration-none px-3" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary btn-lg px-4 py-2 fw-bold flex-grow-1 rounded-3 shadow-sm" 
              onClick={handleSave}
            >
              Update Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
