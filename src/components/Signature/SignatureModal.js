import { useState, useRef } from "react";
import { Modal } from "@mui/material";
import SignaturePad from "react-signature-canvas";

import { useDispatch, useSelector } from "react-redux";
import { createSignatureActions } from "../../store/actions/docs/docs.actions";
import { useOnClickOutside } from "../../services/hooks/useClickOutside";

import "./SignatureModal.scss";
import classNames from "classnames";

export const SignatureModal = () => {
  const [isCanvasOpen, setCanvasOpen] = useState(false);
  const { signature } = useSelector((state) => state.docs);
  const dispatch = useDispatch();
  const signCanvas = useRef(null);

  const onClear = () => signCanvas.current.clear();
  
  const onClose = () => setCanvasOpen(false);
  
  const onSave = () => {
    const imageUrl = signCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    dispatch(createSignatureActions.request(imageUrl))
    setCanvasOpen(false);
  };
  
  useOnClickOutside(signCanvas, onClose);
  
  return (
    <div>
      <button className={classNames("signature__btn-add", {
        'signature__btn-add_plus': !signature
      })} onClick={() => setCanvasOpen(true)}>{signature ? 'Edit' : '+'}</button>
        <Modal
        open={isCanvasOpen}
      >
        {<div className="signature">
            <SignaturePad
              ref={signCanvas}
              canvasProps={{ className: "signature__canvas"}}
            />
            <div className="signature__navigation">
              <button onClick={onSave}>Save</button>
              <button onClick={onClear}>Clear</button>
              <button onClick={onClose}>Close</button>
            </div>
        </div>}
      </Modal>
    </div>
  );
}
