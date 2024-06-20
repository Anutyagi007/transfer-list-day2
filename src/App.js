import { useState } from "react";
import "./App.css";

const data = [
  { title: "First", id: 0, checked: false },
  { title: "Second", id: 1, checked: false },
  { title: "Third", id: 2, checked: false },
  { title: "Fourth", id: 3, checked: false },
];
function App() {
  const [leftItems, setLeftItems] = useState(data);
  const [rightItems, setRightItems] = useState([]);

  const checkedList = (list, id, checked) => {
    return list.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          checked: !checked
        }
      }
      return item;
    })
  }

  const handleClick = (id, checked, direction) => {
    if (direction === 'LEFT') {
      let copyList = [...leftItems];
      copyList = checkedList(copyList, id, checked);
      console.log(copyList);
      setLeftItems(copyList);
    } else {
      let copyList = [...rightItems];
      copyList = checkedList(copyList, id, checked);
      setRightItems(copyList);
    }
  }

  const resetItems = (list) => {
    return list.map((item) => {
      return {
        ...item,
        checked: false
      }
    })
  }
  const handleTransferBtn = (dir) => {
    if (dir === 'LEFT_TO_RIGHT') {
      if (leftItems.length) {
        const copyList = [...leftItems];
        const checkList = copyList.filter(item => item.checked);
        const unCheckList = copyList.filter(item => !item.checked);
        setRightItems(resetItems([...rightItems, ...checkList]));
        setLeftItems(unCheckList);
      }
    } else {
      const copyList = [...rightItems];
      const checkList = copyList.filter(item => item.checked);
      const unCheckList = copyList.filter(item => !item.checked);
      setLeftItems(resetItems([...leftItems, ...checkList]));
      setRightItems(unCheckList);
    }
  }
  return (
    <div className="App">
      <h1>Transfer List</h1>
      <div className='container'>
        <div className='box'>
          {
            leftItems.map(({ title, id, checked }) => (
              <div
                onClick={() => handleClick(id, checked, 'LEFT')}
                className={`item ${checked && 'checked'}`}
                id={id}
                key={id}
              >
                {title}
              </div>
            ))
          }
        </div>

        <div className='actions'>
          <button className="button"
            onClick={() => handleTransferBtn('LEFT_TO_RIGHT')}
          >Left</button>
          <button className="button"
            onClick={() => handleTransferBtn('RIGHT_TO_LEFT')}
          >Right</button>
        </div>

        <div className='box'>
          {
            rightItems.map(({ title, id, checked }) => (
              <div
                onClick={() => handleClick(id, checked, 'RIGHT')}
                className={`item ${checked && 'checked'}`}
                id={id}
                key={id}
              >
                {title}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;