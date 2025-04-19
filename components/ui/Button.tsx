type ButtonProps = {
    Variantes: 'Default' | 'Links' | 'Oranground' | 'Outlineorange' | 'Outlinedefault' | 'Principal';
    Text: string;
    OnClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ Variantes, Text, OnClick }: ButtonProps) => {
    switch (Variantes) {
        case 'Links':
            return <button
                className="text-foreground underline-offset-4 hover:underline"
                onClick={OnClick}
            >
                {Text}
            </button>
        case 'Oranground':
            return <button
                className="bg-oranground hover:bg-oranground/90 text-white rounded-sm py-2 px-7"
                onClick={OnClick}
            >
                {Text}
            </button>
        case 'Outlineorange':
            return <button
                className="border border-oranground hover:bg-transparent/90 text-oranground rounded-sm py-2 px-7"
                onClick={OnClick}
            >
                {Text}
            </button>
        case 'Outlinedefault':
            return <button
                className="border border-foreground hover:bg-transparent/90 text-foreground rounded-sm py-2 px-7"
                onClick={OnClick}
            >
                {Text}
            </button>
        case 'Default':
            return <button
                className="bg-foreground dark:text-background hover:bg-foreground/90 text-white rounded-sm py-2 px-7"
                onClick={OnClick}
            >
                {Text}
            </button>
        case 'Principal':
            return <button
                className="bg-principal dark:text-background hover:bg-principal/90 text-white rounded-sm py-2 px-7"
                onClick={OnClick}
            >
                {Text}
            </button>
    }
}

export default Button