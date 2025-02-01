// import {
//     cloneElement,
//     createContext,
//     MouseEventHandler,
//     ReactElement,
//     ReactNode,
//     SetStateAction,
//     useContext,
//     useState,
// } from "react";
// import { createPortal } from "react-dom";

// interface FlyoutContextType {
//     control: ReactNode;
//     open: SetStateAction<any>;
//     close: MouseEventHandler;
// }

// const FlyoutContext = createContext<FlyoutContextType>({
//     control: "",
//     open: () => { },
//     close: () => { },
// });

// function Flyout({ children }: { readonly children: ReactNode }) {
//     const [control, setControl] = useState("");

//     const open = setControl;
//     const close = () => setControl("");

//     return (
//         <FlyoutContext.Provider value={{ control, open, close }}>
//             {children}
//         </FlyoutContext.Provider>
//     );
// }

// function Control({ children, id }: { readonly children: ReactElement; readonly id: string }) {
//     const { open } = useContext(FlyoutContext);

//     return cloneElement(children, {
//         onClick: () => open(id),
//     });
// }

// function Window({ children, id }: { children: ReactElement; id: string }) {
//     const { close, control } = useContext(FlyoutContext);

//     if (control !== id) return null;

//     return createPortal(
//         <Overlay>
//             <CloseButton onClick={close} />
//             <StyledFlyout>{cloneElement(children, { onClose: close })}</StyledFlyout>
//         </Overlay>,
//         document.body
//     );
// }

// Flyout.Control = Control;
// Flyout.Window = Window;

// export default Flyout;