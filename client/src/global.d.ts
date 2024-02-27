declare module '*.module.css' {
    const style: { [className: string]: string };
    export = style;
}

declare module '*.module.scss' {
    const style: { [key: string]: string };
    export = style;
}