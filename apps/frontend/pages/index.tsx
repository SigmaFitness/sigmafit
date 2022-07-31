import { NextPage } from "next";
import Link from "next/link";
import { useGetCurrentUserQuery } from "../api";
import { MetaHead } from "../components/Head";
import { Navbar } from "../components/Navbar";
import { witNoAuthHOC } from "../hooks/withNoAuthHOC";
import { PhoneMock } from "../components/PhoneMock";
import { Footer } from "../components/Footer";

const Home: NextPage = () => {
  const { isError, isLoading, data } = useGetCurrentUserQuery();

  return (
    <div>
      <MetaHead />

      <div className="landing-hero">
        <Navbar />
        {/* <Logo className="w-36 px-4 py-4"/> */}
        <div className="hero-content  text-center lg:pt-10  flex-col lg:flex-row-reverse mt-5 mx-auto">
          <div className="max-w-xl">
            <h1 className="mb-5 text-4xl font-black">
              Workout tracking made easy.
            </h1>
            <p className="mb-5 text-xl">
              Track your progress at gym hassle free. And use our personalized
              insights to improve your fitness journey.
            </p>
            {!isLoading && data?.is_logged_in ? (
              <Link href={"/dash"}>
                <button className="btn bg-gradient-to-r from-purple-500 to-pink-600 hover:bg-gradient-to-l">Go to Dashboard</button>
              </Link>
            ) : (
              <Link href={"/auth/welcome"}>
                <button className="btn bg-gradient-to-r from-purple-500 to-pink-600 hover:bg-gradient-to-l">
                  Get Started for free
                </button>
              </Link>
            )}
          </div>



          <div className="mockup-phone scale-75 sm:scale-90 border-blue-600 mx-0">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-4 max-w-full">
                <img
                  src="/mocks/9.png"
                  className="rounded-lg w-[100%] mt-2"
                />
              </div>
            </div>
          </div>



        </div>


        {/* <div className="max-w-[90vw] mx-auto prose w-full">


          <div className="grid sm:grid-cols-2 gap-4 items-center w-full border-b-2 my-3">
            <div className="border-black h-full border rounded-xl bg-gradient-to-r from-green-400 to-blue-300 flex flex-col justify-center">
              <div className="flex flex-col h-full items-start px-16 lg:px-28 py-10 text-white">
                <h2 className="text-4xl font-bold mt-5 mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">Available on all devices</h2>
                <div className="text-xl">
                  SigmaFit is a progressive web app. You can run it on any browser environment. It takes lesser resources and blazingly fast.
                </div>
              </div>

            </div>

            <div className="border-black h-full border rounded-xl bg-gradient-to-r from-green-400 to-blue-300 flex flex-col justify-center">
              <div className="flex flex-col h-full items-start px-16 lg:px-28 py-10 text-white">
                <h2 className="text-4xl font-bold mt-5 mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">Open Source</h2>
                <div className="text-xl">
                  We believe in open source, are one of them. 🙂
                </div>
              </div>
            </div>
          </div>
        </div> */}


        <div className="max-w-none mx-auto px-4 flex flex-col prose">



          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center w-full border-b-2 py-5 my-3">
            <div>
              <h2 className="text-4xl font-bold  mt-5 mb-3">Track Everything</h2>
              <div className="text-xl">
                Log all your workouts on SigmaFit. It's simpler and more rugged than any notebook out there. It will help you with the planning, execution and tracking of progress.
              </div>
            </div>
            <div className="flex justify-end">
              <PhoneMock imgUrl="/mocks/0.png" />
            </div>
          </div>


          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center border-b-2 py-5 my-3">
            <div className="flex justify-start">
              <PhoneMock imgUrl="/mocks/6.png" />
            </div>
            <div className="">
              <h2 className="text-4xl font-bold  mt-5 mb-3">Wide support</h2>
              <div className="text-xl">
                SigmaFit lets you log the thing you want to track. You can track distance, duration, weight, reps, and anything based on your workout requirements.
              </div>
            </div>
          </div>


          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center w-full border-b-2 py-5 my-3">
            <div>
              <h2 className="text-4xl font-bold  mt-5 mb-3">Fully customizable</h2>
              <div className="text-xl">
                In SigmaFit, it's super easy to get started with community Training Routines. If you have a custom workout plan, you can create that too. SigmaFit is super customizable, and creating a training routine is a cakewalk.
              </div>
            </div>
            <div className="flex justify-end">
              <PhoneMock imgUrl="/mocks/5.png" phoneTypeId="4" />
            </div>
          </div>



          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center w-full border-b-2 py-5 my-3">
            <div className="flex justify-start">
              <PhoneMock imgUrl="/mocks/4.png" phoneTypeId="1" />
            </div>
            <div>
              <h2 className="text-4xl font-bold  mt-5 mb-3">Record History</h2>
              <div className="text-xl">
                Personal Records are not just any numbers. They're very special for every athlete out there. SigmaFit keeps track of it and provides extra motivation to make it even bigger!
              </div>
            </div>
          </div>





          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center w-full border-b-2 py-5 my-3">


            <div>
              <h2 className="text-4xl font-bold  mt-5 mb-3">Sharing is caring</h2>
              <div className="text-xl">
                If you've created a training routine you're particularly proud of, you can share it with the community and friends.
              </div>
            </div>

            <div className="flex justify-end">
              <PhoneMock imgUrl="/mocks/7.png" />
            </div>

          </div>



          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center w-full border-b-2 py-5 my-3">

            <div className="flex justify-start max-w-md">
              <img src="/mocks/pwa.png" />
            </div>

            <div>
              <h2 className="text-4xl font-bold  mt-5 mb-3">Available on all devices</h2>
              <div className="text-xl">
                SigmaFit is a progressive web app. You can run it on any browser environment. It takes lesser resources and blazingly fast.
              </div>
            </div>

          </div>


        </div>

      </div>

      <Footer />
    </div>
  );
};
export default witNoAuthHOC(Home);



