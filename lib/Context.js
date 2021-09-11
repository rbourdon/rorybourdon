import {
  useState,
  useContext,
  useReducer,
  createContext,
  useEffect,
} from "react";

const StateContext = createContext();
const DispatchContext = createContext();

function filterReducer(filters, action) {
  switch (action.type) {
    case "Boxes":
      return {
        boxes: !filters.boxes,
        kits: filters.kits,
        products: filters.products,
      };
    case "Kits":
      return {
        boxes: filters.boxes,
        kits: !filters.kits,
        products: filters.products,
      };
    case "Products":
      return {
        boxes: filters.boxes,
        kits: filters.kits,
        products: !filters.products,
      };
  }
}

export const AppProvider = ({ children }) => {
  const [budget, setBudget] = useState({ min: 0, max: 10000 });
  const [box, setBox] = useState({});
  const [orderData, setOrderData] = useState({});
  const [search, setSearch] = useState("");
  const [fmgBoxStatus, setFMGBoxStatus] = useState({ current: 0, velocity: 0 });
  const [filters, toggleFilter] = useReducer(filterReducer, {
    boxes: false,
    kits: false,
    products: true,
  });

  useEffect(() => {
    setBox(JSON.parse(window.localStorage.getItem("box")) || {});
    setOrderData(JSON.parse(window.localStorage.getItem("orderData")) || {});
  }, []);

  useEffect(() => {
    window.localStorage.setItem("box", JSON.stringify(box));
  }, [box]);

  useEffect(() => {
    window.localStorage.setItem("orderData", JSON.stringify(orderData));
  }, [orderData]);

  return (
    <DispatchContext.Provider
      value={{
        updateBudget: setBudget,
        updateBox: setBox,
        updateOrderData: setOrderData,
        updateSearch: setSearch,
        toggleFilter: toggleFilter,
        updateFMGBox: setFMGBoxStatus,
      }}
    >
      <StateContext.Provider
        value={{
          getBudget: budget,
          getBox: box,
          getOrderData: orderData,
          getSearch: search,
          getFilters: filters,
          getFMGBoxStatus: fmgBoxStatus,
        }}
      >
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAppState = () => useContext(StateContext);
export const useAppDispatch = () => useContext(DispatchContext);
