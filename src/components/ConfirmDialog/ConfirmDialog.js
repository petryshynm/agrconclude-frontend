import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


export const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <button
          onClick={() => setOpen(false)}
        >
          No
        </button>
        <button
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </button>
      </DialogActions>
    </Dialog>
  );
};