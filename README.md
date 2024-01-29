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
