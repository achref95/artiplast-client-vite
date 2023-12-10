# ARTIPLAST

<br>

## Description
IMPORTANT: Due the server being hosted on a free hosting provider, it can take up to 30 seconds for it to bootup when signing up / loggin in.

Welcome to ARTIPLAST invoice generator, the ultimate invoice generator designed to empower your business with effortless invoicing and unmatched customization! Tailored for businesses of all sizes, our cutting-edge solution redefines the way you create invoices, making the process seamless, stylish, and entirely personalized.

## User Stories

# User
-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's not available for me.
-  **Signup:** As a user I can sign up in the platform so that I can start generating invoice for my clients.
-  **Login:** As a user I can login to the platform so that I can start generating invoice for my clients.
-  **Logout:** As a user I can logout from the platform so no one else can tamper mine and my clients information.
-  **Add clients:** As a user I can add new clients to my database.
-  **Add Products:** As a user I can add new products to my database.
-  **Generate Invoices:** As a user I can generate new invoices for my previously added clients by using the previously added products I added
-  **See clients list:** As a user I can see my clients list.
-  **See generated invoices:** As a user I can see previously generated invoices for each client.
-  **Delete previously generated invoices:** As a user I delete previously generated invoices.

<br>



# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                                                    | Permissions |
| ------------------------- | --------------------                                         | ----------- | 
| `/`                       | HomePage                                                     | public `<Route>`            | 
| `/signup`                 | SignUpPage                                                   | anon only  `<AnonRoute>`    | 
| `/login`                  | LoginPage                                                    | anon only `<AnonRoute>`     | 
| `/logout`                 | n/a                                                          | user only `<PrivateRoute>`  | 
| `/generate`               | Generate new invoice page, Nav, Footer                         | user only `<PrivateRoute>`  | 
| `/invoices"`              | n/a                                                             | user only `<PrivateRoute>`  | 
| `/clients`                | Display all clients from the database, Nav, Footer           | user only `<PrivateRoute>`  | 
| `/bill`                   | n/a                                                           | user only  `<PrivateRoute>` | 
| `/add-product`            | Add a new product to the database, Nav, Footer                   | user only `<PrivateRoute>` |
| `/add-client`             | Add a new product to the database, Nav, Footer                        | user only `<PrivateRoute>`|
| `/client/:clientId`       | display client details, Nav, Footer                                | user only `<PrivateRoute>`|
| `/client/:clientId/:invoiceId`| display client's invoice details                                 | user only `<PrivateRoute>`| 
| `/*`                      | NotFoundPage, Nav, Footer                                    | public/user `<PrivateRoute>`|


## Components

- Nav

- ClientSearchBar

- ProductSearchBar

- invoiceUtils


## Pages

- LoginPage

- SignupPage

- GenerateInvoicePage
  
- BillPage

- AddClientPage

- AddProductPage
  
- ClientPage
  
- ClientDetailPage
  
- InvoicePage
  
- InvoiceDetailPage
  
- HomePage
  
- NotFoundPage
 

## Services

- Auth Service
  - auth.signup
  - auth.logIn
  - auth.verifyToken
  - auth.getCurrentUser
  - auth.passwordUpdate

- Api Service
  - generate
  - getInvoices
  - getInvoiceDetail
  - deleteInvoices
  - getAllClients
  - getClients
  - createClient
  - clientDetail
  - createProduct
  - getProduct


<br>


## Links


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/achref95/artiplast-client-vite)

[Server repository Link](https://github.com/achref95/artiplast-server)

[Deployed App Link](https://artiplast-client-vite.vercel.app/)