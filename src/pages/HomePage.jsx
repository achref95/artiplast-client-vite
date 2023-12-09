import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"


const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="card w-96 bg-base-100 shadow-xl shadow-top">
        <figure className="px-10 pt-10">
          <img src="data:image/jpeg;base64,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03YTvA0gbCdvrK+JcrxuxFmKGSQSRt0Bg09GRoc3bsv8o8Vp2se0nK+qlw7zbce5FJaW8jA7qf8AVVR9OD/eYtXiv9nKb0NJ72qW5kwZldTPpJHvjbIWEuZp1DS4OG/ZwWNUZbjfQsw4vkEbGxsDhp1kMItfZbgubmnS3ON2/JHpwrVPFRqy0Tj5O7IDDLWYhSUuGx0jmRs0fClkmgtALdWsgADbfYSTuW67pbQx2Gi+xj3i55Aw7SprhVAKeCKna4vELAwF1tRA4my12Z8sx4h0XSPkj6LXbRo26tN73B8lcbZEnTx1P+Ii7bsFvaXeclm/HLLRcDa01dDKSIpYpS3eGPY8jtsVWue6+KpxBtNLIYoKZjmucGufaQgl1mgG+3QPUVMMtZUioHSPikkeZWtadYZYWJItYDmuugyXSxulknHXHzv1F07WEtJJJtYcSfcs6nPD1cPh6spKTaStHJJ3eTeeSsrmv7l2KdLTvpXm76Z/e+eNxuPY7UPYtBjbX0lRWVNFU08sZlDqmF2l7tRkPeujcO+AeTtBuPUpth2VYKaqdV07nRB7C0xNDRDYgbha42tBWJimRaWonNQ50sZcdUjWFoY48TtFxfjZYsdoYrDrFSqO+7JXa3U87ptfW9mnkze4PO2WnglY0MbLFFIGgWDQ5oNh2XUP7nH/AJmKelH+5Kp1DC1jWsYA1rAGtA3AAWAWmwHLsdHJUSskkeap2pwfps3vnO2WH73FZseKlVhGlVi/5kreEk9ehvkREPKEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf/9k=" alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Invoice Generator App</h2>
          <p>Made By <a href="https://github.com/achref95" rel="noreferrer" className="link hover:text-slate-500" target="_blank"> Ashref</a></p>
          <p>Copyright © 2023 - All right reserved</p>
            {isLoggedIn ? (
              <>
                <div className="card-actions">
                  <Link to="/generate"><button className="btn btn-neutral">Generate invoice</button></Link>
                </div>
                <div className="card-actions">
                  <Link to="/clients"><button className="btn btn-neutral">Clients</button></Link>
                </div>
                <div className="card-actions">
                  <Link to="/add-client"><button className="btn btn-neutral">Add Client</button></Link>
                </div>
                <div className="card-actions">
                  <Link to="/add-product"><button className="btn btn-neutral">Add Product</button></Link>
                </div>
              </>
            ): (
            <div className="flex flex-col">
                <Link to="/signup"><button className="btn btn-neutral mb-2">Sign Up</button></Link>
                <Link to="/login"><button className="btn btn-neutral">login</button></Link>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default HomePage
