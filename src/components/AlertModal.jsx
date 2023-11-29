import withModal from "containers/hoc/withModal";
import Button from "./common/Button";
import Modal from "./modal/Modal";

function AlertModal({ handleCancle, text }) {
  return (
    <Modal text={text}>
      <Button handleClickEvent={handleCancle}>확인</Button>
    </Modal>
  );
}

export default withModal(AlertModal);
