
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box, 
  Typography,
  Paper
} from '@mui/material';

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

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{
        sx: { backgroundColor: '#27272a', color: 'white' }
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid #3f3f46', fontWeight: 300, fontSize: '1rem' }}>
        Edit Item {type === 'income' ? 'InCome' : 'Expenses'}
      </DialogTitle>
      <DialogContent sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ width: 80, color: '#a1a1aa' }}>Item</Typography>
          <TextField 
            fullWidth 
            size="small" 
            disabled 
            value={formData.item || ''}
            sx={{ 
              backgroundColor: '#f4f4f5', 
              borderRadius: 1,
              '& .MuiInputBase-input': { fontSize: '0.875rem' }
            }}
          />
        </Box>

        {type === 'income' ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ width: 80, color: '#a1a1aa' }}>Credit:</Typography>
            <TextField 
              type="number" 
              size="small" 
              value={formData.credit || 0}
              onChange={(e) => setFormData({ ...formData, credit: parseFloat(e.target.value) })}
              sx={{ backgroundColor: 'white', borderRadius: 1, width: 100 }}
            />
            <Typography variant="body2" sx={{ color: '#a1a1aa', ml: 1 }}>Cash</Typography>
            <TextField 
              type="number" 
              size="small" 
              value={formData.cash || 0}
              onChange={(e) => setFormData({ ...formData, cash: parseFloat(e.target.value) })}
              sx={{ backgroundColor: 'white', borderRadius: 1, width: 100 }}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ width: 80, color: '#a1a1aa' }}>Amount</Typography>
            <TextField 
              type="number" 
              size="small" 
              fullWidth
              value={formData.amount || 0}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button 
          onClick={onClose} 
          sx={{ 
            color: 'white', 
            backgroundColor: '#52525b', 
            px: 4, 
            textTransform: 'none',
            '&:hover': { backgroundColor: '#3f3f46' }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          variant="outlined"
          sx={{ 
            color: 'white', 
            borderColor: '#71717a', 
            px: 4, 
            textTransform: 'none',
            '&:hover': { backgroundColor: '#18181b', borderColor: 'white' }
          }}
        >
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
