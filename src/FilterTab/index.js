import "./index.css";

const FilterTab = (props) => {
  const { activeFilter, eachItem, changeActiveFilter } = props;
  const { uniqueId, name } = eachItem;

  const changeTab = () => {
    changeActiveFilter(eachItem);
  };

  return (
    <>
      <li
        onClick={changeTab}
        className={`filter-tab ${
          activeFilter !== null &&
          activeFilter.uniqueId === eachItem.uniqueId &&
          "active-filter-tab"
        }`}
      >
        {name}
      </li>
    </>
  );
};

export default FilterTab;
