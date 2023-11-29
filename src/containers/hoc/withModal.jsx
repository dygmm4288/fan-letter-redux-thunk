import { setModalAllClose } from "modules/modal";
import { useDispatch } from "react-redux";

export default function withModal(Component) {
  return (props) => {
    const dispatch = useDispatch();
    const handleCancle = () => {
      dispatch(setModalAllClose());
    };

    return <Component handleCancle={handleCancle} {...props} />;
  };
}
