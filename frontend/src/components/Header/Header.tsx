import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";

const Header = async () => {
	return (
		<nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
			<MaxWidthWrapper>
				<div className="flex h-14 items-center justify-between border-b border-zinc-200">
					<Link href="/" className="flex z-40 font-semibold">
						E-<span className="text-primary">commerce</span>
					</Link>
					<nav className="">
						<ul className="flex space-x-8">
							<li>
								<Link href="/login" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link href="/login" className="hover:underline">
									Login
								</Link>
							</li>
							<li>
								<Link href="/register" className="hover:underline">
									Register
								</Link>
							</li>
						</ul>
					</nav>
					<div className="h-full flex items-center space-x-2">
						<Link href="/" className="hidden sm:block">
							<Image
								src="/images/search.png"
								width={18}
								height={18}
								alt="Search"
								className="me-2"
							/>
						</Link>
						<div className="h-4 w-px bg-zinc-600  sm:block" />
						<Image
							src="/images/Person.png"
							width={18}
							height={18}
							alt="Search"
							className="me-2"
						/>
						<Link href="/auth/login" className="me-2 hover:underline">
							Login
						</Link>
						<div className="me-2">/</div>
						<Link href="/auth/register" className="hover:underline">
							Register
						</Link>
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	);
};

export default Header;
