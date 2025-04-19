import Autheme from "../Autheme"
import CommandPalette from "@/components/BarDeRechercher";
import Logo from "../ui/Logo";
import Link from "next/link";
const Bibliothèque = [
    {
        title: "Bibliothèque",
        link: "/"
    },
    {
        title: "Cours",
        link: "/"
    }
]
const NavbarOne = () => {
    return (
        <div className="flex w-screen justify-between items-center px-7 py-4 inset-x-0 z-50 h-20 backdrop-blur-md">
            <Logo />
            <p className="text-foreground underline-offset-4 hover:underline hover:text-oranground">Découvrir</p>
            <CommandPalette />
            <div className="flex gap-9">
                {Bibliothèque.map((items) => (
                    <Link
                        key={items.title}
                        href={items.link}
                        className="text-foreground underline-offset-4 hover:underline hover:text-oranground"
                    >{items.title}</Link>
                ))}
            </div>
            <Autheme />
        </div>
    )
}

export default NavbarOne