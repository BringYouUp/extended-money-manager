// import { Drawer } from "@models";
// import {
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   createContext,
//   useCallback,
//   useState,
// } from "react";

// type Props = {
//   children: ReactNode;
// };

// // type DrawersContextType = {
// //   drawers: Drawer[];
// //   setDrawers?: Dispatch<SetStateAction<Drawer[]>>;
// // };

// export const TransitionGroupContext = createContext(null);

// export function TransitionGroupProvider<T>({
//   children,
// }: React.PropsWithChildren<Props>) {
//   const [state, setState] = useState([]);

//   const toClose = useCallback((data) => {
//     setState((prev) => prev.concat(data));
//   }, []);

//   const afterClose = useCallback((data, trackBy, value) => {
//     setState((prev) => prev.filter((item) => item[trackBy] !== value));
//   }, []);

//   return (
//     <TransitionGroupContext.Provider value={{ state, toClose, afterClose }}>
//       {children}
//     </TransitionGroupContext.Provider>
//   );
// }
