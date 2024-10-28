interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {

    const {
        className = "",
        children,
        ...otherProps
    } = props

    return (
        <button 
            {...otherProps}
            className={className}
        >
            {children}
        </button>
    )
}