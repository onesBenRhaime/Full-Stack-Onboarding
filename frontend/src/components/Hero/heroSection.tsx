import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";

const Hero = () => {
	return (
		<>
			<div className=" grainy-light container">
				<MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
					<section className=" py-5 flex flex-row justify-between items-center ">
						<div className="flex flex-col items-center lg:items-start">
							<h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-8xl">
								New Summer Collection
							</h1>
							<p className="text-gray-500 text-xl px-4 font-sans ">
								Shop the best clothes in the world
							</p>
							<button className="uppercase rounded-full text-black bg-primary px-4 py-2 m-4 text-lg font-medium">
								shop now
							</button>
						</div>
						<div className="flex-shrink-0">
							<Image
								src="/images/hero.png"
								className=""
								width={384}
								height={582}
								alt="Hero"
							/>
						</div>
					</section>
				</MaxWidthWrapper>
			</div>
		</>
	);
};

export default Hero;
