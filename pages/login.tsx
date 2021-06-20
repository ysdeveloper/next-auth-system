import Head from "next/head";
import Image from 'next/image'
import loginBg from '../src/images/login-bg.svg'
import {LoginForm} from '../components/fbform'

export default function LoginPage(props) {
  return (
    <>
      <Head>
        <title>Login | Mix-Auth</title>
      </Head>
      <section className="login-form">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center">
              <Image src={loginBg} width={500} height={500} alt="login BG" />
            </div>
            <div className="col-lg-6 col-12 mb-5 mb-lg-0">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}