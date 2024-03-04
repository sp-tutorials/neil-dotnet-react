source https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/

# 1. Introduction

## 1.3. VS Code extensions
Extensions
1. C# by Microsoft
2. C# Extensions by JosKreativ
3. NuGet Gallery
4. ~~Bracket Pair Colorizer 2~~ built-in in VS Code
5. Material Icon Theme
6. SQLite by alexcvzz

File -> Autosave

## 1.4. Source code and Resources used on this course
repo https://github.com/TryCatchLearn/reactivities


# 2. Walking Skeleton Part 1 - API

## 2.2. Creating the .Net projects and references

Create project:
```bash
mkdir Reactivities && cd Reactivities
dotnet new sln
dotnet new webapi -n API
dotnet new classlib -n Application
dotnet new classlib -n Domain
dotnet new classlib -n Persistence

dotnet sln add API/API.csproj
dotnet sln add Application
dotnet sln add Persistence
dotnet sln add Domain

cd API; dotnet add reference ../Application; cd ..
cd Application; dotnet add reference ../Persistence; dotnet add reference ../Domain; cd ..
cd Persistence; dotnet add reference ../Domain; cd ..
```

Run project:
```bash
cd API
dotnet run
dotnet watch run
```

## 2.7. Creating an Entity Framework code first migration
```bash
# cd inside solution folder
dotnet tool list --global
dotnet tool install --global dotnet-ef --version 8.0.1 # https://www.nuget.org/packages/dotnet-ef
dotnet tool update --global dotnet-ef --version 8.0.1

dotnet ef -h
dotnet ef migrations add InitialCreate -p Persistence -s API
# NuGet Gallery -> install Microsoft.EntityFrameworkCore.Design for API.csproj
```

## 2.8. Creating the database
```bash
dotnet ef database -h
```

## 2.11. Saving changes into source control
```bash
git status
git init
dotnet new -l
dotnet new gitignore
git add .

git branch -M main
git remote add origin https://github.com/USER/REPO
git push -u origin main
```

# 3. Walking Skeleton Part 2 - Client

## 3.2. Creating the React project
```bash
npx create-react-app client-app --use-npm --template typescript
cd client-app
npm start
```

## 3.7. Typescript demo
* type inference
* type any
* union type: number | string
* loosely typed objects => interfaces => compile-time errors & IntelliSense
* optional type with question mark (?)
* override optional type access with exclamation mark (!). should be avoided if possible

## 3.10. Fetching data from the API
```bash
cd client-app
npm install axios
```

## 3.12. Semantic UI React
```bash
npm install semantic-ui-react semantic-ui-css # https://react.semantic-ui.com/
```

# 4. Creating a CRUD application using the CQRS + Mediator pattern

## 4.13. Using the debugger in VS Code

How to get the `.vscode` directory:  
`Ctrl + P`, then:
```
>.NET: generate assets for build and Debug
```

## 4.14. Summary of section 4

### \> Event Sourcing?
> Out of scope for this course but there is an excellent talk on this by  
> Greg Young on YouTube video at: https://youtu.be/JHGkaShoyNs

### \> Can I use NoSQL such as MongoDb with EF?
> No, you would typically use the API provided by MongodDb, Azure  
> Cosmos DB, Cassandra, RavenDB, Couch DB etc

# 5. Creating a CRUD application in React

## 5.3. Adding an Activity interface
[json to ts](https://www.google.com/search?q=json+to+ts)

## 5.14. Using a GUID for the activity id
```bash
cd client-app && npm install uuid
npm i --save-dev @types/uuid
```

# 6. Axios

## 6.7. Summary of section 6

### \> Why use Axios? Could we not just use fetch?
> A bit too low level and axios comes with powerful features such as  
>  interceptors.

# 7. MobX

## 7.3. Setting up MobX
```bash
npm install mobx mobx-react-lite
```

# 8. Routing

## 8.2. Installing React Router
```bash
npm install react-router-dom@5.3.4
npm install @types/react-router-dom --save-dev
```

# 9. Styling the User Interface

## 9.7. Adding the activity filter component
```bash
npm install react-calendar
# npm install @types/react-calendar # " react-calendar provides its own type definitions, so you do not need this installed"
```

# 10. Error handling

## 10.2. Validation with data annotations

https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-5.0#apicontroller-attribute-2

## 10.8. Handling exceptions 

https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-5.0

## 10.9. Preparing for setting up error handling in the client app

```bash
npm install react-toastify
```

## 10.15. Summary of section 10

### \> Is the use of fluent validation breaking clean architecture principals?
> The question to ask is - can I change the API to something like a 
> console app without changing the logic in the Application (Use 
> cases) layer. For practical and pragmatic reasons we used a 
> feature of Fluent Validation to use a method it provides to configure 
> our API to use the response from Fluent validation as an API response.

# 11. Forms

## 11.2. Setting up Formik

https://formik.org/

```bash
npm install formik
```

VS Code shortcuts:
Ctrl+D -> select word
Ctrl+Shift+L -> select all occurrences

## 11.3. Formik with less code

https://formik.org/docs/overview  
https://formik.org/docs/api/formik

## 11.4. Validation in Formik

https://formik.org/docs/guides/validation
```bash
npm install yup
# npm install @types/yup --save-dev # yup provides its own type definitions, so you do not need this installed.
```

## 11.8. Creating a reusable date input

https://reactdatepicker.com/
```bash
npm install react-datepicker
npm install @types/react-datepicker --save-dev
```

## 11.10. Using Date-FNS

```bash
npm ls date-fns
npm install date-fns@VERSION 
```
or just
```bash
npm install $(npm ls date-fns | grep -o "date-fns@[0-9.]+" | uniq)
```

https://date-fns.org/
https://date-fns.org/v3.3.1/docs/format

# 12. Identity

## 12.3. Adding an IdentityDbContext

```bash
dotnet restore # if the VS quick fix does not work
```

```bash
dotnet ef migrations add IdentityAdded -p Persistence/ -s API/
```

## 12.11. Storing secrets in development

https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0

## 12.16. Summary of section 12

### \> Our token is valid for 7 days - this is insecure!
> We are not even checking token expiry as a token validation
> parameter so the expiry doesn't matter. We address this later.

### \> We are sending the token over the network. This can be retrieved by a man in the middle!
> Sure, at the moment we are using HTTP so its possible to read the 
> header in clear text and this can be stolen. In production we use
> HTTPS which means both header and payload are encrypted.
