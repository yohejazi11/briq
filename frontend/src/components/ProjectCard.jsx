import useInView from "../hooks/useInView";

export default function ProjectCard({ project, delay = 0 }) {
    const [ref, isVisible] = useInView();

    return (
        <div
            ref={ref}
            className={`relative group rounded-md overflow-hidden shadow-lg bg-white transition-all duration-500
        ${isVisible ? "animate-fade-up" : "opacity-0 translate-y-10"}
        `}
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: "both",
            }}
        >
            <div className="h-[300px] overflow-hidden relative">
                <img
                    src={project.images[0] ? `http://localhost/buildcompany/api/${project.images[0]}` : "/default-image.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500"></div>
            </div>

            <div className="absolute bottom-0 left-0 w-full px-6 py-4 z-10">
                <h3 className="text-white text-xl font-bold drop-shadow-md">
                    {project.title}
                </h3>
            </div>
        </div>
    );
}
