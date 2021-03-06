import classnames from "classnames";
import { MENU_LIST } from "../common/constants";
function Footer(props) {
  const { sortType, handleMenuClick } = props;
  return (
    <footer>
      {MENU_LIST.map((item) => (
        <div
          data-type={item.type}
          className={classnames("menu-item", {
            active: sortType === item.type,
          })}
          key={item.type}
          onClick={handleMenuClick}
        >
          {item.text}
        </div>
      ))}
    </footer>
  );
}

export default Footer;
