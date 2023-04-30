import { useState, useRef } from "react";
import { Modal } from "@mui/material";
import SignaturePad from "react-signature-canvas";

import "./Signature.scss";
import { useDispatch } from "react-redux";
import { createSignatureActions } from "../../store/actions/docs/docs.actions";

export const Signature = ({ create }) => {
  const [isCanvasOpen, setCanvasOpen] = useState(false);
  const dispatch = useDispatch();
  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    const imageUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    dispatch(createSignatureActions.request(imageUrl))
    setCanvasOpen(false);
  };

  return (
    <div>
      <button onClick={() => setCanvasOpen(true)}>Create Sign</button>
        <Modal
        open={isCanvasOpen}
      >
        {<div className="signature">
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />
            <button onClick={save}>Save</button>
            <button onClick={clear}>Clear</button>
            <button onClick={() => setCanvasOpen(false)}>Close</button>
        </div>}
      </Modal>
    </div>
  );
}
