import { NextPage } from "next";
import Link from "next/link";
import { useGetCurrentUserQuery } from "../api";
import { MetaHead } from "../components/Head";
import { Navbar } from "../components/Navbar";
import { witNoAuthHOC } from "../hooks/withNoAuthHOC";
import Image from "next/future/image";

const Home: NextPage = () => {
  const { isError, isLoading, data } = useGetCurrentUserQuery();

  return (
    <div>
      <MetaHead />

      <div className="landing-hero">
        <Navbar />
        {/* <Logo className="w-36 px-4 py-4"/> */}
        <div className="hero-content  text-center lg:pt-20  flex-col lg:flex-row-reverse mt-20 mx-auto">
          <div className="max-w-4xl">
            <h1 className="mb-5 text-4xl font-black">
              Workout tracking made easy.
            </h1>
            <p className="mb-5 text-xl">
              Track your progress at gym hassle free. And use our personalized
              insights to improve your fitness journey.
            </p>
            {!isLoading && data?.is_logged_in ? (
              <Link href={"/dash"}>
                <button className="btn btn-primary">Go to Dashboard</button>
              </Link>
            ) : (
              <Link href={"/auth/welcome"}>
                <button className="btn btn-primary">
                  Get Started for free
                </button>
              </Link>
            )}
          </div>

          <Image
            src="https://unsplash.com/photos/JKUTrJ4vK00/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8ZGFzaGJvYXJkfGVufDB8fHx8MTY1Njg0MDY0Nw&force=true"
            className="rounded-lg w-full flex-grow-0 h-96 object-cover mx-auto mt-5 mb-20"
          />
        </div>
      </div>
    </div>
  );
};
export default witNoAuthHOC(Home);
