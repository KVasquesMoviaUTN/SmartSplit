import { Github, Linkedin, Briefcase } from "lucide-react";

export function Footer() {
	return (
		<footer className="w-full py-6 mt-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="text-sm text-muted-foreground">
					© {new Date().getFullYear()} Smart Split. Built by <span className="font-semibold text-foreground">Kalil Vasques Movia</span>.
				</div>

				<div className="flex items-center gap-6">
					<a
						href="https://github.com/KVasquesMoviaUTN"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"
					>
						<Github className="w-4 h-4" />
						<span>GitHub</span>
					</a>
					<a
						href="https://www.linkedin.com/in/kalil-vasques-movia/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"
					>
						<Linkedin className="w-4 h-4" />
						<span>LinkedIn</span>
					</a>
					<a
						href="https://new-portfolio-ten-kappa-59.vercel.app/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"
					>
						<Briefcase className="w-4 h-4" />
						<span>Portfolio</span>
					</a>
				</div>
			</div>
		</footer>
	);
}
