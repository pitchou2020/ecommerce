import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useAuth =()=>{
    const context = useContext(ThemeContext)
    return context;
}