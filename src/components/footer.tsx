type Props = {
    copyright?: string
}

export const Footer = ({ copyright }: Props)  => {

    return (
        <footer>
            <h2>{copyright}</h2>
        </footer>
    )
}

export default Footer;
