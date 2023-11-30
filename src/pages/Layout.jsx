import Modal from "components/common/modal/Modal";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Outlet />
      <Modal />
    </div>
  );
}
