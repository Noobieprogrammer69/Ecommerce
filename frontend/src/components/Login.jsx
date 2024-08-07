import { useSetRecoilState } from "recoil"
import authScreenAtom from "../atom/authAtom"
import { Link } from "react-router-dom"
import userAtom from '../atom/userAtom'
import { useState } from "react"

const Login = () => {
    const setAuthState = useSetRecoilState(authScreenAtom)
    const setUser = useSetRecoilState(userAtom)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async () => {
        setLoading(true)
        try {
          const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
          })
          
          const data = await res.json()
          
          if(data.error) {
            console.log(data.error)
            return
          }
    
          localStorage.setItem("user-threads", JSON.stringify(data))
          setUser(data)
          console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
          setLoading(false)
        }
      }


  return (
    <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
        <div className="container h-full p-10">
            <div
            className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
                <div
                className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">

                    <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                        <div className="text-center">
                        <img
                            className="mx-auto w-48"
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                            alt="logo" />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                            We are The Lotus Team
                        </h4>
                        </div>

                        <form>
                        <p className="mb-4">Please login to your account</p>
                        <div className="relative mb-4" data-twe-input-wrapper-init>
                            <input
                            type="email"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput1"
                            placeholder="Username" 
                            onChange={(e) => setInputs((inputs) => ({...inputs, email: e.target.value}))}
                            value={inputs.email}
                            />
                            <label
                            htmlFor="exampleFormControlInput1"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >
                                Email
                            </label>
                        </div>

                        <div className="relative mb-4" data-twe-input-wrapper-init>
                            <input
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput11"
                            placeholder="Password"
                            onChange={(e) => setInputs((inputs) => ({...inputs, password: e.target.value}))}
                            value={inputs.password} 
                            />
                            <label
                            htmlFor="exampleFormControlInput11"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Password
                            </label>
                        </div>

                        <div className="mb-12 pb-1 pt-1 text-center">
                            <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                            type="button"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            style={{ background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)' }}
                            onClick={handleLogin}
                            >
                            Log in
                            </button>

                            <a href="#!">Forgot password?</a>
                        </div>

                        <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 me-2">Don&apos;t have an account?</p>
                            <Link onClick={() => setAuthState("signup")}>
                                <button
                                type="button"
                                className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                                data-twe-ripple-init
                                data-twe-ripple-color="light">
                                Register Here
                                </button>
                            </Link>
                        </div>
                        </form>
                    </div>
                    </div>

                    <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                    style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'}}>
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                        <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                        </h4>
                        <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Login