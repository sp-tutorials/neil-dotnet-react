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
