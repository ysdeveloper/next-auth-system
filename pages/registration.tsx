import Head from "next/head";
import Image from "next/image"

import {RegistrationForm} from '../components/fbform'
import registrationBg from '../src/images/login-bg.svg'

export default function RegistrationPage(props) {

  const handleSuccessEvent = (user) => {
   if (user) {
     console.log(user)
   }
  }

    return (
        <>
          <Head>
            <title>Registration | Mix-Auth</title>
          </Head>
          <section className="registration-form">
            <div className="container-fluid">
              <div className="row align-items-center h-100vh">
                <div className="col-lg-6 text-center">
                  <Image src={registrationBg} width={500} height={500} alt="Registration BG" />
                </div>
                <div className="col-lg-6 col-12 mb-5 mb-lg-0">
                  <RegistrationForm onSuccessfull={handleSuccessEvent} />
                </div>
              </div>
            </div>
          </section>
        </>
      );
}