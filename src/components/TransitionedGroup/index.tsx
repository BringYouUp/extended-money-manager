// import { useEffect, useRef, useState } from "react";

// export type TransitionedGroupProps<T> = {
//   trackBy: keyof T;
//   data: T[] & { is?: boolean };
//   render: (...args: unknown[]) => JSX.Element | undefined;
// };

// // export const TransitionedGroup = <T extends []>({
// //   data, trackBy, render
// // }: React.PropsWithChildren<TransitionedGroupProps<T>>):JSX.Element => {
// //   const [state, setState] = useState<T>()

// export function TransitionedGroup<T>(
//   props: React.PropsWithChildren<TransitionedGroupProps<T>>
// ) {
//   const { data, trackBy, render } = props;

//   const [state, setState] = useState<T[]>(data);

//   // const { state: dataToUnmount = [], afterClose } = useContext(
//   //   TransitionGroupContext
//   // );

//   const dataToHide = useRef(null);

//   useEffect(() => {
//     if (!state.length) {
//       setState(data);
//     } else {
//       setState((prev) => {
//         return prev.map((item) => {
//           const found = data.find(
//             (dataItem) => dataItem[trackBy] === item[trackBy]
//           );
//           if (!found) {
//             // dataToHide.current = item;
//           }
//           return {
//             ...item,
//             is: found,
//           };
//         });
//       });
//     }
//   }, [data]);

//   // useEffect(() => {
//   // if (dataToUnmount.length) {
//   //   afterClose(state, trackBy, )
//   // }
//   // }, [dataToUnmount]);

//   useEffect(() => {
//     console.log(`→ state`, state);
//   }, [state]);

//   return <>{state.map(render)}</>;
// }
