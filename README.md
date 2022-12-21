# quiz-app: Full-Stack
## Technologies
- Front-end: ReactJS (MUI)
- Back-end: .NET Core 6 (Entity Framework)

### Guide: Start React App
Open ReactJS project and type `npm start` in console


### Guide: Migrate from Code to Database Table using Entity Framework
#### Prerequisite Nuget
- *Microsoft.EntityFrameworkCore.SqlServer*
- *Microsoft.EntityFrameworkCore.Tools*
1. Create **Models** and **DBContext** file
> Note: Example in repo
2. Add **ConnectionStrings** in **appsettings.json** file
> Note: You can define other name of DB

`"ConnectionStrings": {
    "QuizDB": "server=(local);database=QuizDB;Trusted_Connection=true;TrustServerCertificate=true"
  }`
  
3. Add **Dependency Injection** for DB Context in **Program.cs**

`builder.Services.AddDbContext<QuizDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("QuizDB")));`
                       
4. Open **Package Manager Console**
 `Add-Migration "init create"` : to create Database snapshot in **Migrations** folder
![image](https://user-images.githubusercontent.com/91947000/208984433-550451e6-59e4-4611-85bc-4b8eab1e1de1.png)
  
5. `Update-Database`: to create Database tables

![image](https://user-images.githubusercontent.com/91947000/208984345-03250a02-38a6-4e82-8909-8ffa478698f8.png)
