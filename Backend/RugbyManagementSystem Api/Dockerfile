FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY . .
RUN dotnet restore "RugbyManagementSystem Api/RugbyManagementSystem Api.csproj"
RUN dotnet publish "RugbyManagementSystem Api/RugbyManagementSystem Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "RugbyManagementSystem Api.dll"]