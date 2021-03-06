/**
 *
 * @param {*} props
 * inputVal 输入值，类型string
 * handleKeyDown 键盘按下enter 的回调事件
 */
function Header(props) {
  const { inputVal, handleKeyDown, handleInputChange } = props;
  return (
    <header className="header">
      <input
        type="text"
        value={inputVal}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        placeholder="请输入新添加项"
      />
    </header>
  );
}

export default Header;
