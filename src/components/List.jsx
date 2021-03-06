import classnames from "classnames";
import { TODO_ITEM_TYPE } from "../common/constants";
function List(props) {
  const { list, toggleItem, deleteItem } = props;
  return (
    <ul>
      {list.map((item) => (
        <li
          key={item.id}
          data-id={item.id}
          className={classnames("todo-item", {
            complete: item.type === TODO_ITEM_TYPE.COMPLETE,
          })}
          onClick={toggleItem}
        >
          <span className="todo-item-text">{item.text}</span>
          <button onClick={deleteItem}>X</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
