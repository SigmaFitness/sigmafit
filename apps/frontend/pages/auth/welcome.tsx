import { MetaHead } from "../../components/Head";
import { LogoWithoutBeta } from "../../components/Logo";
import { witNoAuthHOC } from "../../hooks/withNoAuthHOC";
import { TwitterIcon } from "../../components/icons/TwitterIcon";
import { GitHubIcon } from "../../components/icons/GitHubIcon";
import { GoogleIcon } from "../../components/icons/GoogleIcon";

const Welcome = () => {
  return (
    <div>
      <MetaHead />

      <div className="form-container mt-[20vh] absolute">
        <div className="flex justify-center my-4">
          <LogoWithoutBeta className={"w-44 text-black"} />
        </div>
        <div className="prose mb-2 mt-7">
          <h3 className="font-extrabold">Welcome Warriors!</h3>
        </div>

        <div className="text-gray-700 text-sm font-medium mb-2">
          Unleash the{" "}
          <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
            true power
          </span>{" "}
          of this platform by logging in:
        </div>

        <div className="flex flex-col gap-4 my-6">
          <div
            onClick={() => (window.location.href = `/api/auth/google/start`)}
            className="bg-white h-fit text-black hover:text-white btn rounded-md shadow-xl py-3 flex justify-center items-center gap-2"
          >
            <span>
              <GoogleIcon />
            </span>{" "}
            <span>Continue with Google</span>
          </div>
          <div
            onClick={() => (window.location.href = `/api/auth/github/start`)}
            className="bg-white h-fit text-black hover:text-white btn rounded-md shadow-xl py-3 hover:fill-white flex justify-center items-center gap-2"
          >
            <span>
              <GitHubIcon />
            </span>{" "}
            <span>Continue with GitHub</span>
          </div>
          <div
            onClick={() => (window.location.href = `/api/auth/twitter/start`)}
            className="bg-white h-fit text-black hover:text-white btn rounded-md shadow-xl py-3 hover:fill-white flex justify-center items-center gap-2"
          >
            <span>
              <TwitterIcon />
            </span>{" "}
            <span>Continue with Twitter</span>
          </div>

          <div className="text-gray-500 mt-4 text-sm mb-2">
            By logging in you accept our Privacy Policy and Terms of Service.
          </div>
        </div>
      </div>
    </div>
  );
};

export default witNoAuthHOC(Welcome);


