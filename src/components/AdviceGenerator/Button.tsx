import "./Button.css";
/*
    =====================
    * BUTTON
    =====================
*/
type ButtonProps = {
    onClick: () => void;
};
export const Button: React.FC<ButtonProps> = ({ onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            <img src="icon-dice.svg" alt="button" />
        </button>
    );
};
