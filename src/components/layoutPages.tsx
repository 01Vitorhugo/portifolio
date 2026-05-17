import NavBar from "./navBar";


export default function LayoutPages({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-auto flex flex-col p-10 gap-10">
            <NavBar />
            {children}
        </div>
    )
}