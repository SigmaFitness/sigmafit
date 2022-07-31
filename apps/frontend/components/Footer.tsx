import Link from "next/link";
import { SigmaFitLogoHead } from "./icons/SigmaFitLogoHead";

export const Footer = () => (
  <div className="mt-5">
    <footer className="footer footer-center p-10 bg-primary text-primary-content">
      <div>
        {SigmaFitLogoHead()}

        <p className="font-medium text-base">
          <span>Powered by</span> <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"><Link href='https://hashnode.com/'>Hashnode</Link></span> and <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"><Link href='https://planetscale.com/'>Planetscale</Link> </span>
        </p>
      </div>
    </footer>
  </div>
);



