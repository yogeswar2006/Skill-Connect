import Body from "./body";
import Footer from "./footer";
import Navbar from "./navbar";

function Dashboard() {
  return (
    <>
      <div class="min-h-screen w-full bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(11,11,163,1)_66%,rgba(0,212,255,1)_100%)] bg-fixed">

            <Navbar/>
            <Body/>
            <Footer />

      </div>
    </>
  );
}

export default Dashboard;
