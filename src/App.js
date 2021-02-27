import { useCallback, useState, useMemo } from "react";
import classnames from "classnames";

import "./App.css";

const TODO_ITEM_TYPE = {
  ACTIVE: "ACTIVE",
  COMPLETE: "COMPLETE",
};

const MENU_TYPE = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETE: "COMPLETE",
};

const menuList = [
  {
    text: "All",
    type: MENU_TYPE.ALL,
  },
  {
    text: "Active",
    type: MENU_TYPE.ACTIVE,
  },
  {
    text: "Complete",
    type: MENU_TYPE.COMPLETE,
  },
];

function App() {
  const [list, setList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [sortType, setSortType] = useState(MENU_TYPE.ALL);

  const handleInputChange = useCallback((event) => {
    setInputVal(event.target.value.trim());
  }, []);

  const handleAddItem = useCallback(() => {
    if (!inputVal) return;
    setList((prevList) => [
      { id: prevList.length, text: inputVal, type: TODO_ITEM_TYPE.ACTIVE },
      ...prevList,
    ]);
    setInputVal("");
  }, [inputVal]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key !== "Enter") return;
      handleAddItem();
    },
    [handleAddItem]
  );

  const toggleItem = useCallback((event) => {
    const targetId = Number(event.currentTarget.dataset.id);
    setList((prevList) =>
      prevList.map((item) => {
        if (item.id === targetId) {
          return {
            ...item,
            type:
              item.type === TODO_ITEM_TYPE.COMPLETE
                ? TODO_ITEM_TYPE.ACTIVE
                : TODO_ITEM_TYPE.COMPLETE,
          };
        }
        return item;
      })
    );
  }, []);

  const deleteItem = useCallback((event) => {
    event.stopPropagation();
    const targetId = Number(event.currentTarget.parentNode.dataset.id);
    setList((prevList) => prevList.filter((item) => item.id !== targetId));
  }, []);

  const handleMenuClick = useCallback((event) => {
    const type = event.currentTarget.dataset.type;
    setSortType(type);
  }, []);

  const listBySorted = useMemo(() => {
    if (sortType === MENU_TYPE.COMPLETE) {
      return list.filter((item) => item.type === TODO_ITEM_TYPE.COMPLETE);
    } else if (sortType === MENU_TYPE.ACTIVE) {
      return list.filter((item) => item.type === TODO_ITEM_TYPE.ACTIVE);
    }
    return list;
  }, [sortType, list]);

  return (
    <div className="App">
      <header className="header">
        <input
          type="text"
          value={inputVal}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          placeholder="请输入新添加项"
        />
      </header>
      <ul>
        {listBySorted.map((item) => (
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
      <footer>
        {menuList.map((item) => (
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
    </div>
  );
}

export default App;
