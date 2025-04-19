import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/"}>
            <div className="font-major bg-transparent text-white text-center">
                <h1 className="text-2xl text-oranground">eduVibe</h1>
                <p className="text-[8px] text-oranground">"learning your way"</p>
            </div>
        </Link>
    )
}