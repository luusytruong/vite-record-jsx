import { cn } from "@/utils/formatter";
import { NavLink } from "react-router-dom";
import Button from "./Button";

const NavItem = ({ to, icon, type = "a", onClick, ...props }) => {
  const Icon = icon;
  if (type === "button") {
    return (
      <li className={props?.className}>
        <Button
          size={props?.size || 18}
          className={cn(
            "flex h-[48px] active:scale-90 aspect-square items-center justify-center p-3 bg-white rounded-4xl shadow-sm hover:shadow-xl",
            props?.classButton
          )}
          icon={icon}
          text={props?.buttonText}
          classText={props?.classButtonText}
          onClick={onClick}
        />
      </li>
    );
  }

  return (
    <li
      className={cn(
        "flex rounded-4xl shadow-sm hover:shadow-xl bg-white active:scale-90",
        props?.className
      )}
    >
      <NavLink
        to={to}
        className="p-3 h-[48px] aspect-square flex items-center justify-center"
      >
        <Icon strokeWidth={1.6} size={18} />
      </NavLink>
    </li>
  );
};
export default NavItem;
