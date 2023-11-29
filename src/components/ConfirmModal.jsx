import Button from "components/common/Button";
import Modal from "components/modal/Modal";
import withModal from "containers/hoc/withModal";

function ConfirmModal({ handleCancle, handleConfirm }) {
  return (
    <Modal text='정말로 삭제하시겠습니까?'>
      <Button handleClickEvent={handleCancle}>취소</Button>
      <Button handleClickEvent={handleConfirm}>확인</Button>
    </Modal>
  );
}

export default withModal(ConfirmModal);
