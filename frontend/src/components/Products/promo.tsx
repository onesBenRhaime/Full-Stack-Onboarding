import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";

const Promo = () => {
	return (
		<>
			<div className="bg-white grainy-light py-3 overflow-hidden">
				{/* //add annimation to the promo text */}
				<div className=" font-semibold text-lg text-red-600  animate-marquee whitespace-nowrap ">
					<strong className="px-2">.</strong>Super Deal! Get 50% off on all
					products <strong className="px-2">.</strong>Super Deal! Get 50% off on
					all products <strong className="px-2">.</strong>Super Deal! Get 50%
					off on all products <strong className="px-2">.</strong>Super Deal! Get
					50% off on all products
				</div>
			</div>
		</>
	);
};

export default Promo;
