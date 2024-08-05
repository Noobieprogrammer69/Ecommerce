import { Footer, Products, Search } from "../components"

const HomePage = () => {
  return (
    <div className="mt-5">
      <Search />
      <div>
      <Products />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default HomePage