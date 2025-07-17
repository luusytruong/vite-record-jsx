import { cn } from "@/utils/formatter";

const Button = ({ icon: Icon, text, onClick, ...props }) => {
  return (
    <button onClick={onClick} className={cn("", props.className)}>
      {Icon && (
        <Icon
          strokeWidth={1.3}
          className={cn("", props.classIcon)}
          {...(props.size ? { size: props.size } : {})}
        />
      )}
      {text && <span className={cn("", props.classText)}>{text}</span>}
    </button>
  );
};

export default Button;
