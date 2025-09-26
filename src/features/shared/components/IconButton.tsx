interface IIConButtonProps {
  icon: string;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  name?: string;
  addStyle?: string;
}
export const IconButton: React.FC<IIConButtonProps> = ({
  icon,
  onClick,
  disabled,
  title,
  name,
  addStyle,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-primary ${disabled ? "disabled" : ""} ${addStyle}`}
      title={title}
      type="submit"
    >
      <span className="material-symbols-outlined">{icon}</span>
      {name}
    </button>
  );
};
