import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store";

const useSelectorHook: TypedUseSelectorHook<RootState> = useSelector
export default useSelectorHook