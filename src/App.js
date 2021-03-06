import { useCallback, useState, useMemo } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";

import { TODO_ITEM_TYPE, MENU_TYPE } from "./common/constants";

import "./App.css";

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
      <Header
        inputVal={inputVal}
        handleKeyDown={handleKeyDown}
        handleInputChange={handleInputChange}
      />
      <List
        list={listBySorted}
        deleteItem={deleteItem}
        toggleItem={toggleItem}
      />
      <Footer sortType={sortType} handleMenuClick={handleMenuClick} />
    </div>
  );
}

export default App;
